import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import {
  TextInputVariant,
  TextInputSize,
  TextInputState,
  ButtonVariant,
  ButtonSize,
} from "../../constants/enum";
import { Button } from "../button";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";
import { Icon, IconName } from "../../icon";
import { Calendar } from "../date-time-picker/Calendar";

export interface DateRange {
  start: Date | undefined;
  end: Date | undefined;
}

export interface DateRangePickerProps {
  /** Controlled value. Omit for uncontrolled mode. */
  value?: DateRange | null;
  /** Fires when the range changes. */
  onChange?: (value: DateRange | undefined) => void;
  /** Initial value for uncontrolled mode. */
  defaultValue?: DateRange;

  minDate?: Date;
  maxDate?: Date;

  placeholder?: string;
  disabled?: boolean;

  size?: TextInputSize;
  variant?: TextInputVariant;
  state?: TextInputState;

  errorText?: string;
  successText?: string;
  warningText?: string;

  label?: string;
  helperText?: string;
  description?: string;

  showTodayButton?: boolean;
  showClearButton?: boolean;

  className?: string;
  inputClassName?: string;
}

/* ── Formatting / parsing helpers ── */

function formatDate(date: Date): string {
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}

function formatRange(range: DateRange): string {
  if (range.start == null && range.end == null) return "";
  if (range.start != null && range.end == null)
    return `${formatDate(range.start)} – ...`;
  if (range.start != null && range.end != null)
    return `${formatDate(range.start)} – ${formatDate(range.end)}`;
  return "";
}

function parseDate(raw: string): Date | null {
  const match = raw.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match == null) return null;
  const d = new Date(
    parseInt(match[3]),
    parseInt(match[1]) - 1,
    parseInt(match[2])
  );
  if (isNaN(d.getTime())) return null;
  return d;
}

function parseRangeInput(raw: string): DateRange | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;

  // Try "MM/DD/YYYY – MM/DD/YYYY" or "MM/DD/YYYY - MM/DD/YYYY"
  const parts = trimmed.split(/\s*[–-]\s*/);
  if (parts.length !== 2) return null;

  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);
  if (start == null || end == null) return null;
  if (start > end) return null;

  return { start, end };
}

/* ── Component ── */

const DateRangePicker = React.forwardRef<
  HTMLInputElement,
  DateRangePickerProps
>(
  (
    {
      value: valueProp,
      onChange,
      defaultValue,
      minDate,
      maxDate,
      placeholder = "Start date – End date",
      disabled = false,
      size = TextInputSize.Md,
      variant = TextInputVariant.Default,
      state = TextInputState.Default,
      errorText,
      successText,
      warningText,
      label,
      helperText,
      description,
      showTodayButton = true,
      showClearButton = true,
      className,
      inputClassName,
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState<
      DateRange | undefined
    >(defaultValue);

    const value: DateRange | undefined = isControlled
      ? valueProp === null
        ? undefined
        : valueProp
      : internalValue;

    const fireChange = React.useCallback(
      (next: DateRange | undefined) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const [open, setOpen] = React.useState(false);
    const [selectingEnd, setSelectingEnd] = React.useState(false);
    const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

    // Pending start (before end is picked)
    const [pendingStart, setPendingStart] = React.useState<Date | undefined>(
      undefined
    );

    const [inputValue, setInputValue] = React.useState(
      value != null ? formatRange(value) : ""
    );

    React.useEffect(() => {
      if (!selectingEnd) {
        setInputValue(value != null ? formatRange(value) : "");
      }
    }, [value, selectingEnd]);

    // Left calendar shows month of start date or current month
    const [leftMonth, setLeftMonth] = React.useState(
      () => value?.start ?? defaultValue?.start ?? new Date()
    );

    // Right calendar is always left + 1 month
    const rightMonth = new Date(
      leftMonth.getFullYear(),
      leftMonth.getMonth() + 1,
      1
    );

    const handlePrevMonth = React.useCallback(() => {
      setLeftMonth(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      );
    }, []);

    const handleNextMonth = React.useCallback(() => {
      setLeftMonth(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      );
    }, []);

    const handleDateSelect = (date: Date) => {
      if (!selectingEnd) {
        // First click: set start
        setPendingStart(date);
        setSelectingEnd(true);
        setHoverDate(null);
        // Show partial range in input
        setInputValue(`${formatDate(date)} – ...`);
      } else {
        // Second click: set end
        const start = pendingStart!;
        if (date < start) {
          // Clicked before start — treat as new start
          setPendingStart(date);
          setInputValue(`${formatDate(date)} – ...`);
          return;
        }
        const range: DateRange = { start, end: date };
        fireChange(range);
        setSelectingEnd(false);
        setPendingStart(undefined);
        setHoverDate(null);
        setOpen(false);
      }
    };

    const handleHover = (date: Date | null) => {
      if (selectingEnd) {
        setHoverDate(date);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
      if (inputValue.trim() === "") {
        fireChange(undefined);
        setSelectingEnd(false);
        setPendingStart(undefined);
        return;
      }
      const parsed = parseRangeInput(inputValue);
      if (parsed != null) {
        fireChange(parsed);
        setSelectingEnd(false);
        setPendingStart(undefined);
      } else {
        setInputValue(value != null ? formatRange(value) : "");
      }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleInputBlur();
        setOpen(false);
      }
      if (e.key === "Escape") {
        setSelectingEnd(false);
        setPendingStart(undefined);
        setHoverDate(null);
        setOpen(false);
      }
    };

    const handleToday = () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      fireChange({ start: now, end: now });
      setSelectingEnd(false);
      setPendingStart(undefined);
      setHoverDate(null);
      setOpen(false);
    };

    const handleClear = () => {
      fireChange(undefined);
      setSelectingEnd(false);
      setPendingStart(undefined);
      setHoverDate(null);
      setOpen(false);
    };

    // The displayed range in the calendars
    const displayStart = selectingEnd ? pendingStart : value?.start;
    const displayEnd = selectingEnd ? undefined : value?.end;

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const rootClass = cn("kz-date-picker-root", className);

    const wrapperClass = cn(
      "kz-date-picker-wrapper",
      `kz-date-picker-wrapper--${variant}`,
      `kz-date-picker-wrapper--${size}`,
      state !== TextInputState.Default && `kz-date-picker-wrapper--${state}`,
      open && "kz-date-picker-wrapper--open"
    );

    const inputClass = cn(
      "kz-date-picker-input",
      `kz-date-picker-input--${size}`,
      inputClassName
    );

    const iconSize = size === TextInputSize.Sm ? 14 : 16;

    return (
      <div className={rootClass}>
        {label != null && label !== "" && (
          <label className="kz-date-picker-label">
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

        <Popover.Root
          open={open}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              // Closing — reset selection state if mid-selection
              setSelectingEnd(false);
              setPendingStart(undefined);
              setHoverDate(null);
            }
            setOpen(nextOpen);
          }}
        >
          <Popover.Trigger asChild disabled={disabled}>
            <div className={wrapperClass}>
              <span className="kz-date-picker-icon">
                <Icon name={IconName.Calendar} size={iconSize} />
              </span>
              <input
                ref={ref}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClass}
                aria-invalid={state === TextInputState.Error}
                aria-describedby={
                  stateMessage != null
                    ? "date-range-picker-message"
                    : helperText != null
                      ? "date-range-picker-helper"
                      : undefined
                }
              />
              <button
                type="button"
                className="kz-date-picker-toggle"
                tabIndex={-1}
                aria-label="Toggle calendar"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((prev) => !prev);
                }}
              >
                <Icon name={IconName.ChevronDown} size={iconSize} />
              </button>
            </div>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="kz-date-picker-popover"
              sideOffset={4}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="kz-date-range-picker-calendars">
                <Calendar
                  onSelect={handleDateSelect}
                  selectedStart={displayStart}
                  selectedEnd={displayEnd}
                  hoverDate={hoverDate ?? undefined}
                  onHover={handleHover}
                  minDate={minDate}
                  maxDate={maxDate}
                  viewMonth={leftMonth}
                  onViewMonthChange={handlePrevMonth}
                  hideNext
                />
                <div className="kz-date-range-picker-divider" />
                <Calendar
                  onSelect={handleDateSelect}
                  selectedStart={displayStart}
                  selectedEnd={displayEnd}
                  hoverDate={hoverDate ?? undefined}
                  onHover={handleHover}
                  minDate={minDate}
                  maxDate={maxDate}
                  viewMonth={rightMonth}
                  onViewMonthChange={handleNextMonth}
                  hidePrev
                />
              </div>

              {(showTodayButton || showClearButton) && (
                <div className="kz-date-picker-footer">
                  {showTodayButton && (
                    <Button
                      variant={ButtonVariant.Ghost}
                      size={ButtonSize.Sm}
                      onClick={handleToday}
                    >
                      Today
                    </Button>
                  )}
                  {showClearButton && (
                    <Button
                      variant={ButtonVariant.Outline}
                      size={ButtonSize.Sm}
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {stateMessage != null && stateMessage !== "" && (
          <Typography
            id="date-range-picker-message"
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
            <Typography
              id="date-range-picker-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
