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
import { Calendar } from "./Calendar";
import { TimeSelector } from "./TimeSelector";

export type DateTimePickerMode = "date" | "time" | "datetime";
export type DateTimePickerFormat = "12h" | "24h";

export interface DateTimePickerProps {
  /** Controlled value. Omit for uncontrolled mode. */
  value?: Date | null;
  /** Fires when the date changes (controlled & uncontrolled). */
  onChange?: (value: Date | undefined) => void;
  /** @deprecated Use `onChange`. Kept for backward compatibility. */
  onValueChange?: (value: Date | undefined) => void;
  /** Initial value for uncontrolled mode. */
  defaultValue?: Date;

  mode?: DateTimePickerMode;
  format?: DateTimePickerFormat;

  minDate?: Date;
  maxDate?: Date;

  /** Show seconds column in the time selector. */
  showSeconds?: boolean;

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

/* ── Formatting helpers ── */

function formatDate(date: Date): string {
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}

function formatTime12(date: Date, seconds: boolean): string {
  let h = date.getHours() % 12;
  if (h === 0) h = 12;
  const m = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "PM" : "AM";
  const base = `${h.toString().padStart(2, "0")}:${m}`;
  if (seconds) {
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${base}:${s} ${period}`;
  }
  return `${base} ${period}`;
}

function formatTime24(date: Date, seconds: boolean): string {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  if (seconds) {
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }
  return `${h}:${m}`;
}

function formatDateTime(
  date: Date,
  mode: DateTimePickerMode,
  fmt: DateTimePickerFormat,
  seconds: boolean
): string {
  if (mode === "date") return formatDate(date);
  if (mode === "time")
    return fmt === "12h"
      ? formatTime12(date, seconds)
      : formatTime24(date, seconds);
  const datePart = formatDate(date);
  const timePart =
    fmt === "12h" ? formatTime12(date, seconds) : formatTime24(date, seconds);
  return `${datePart} ${timePart}`;
}

/* ── Parsing helpers ── */

function parseInputValue(
  raw: string,
  mode: DateTimePickerMode,
  fmt: DateTimePickerFormat,
  seconds: boolean
): Date | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;

  if (mode === "date") {
    const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (match == null) return null;
    const [, mm, dd, yyyy] = match;
    const d = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
    if (isNaN(d.getTime())) return null;
    return d;
  }

  if (mode === "time") {
    if (fmt === "12h") {
      const pattern = seconds
        ? /^(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)$/i
        : /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
      const match = trimmed.match(pattern);
      if (match == null) return null;
      let h = parseInt(match[1]);
      const m = parseInt(match[2]);
      const s = seconds ? parseInt(match[3]) : 0;
      const p = (seconds ? match[4] : match[3]).toUpperCase();
      if (h < 1 || h > 12 || m < 0 || m > 59) return null;
      if (seconds && (s < 0 || s > 59)) return null;
      if (p === "AM" && h === 12) h = 0;
      else if (p === "PM" && h !== 12) h += 12;
      const d = new Date();
      d.setHours(h, m, s, 0);
      return d;
    } else {
      const pattern = seconds
        ? /^(\d{1,2}):(\d{2}):(\d{2})$/
        : /^(\d{1,2}):(\d{2})$/;
      const match = trimmed.match(pattern);
      if (match == null) return null;
      const h = parseInt(match[1]);
      const m = parseInt(match[2]);
      const s = seconds ? parseInt(match[3]) : 0;
      if (h < 0 || h > 23 || m < 0 || m > 59) return null;
      if (seconds && (s < 0 || s > 59)) return null;
      const d = new Date();
      d.setHours(h, m, s, 0);
      return d;
    }
  }

  // datetime
  const pattern =
    fmt === "12h"
      ? seconds
        ? /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)$/i
        : /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i
      : seconds
        ? /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/
        : /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/;

  const parts = trimmed.match(pattern);
  if (parts == null) return null;

  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);
  const year = parseInt(parts[3]);
  let hours = parseInt(parts[4]);
  const mins = parseInt(parts[5]);
  const secs = seconds ? parseInt(parts[6]) : 0;

  if (fmt === "12h") {
    const period = (seconds ? parts[7] : parts[6]).toUpperCase();
    if (hours < 1 || hours > 12) return null;
    if (period === "AM" && hours === 12) hours = 0;
    else if (period === "PM" && hours !== 12) hours += 12;
  } else {
    if (hours < 0 || hours > 23) return null;
  }

  if (mins < 0 || mins > 59) return null;
  if (seconds && (secs < 0 || secs > 59)) return null;

  const d = new Date(year, month, day, hours, mins, secs, 0);
  if (isNaN(d.getTime())) return null;
  return d;
}

function getDefaultPlaceholder(
  mode: DateTimePickerMode,
  fmt: DateTimePickerFormat,
  seconds: boolean
): string {
  const sec = seconds ? ":SS" : "";
  if (mode === "date") return "MM/DD/YYYY";
  if (mode === "time") return fmt === "12h" ? `HH:MM${sec} AM` : `HH:MM${sec}`;
  return fmt === "12h" ? `MM/DD/YYYY HH:MM${sec} AM` : `MM/DD/YYYY HH:MM${sec}`;
}

/* ── Component ── */

const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
  (
    {
      value: valueProp,
      onChange,
      onValueChange,
      defaultValue,
      mode = "datetime",
      format = "12h",
      minDate,
      maxDate,
      showSeconds = false,
      placeholder,
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
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(
      defaultValue
    );

    const value = isControlled
      ? valueProp === null
        ? undefined
        : valueProp
      : internalValue;

    const fireChange = React.useCallback(
      (next: Date | undefined) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
        onValueChange?.(next);
      },
      [isControlled, onChange, onValueChange]
    );

    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(
      value != null ? formatDateTime(value, mode, format, showSeconds) : ""
    );

    React.useEffect(() => {
      setInputValue(
        value != null ? formatDateTime(value, mode, format, showSeconds) : ""
      );
    }, [value, mode, format, showSeconds]);

    const currentHour = value?.getHours() ?? 0;
    const currentMinute = value?.getMinutes() ?? 0;
    const currentSecond = value?.getSeconds() ?? 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
      if (inputValue.trim() === "") {
        fireChange(undefined);
        return;
      }
      const parsed = parseInputValue(inputValue, mode, format, showSeconds);
      if (parsed != null) {
        fireChange(parsed);
      } else {
        setInputValue(
          value != null ? formatDateTime(value, mode, format, showSeconds) : ""
        );
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

    const handleDateSelect = (date: Date) => {
      const next = new Date(date);
      if (value != null) {
        next.setHours(
          value.getHours(),
          value.getMinutes(),
          value.getSeconds(),
          0
        );
      } else {
        next.setHours(0, 0, 0, 0);
      }
      fireChange(next);
      if (mode === "date") {
        setOpen(false);
      }
    };

    const handleHourChange = (h: number) => {
      const base = value ?? new Date();
      const next = new Date(base);
      next.setHours(h);
      next.setMilliseconds(0);
      fireChange(next);
    };

    const handleMinuteChange = (m: number) => {
      const base = value ?? new Date();
      const next = new Date(base);
      next.setMinutes(m);
      next.setMilliseconds(0);
      fireChange(next);
    };

    const handleSecondChange = (s: number) => {
      const base = value ?? new Date();
      const next = new Date(base);
      next.setSeconds(s);
      next.setMilliseconds(0);
      fireChange(next);
    };

    const handleToday = () => {
      const now = new Date();
      if (mode === "date") {
        now.setHours(0, 0, 0, 0);
      }
      fireChange(now);
      if (mode === "date") {
        setOpen(false);
      }
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

    const showCalendar = mode === "date" || mode === "datetime";
    const showTime = mode === "time" || mode === "datetime";

    const iconName = mode === "time" ? IconName.Clock3 : IconName.Calendar;
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

        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild disabled={disabled}>
            <div className={wrapperClass}>
              <span className="kz-date-picker-icon">
                <Icon name={iconName} size={iconSize} />
              </span>
              <input
                ref={ref}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                placeholder={
                  placeholder ??
                  getDefaultPlaceholder(mode, format, showSeconds)
                }
                disabled={disabled}
                className={inputClass}
                aria-invalid={state === TextInputState.Error}
                aria-describedby={
                  stateMessage != null
                    ? "date-picker-message"
                    : helperText != null
                      ? "date-picker-helper"
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
              <div className="kz-date-picker-body">
                {showCalendar && (
                  <Calendar
                    selected={value}
                    onSelect={handleDateSelect}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                )}

                {showTime && (
                  <TimeSelector
                    hour={currentHour}
                    minute={currentMinute}
                    second={showSeconds ? currentSecond : undefined}
                    onHourChange={handleHourChange}
                    onMinuteChange={handleMinuteChange}
                    onSecondChange={
                      showSeconds ? handleSecondChange : undefined
                    }
                    format={format}
                  />
                )}
              </div>

              {(showTodayButton || showClearButton) && (
                <div className="kz-date-picker-footer">
                  {showTodayButton && (
                    <Button
                      variant={ButtonVariant.Ghost}
                      size={ButtonSize.Sm}
                      onClick={handleToday}
                    >
                      {mode === "time" ? "Now" : "Today"}
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
            id="date-picker-message"
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
              id="date-picker-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
