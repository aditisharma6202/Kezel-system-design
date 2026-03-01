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

/* ── All icon names for the grid ── */
const ALL_ICONS = Object.values(IconName) as IconName[];

/* ── Props ── */

export interface IconPickerProps {
  /** Controlled value (IconName). Omit for uncontrolled. */
  value?: IconName;
  /** Initial value for uncontrolled mode. */
  defaultValue?: IconName;
  /** Fires when an icon is picked or cleared. */
  onChange?: (value: IconName | undefined) => void;

  /** Subset of icon names to display. Defaults to all icons. */
  icons?: IconName[];

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

const IconPicker = React.forwardRef<HTMLInputElement, IconPickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      icons,
      placeholder = "Select icon…",
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
      IconName | undefined
    >(defaultValue);

    const value = isControlled ? valueProp : internalValue;

    const fireChange = React.useCallback(
      (next: IconName | undefined) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const availableIcons = icons ?? ALL_ICONS;

    const filteredIcons = React.useMemo(() => {
      if (searchQuery.trim() === "") return availableIcons;
      const q = searchQuery.toLowerCase();
      return availableIcons.filter((name) => name.includes(q));
    }, [searchQuery, availableIcons]);

    const handleIconClick = (name: IconName) => {
      fireChange(name);
      setOpen(false);
      setSearchQuery("");
    };

    const handleClear = () => {
      fireChange(undefined);
      setOpen(false);
      setSearchQuery("");
    };

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        setSearchQuery("");
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

    const rootClass = cn("kz-icon-picker-root", className);

    const wrapperClass = cn(
      "kz-icon-picker-wrapper",
      `kz-icon-picker-wrapper--${variant}`,
      `kz-icon-picker-wrapper--${size}`,
      state !== TextInputState.Default && `kz-icon-picker-wrapper--${state}`,
      open && "kz-icon-picker-wrapper--open"
    );

    const inputClass = cn(
      "kz-icon-picker-input",
      `kz-icon-picker-input--${size}`,
      inputClassName
    );

    const iconSize = size === TextInputSize.Sm ? 14 : 16;

    return (
      <div className={rootClass}>
        {label != null && label !== "" && (
          <label className="kz-icon-picker-label">
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

        <Popover.Root open={open} onOpenChange={handleOpenChange}>
          <Popover.Trigger asChild disabled={disabled}>
            <div className={wrapperClass}>
              <span className="kz-icon-picker-icon">
                <Icon name={value ?? IconName.LayoutGrid} size={iconSize} />
              </span>
              <input
                ref={ref}
                type="text"
                value={value ?? ""}
                readOnly
                placeholder={placeholder}
                disabled={disabled}
                className={inputClass}
                aria-invalid={state === TextInputState.Error}
                aria-describedby={
                  stateMessage != null
                    ? "icon-picker-message"
                    : helperText != null
                      ? "icon-picker-helper"
                      : undefined
                }
              />
              <button
                type="button"
                className="kz-icon-picker-toggle"
                tabIndex={-1}
                aria-label="Toggle icon picker"
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
              className="kz-icon-picker-popover"
              sideOffset={4}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              {/* Search */}
              <div className="kz-icon-picker-search-wrapper">
                <Icon name={IconName.Search} size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search icons…"
                  className="kz-icon-picker-search-input"
                />
              </div>

              {/* Grid */}
              <div className="kz-icon-picker-grid-wrapper">
                <div className="kz-icon-picker-grid">
                  {filteredIcons.length === 0 ? (
                    <span className="kz-icon-picker-empty">No icons found</span>
                  ) : (
                    filteredIcons.map((name) => (
                      <button
                        key={name}
                        type="button"
                        className={cn(
                          "kz-icon-picker-cell",
                          value === name && "kz-icon-picker-cell--selected"
                        )}
                        title={name}
                        onClick={() => handleIconClick(name)}
                      >
                        <Icon name={name} size="sm" />
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="kz-icon-picker-footer">
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
            id="icon-picker-message"
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
              id="icon-picker-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

IconPicker.displayName = "IconPicker";

export { IconPicker };
