import * as React from "react";
import { cn } from "../../utils/cn";
import {
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "../../constants/enum";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";

export interface RangeSliderProps {
  size?: TextInputSize;
  variant?: TextInputVariant;

  label?: string;
  helperText?: string;
  description?: string;

  state?: TextInputState;
  errorText?: string;
  successText?: string;
  warningText?: string;

  /** Single-thumb mode value */
  value?: number;
  /** Dual-thumb mode value: [min, max] */
  rangeValue?: [number, number];
  onValueChange?: (value: number) => void;
  onRangeChange?: (value: [number, number]) => void;

  min?: number;
  max?: number;
  step?: number;

  /** Show current value tooltip above thumb */
  showValue?: boolean;
  /** Show min/max labels below the track */
  showMinMax?: boolean;
  /** Custom value formatter for display */
  formatValue?: (value: number) => string;
  /** Show manual input fields above the slider */
  showInputs?: boolean;
  /** Visual variant for the manual input fields (defaults to the slider's variant) */
  inputVariant?: TextInputVariant;

  disabled?: boolean;
  containerClassName?: string;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const snapToStep = (val: number, min: number, step: number) => {
  const steps = Math.round((val - min) / step);
  return min + steps * step;
};

const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      size = TextInputSize.Md,
      variant = TextInputVariant.Default,
      label,
      helperText,
      description,
      state = TextInputState.Default,
      errorText,
      successText,
      warningText,
      value,
      rangeValue,
      onValueChange,
      onRangeChange,
      min = 0,
      max = 100,
      step = 1,
      showValue = false,
      showMinMax = false,
      formatValue,
      showInputs = false,
      inputVariant,
      disabled = false,
      containerClassName,
    },
    ref
  ) => {
    const resolvedInputVariant = inputVariant ?? variant;
    const isRange = rangeValue != null;
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = React.useState<
      null | "single" | "start" | "end"
    >(null);

    // Internal text state for manual inputs so user can type freely
    const [startText, setStartText] = React.useState(
      String(isRange ? rangeValue[0] : (value ?? min))
    );
    const [endText, setEndText] = React.useState(
      String(isRange ? rangeValue[1] : max)
    );

    // Sync internal text when value/rangeValue changes externally (e.g. via slider drag)
    React.useEffect(() => {
      if (isRange && rangeValue) {
        setStartText(String(rangeValue[0]));
        setEndText(String(rangeValue[1]));
      } else if (value != null) {
        setStartText(String(value));
      }
    }, [isRange, value, rangeValue]);

    const commitInput = (which: "start" | "end", raw: string) => {
      const parsed = parseFloat(raw);
      if (isNaN(parsed)) return;
      const clamped = clamp(snapToStep(parsed, min, step), min, max);

      if (isRange && rangeValue) {
        if (which === "start") {
          const safe = Math.min(clamped, rangeValue[1]);
          onRangeChange?.([safe, rangeValue[1]]);
        } else {
          const safe = Math.max(clamped, rangeValue[0]);
          onRangeChange?.([rangeValue[0], safe]);
        }
      } else {
        onValueChange?.(clamped);
      }
    };

    const format = formatValue ?? ((v: number) => String(v));

    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    const getValueFromPosition = (clientX: number) => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = min + ratio * (max - min);
      return clamp(snapToStep(raw, min, step), min, max);
    };

    const handlePointerDown =
      (thumb: "single" | "start" | "end") => (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        setDragging(thumb);
        const val = getValueFromPosition(e.clientX);
        applyValue(thumb, val);
      };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!dragging || disabled) return;
      const val = getValueFromPosition(e.clientX);
      applyValue(dragging, val);
    };

    const handlePointerUp = () => {
      setDragging(null);
    };

    const applyValue = (thumb: "single" | "start" | "end", val: number) => {
      if (thumb === "single") {
        onValueChange?.(val);
      } else if (rangeValue) {
        if (thumb === "start") {
          const clamped = Math.min(val, rangeValue[1]);
          onRangeChange?.([clamped, rangeValue[1]]);
        } else {
          const clamped = Math.max(val, rangeValue[0]);
          onRangeChange?.([rangeValue[0], clamped]);
        }
      }
    };

    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return;
      const val = getValueFromPosition(e.clientX);
      if (isRange && rangeValue) {
        const distStart = Math.abs(val - rangeValue[0]);
        const distEnd = Math.abs(val - rangeValue[1]);
        if (distStart <= distEnd) {
          onRangeChange?.([Math.min(val, rangeValue[1]), rangeValue[1]]);
        } else {
          onRangeChange?.([rangeValue[0], Math.max(val, rangeValue[0])]);
        }
      } else {
        onValueChange?.(val);
      }
    };

    const handleKeyDown =
      (thumb: "single" | "start" | "end") => (e: React.KeyboardEvent) => {
        if (disabled) return;
        let delta = 0;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
        else if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
        else if (e.key === "Home") {
          applyValue(thumb, min);
          return;
        } else if (e.key === "End") {
          applyValue(thumb, max);
          return;
        } else return;

        e.preventDefault();
        if (thumb === "single" && value != null) {
          applyValue(thumb, clamp(value + delta, min, max));
        } else if (rangeValue) {
          const current = thumb === "start" ? rangeValue[0] : rangeValue[1];
          applyValue(thumb, clamp(current + delta, min, max));
        }
      };

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const uniqueId = React.useId();
    const messageId = `kz-range-slider-message-${uniqueId}`;

    // Percentages
    const singlePercent = value != null ? getPercent(value) : 0;
    const startPercent = rangeValue ? getPercent(rangeValue[0]) : 0;
    const endPercent = rangeValue ? getPercent(rangeValue[1]) : 100;

    const rootClass = cn("kz-range-slider-root", containerClassName);

    const wrapperClass = cn(
      "kz-range-slider-wrapper",
      `kz-range-slider-wrapper--${variant}`,
      `kz-range-slider-wrapper--${size}`,
      state !== TextInputState.Default && `kz-range-slider-wrapper--${state}`,
      disabled && "kz-range-slider-wrapper--disabled"
    );

    const renderThumb = (
      thumb: "single" | "start" | "end",
      percent: number,
      currentValue: number
    ) => (
      <div
        className={cn(
          "kz-range-slider-thumb",
          `kz-range-slider-thumb--${size}`,
          dragging === thumb && "kz-range-slider-thumb--active"
        )}
        style={{ left: `${percent}%` }}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-disabled={disabled}
        aria-label={
          thumb === "start"
            ? "Range start"
            : thumb === "end"
              ? "Range end"
              : "Value"
        }
        onPointerDown={handlePointerDown(thumb)}
        onKeyDown={handleKeyDown(thumb)}
      >
        {showValue && (
          <span className="kz-range-slider-value-tooltip">
            {format(currentValue)}
          </span>
        )}
      </div>
    );

    return (
      <div className={rootClass} ref={ref}>
        {label != null && label !== "" && (
          <label className="kz-range-slider-label">
            <Typography variant={TypographyVariantEnum.Label}>
              {label}
            </Typography>
          </label>
        )}

        {description != null && description !== "" && (
          <Typography variant={TypographyVariantEnum.Caption}>
            {description}
          </Typography>
        )}

        {showInputs && (
          <div className="kz-range-slider-inputs">
            <input
              type="text"
              inputMode="decimal"
              className={cn(
                "kz-range-slider-input",
                `kz-range-slider-input--${size}`,
                `kz-range-slider-input--${resolvedInputVariant}`
              )}
              value={startText}
              onChange={(e) => setStartText(e.target.value)}
              onBlur={() => commitInput("start", startText)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitInput("start", startText);
              }}
              disabled={disabled}
              aria-label={isRange ? "Range start value" : "Value"}
            />
            {isRange && (
              <>
                <Typography variant={TypographyVariantEnum.Caption}>
                  to
                </Typography>
                <input
                  type="text"
                  inputMode="decimal"
                  className={cn(
                    "kz-range-slider-input",
                    `kz-range-slider-input--${size}`
                  )}
                  value={endText}
                  onChange={(e) => setEndText(e.target.value)}
                  onBlur={() => commitInput("end", endText)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitInput("end", endText);
                  }}
                  disabled={disabled}
                  aria-label="Range end value"
                />
              </>
            )}
          </div>
        )}

        <div
          className={wrapperClass}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div
            className="kz-range-slider-track"
            ref={trackRef}
            onClick={handleTrackClick}
          >
            <div
              className="kz-range-slider-fill"
              style={
                isRange
                  ? {
                      left: `${startPercent}%`,
                      width: `${endPercent - startPercent}%`,
                    }
                  : { left: "0%", width: `${singlePercent}%` }
              }
            />
            {isRange && rangeValue ? (
              <>
                {renderThumb("start", startPercent, rangeValue[0])}
                {renderThumb("end", endPercent, rangeValue[1])}
              </>
            ) : (
              value != null && renderThumb("single", singlePercent, value)
            )}
          </div>
        </div>

        {showMinMax && (
          <div className="kz-range-slider-minmax">
            <Typography variant={TypographyVariantEnum.Caption}>
              {format(min)}
            </Typography>
            <Typography variant={TypographyVariantEnum.Caption}>
              {format(max)}
            </Typography>
          </div>
        )}

        {stateMessage != null && stateMessage !== "" && (
          <Typography
            id={messageId}
            variant={
              state === TextInputState.Error
                ? TypographyVariantEnum.Error
                : state === TextInputState.Success
                  ? TypographyVariantEnum.Success
                  : TypographyVariantEnum.Warning
            }
          >
            {stateMessage}
          </Typography>
        )}

        {helperText != null &&
          helperText !== "" &&
          state === TextInputState.Default && (
            <Typography variant={TypographyVariantEnum.Caption}>
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
