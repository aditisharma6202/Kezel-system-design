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

/* ── Hardcoded palette (10 hues × 10 shades) ── */

const COLOR_PALETTE: string[] = [
  // Grays
  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#6c757d",
  "#495057",
  "#343a40",
  "#212529",
  "#0d1117",
  // Reds
  "#fff5f5",
  "#ffe3e3",
  "#ffc9c9",
  "#ffa8a8",
  "#ff8787",
  "#ff6b6b",
  "#fa5252",
  "#f03e3e",
  "#e03131",
  "#c92a2a",
  // Oranges
  "#fff4e6",
  "#ffe8cc",
  "#ffd8a8",
  "#ffc078",
  "#ffa94d",
  "#ff922b",
  "#fd7e14",
  "#e8590c",
  "#d9480f",
  "#bf4000",
  // Yellows
  "#fff9db",
  "#fff3bf",
  "#ffec99",
  "#ffe066",
  "#ffd43b",
  "#fcc419",
  "#fab005",
  "#f59f00",
  "#f08c00",
  "#e67700",
  // Greens
  "#ebfbee",
  "#d3f9d8",
  "#b2f2bb",
  "#8ce99a",
  "#69db7c",
  "#51cf66",
  "#40c057",
  "#37b24d",
  "#2f9e44",
  "#2b8a3e",
  // Teals
  "#e6fcf5",
  "#c3fae8",
  "#96f2d7",
  "#63e6be",
  "#38d9a9",
  "#20c997",
  "#12b886",
  "#0ca678",
  "#099268",
  "#087f5b",
  // Blues
  "#e7f5ff",
  "#d0ebff",
  "#a5d8ff",
  "#74c0fc",
  "#4dabf7",
  "#339af0",
  "#228be6",
  "#1c7ed6",
  "#1971c2",
  "#1864ab",
  // Indigos
  "#edf2ff",
  "#dbe4ff",
  "#bac8ff",
  "#91a7ff",
  "#748ffc",
  "#5c7cfa",
  "#4c6ef5",
  "#4263eb",
  "#3b5bdb",
  "#364fc7",
  // Purples
  "#f8f0fc",
  "#f3d9fa",
  "#eebefa",
  "#e599f7",
  "#da77f2",
  "#cc5de8",
  "#be4bdb",
  "#ae3ec9",
  "#9c36b5",
  "#862e9c",
  // Pinks
  "#fff0f6",
  "#ffdeeb",
  "#fcc2d7",
  "#faa2c1",
  "#f783ac",
  "#f06595",
  "#e64980",
  "#d6336c",
  "#c2255c",
  "#a61e4d",
];

/* ── Hex helpers ── */

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function isValidHex(v: string): boolean {
  return HEX_RE.test(v);
}

function normalizeHex(v: string): string {
  const m = v.match(HEX_RE);
  if (m == null) return v;
  const hex = m[1];
  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`.toLowerCase();
  }
  return `#${hex}`.toLowerCase();
}

/* ── Props ── */

export interface ColorPickerProps {
  /** Controlled value (hex string). Omit for uncontrolled. */
  value?: string;
  /** Initial value for uncontrolled mode. */
  defaultValue?: string;
  /** Fires when a color is picked or cleared. */
  onChange?: (value: string | undefined) => void;

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

  className?: string;
  inputClassName?: string;
}

/* ── Component ── */

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      placeholder = "#000000",
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
      className,
      inputClassName,
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState<
      string | undefined
    >(defaultValue);

    const value = isControlled ? valueProp : internalValue;

    const fireChange = React.useCallback(
      (next: string | undefined) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value ?? "");

    React.useEffect(() => {
      setInputValue(value ?? "");
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
      const trimmed = inputValue.trim();
      if (trimmed === "") {
        fireChange(undefined);
        return;
      }
      if (isValidHex(trimmed)) {
        fireChange(normalizeHex(trimmed));
      } else {
        setInputValue(value ?? "");
      }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleInputBlur();
        setOpen(false);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleSwatchClick = (hex: string) => {
      fireChange(hex);
      setOpen(false);
    };

    const handleClear = () => {
      fireChange(undefined);
      setOpen(false);
    };

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const rootClass = cn("kz-color-picker-root", className);

    const wrapperClass = cn(
      "kz-color-picker-wrapper",
      `kz-color-picker-wrapper--${variant}`,
      `kz-color-picker-wrapper--${size}`,
      state !== TextInputState.Default && `kz-color-picker-wrapper--${state}`,
      open && "kz-color-picker-wrapper--open"
    );

    const inputClass = cn(
      "kz-color-picker-input",
      `kz-color-picker-input--${size}`,
      inputClassName
    );

    const iconSize = size === TextInputSize.Sm ? 14 : 16;

    return (
      <div className={rootClass}>
        {label != null && label !== "" && (
          <label className="kz-color-picker-label">
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

        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild disabled={disabled}>
            <div className={wrapperClass}>
              <span className="kz-color-picker-icon">
                <Icon name={IconName.Palette} size={iconSize} />
              </span>
              {value != null && value !== "" && (
                <span
                  className="kz-color-picker-swatch-preview"
                  style={{ backgroundColor: value }}
                />
              )}
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
                    ? "color-picker-message"
                    : helperText != null
                      ? "color-picker-helper"
                      : undefined
                }
              />
              <button
                type="button"
                className="kz-color-picker-toggle"
                tabIndex={-1}
                aria-label="Toggle color picker"
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
              className="kz-color-picker-popover"
              sideOffset={4}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="kz-color-picker-grid">
                {COLOR_PALETTE.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    className={cn(
                      "kz-color-picker-swatch",
                      value === hex && "kz-color-picker-swatch--selected"
                    )}
                    style={{ backgroundColor: hex }}
                    title={hex}
                    onClick={() => handleSwatchClick(hex)}
                  />
                ))}
              </div>

              <div className="kz-color-picker-footer">
                <Button
                  variant={ButtonVariant.Outline}
                  size={ButtonSize.Sm}
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {stateMessage != null && stateMessage !== "" && (
          <Typography
            id="color-picker-message"
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
              id="color-picker-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
