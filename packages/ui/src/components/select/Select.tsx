import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import {
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "../../constants/enum";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";
import { Icon, IconName } from "../../icon";
import { Checkbox } from "../checkbox";
import { CheckboxSize } from "../../constants/enum";

/* ── Types ── */

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Available options. */
  options: SelectOption[];
  /** Enable multi-select mode. Default: false */
  multiple?: boolean;

  /** Controlled value. Single: string; Multi: string[]. Omit for uncontrolled. */
  value?: string | string[];
  /** Initial value for uncontrolled mode. */
  defaultValue?: string | string[];
  /** Fires when selection changes. */
  onChange?: (value: string | string[]) => void;

  placeholder?: string;
  /** Show a search input inside the popover. Default: false */
  searchable?: boolean;
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
}

/* ── Helpers ── */

function normalizeValue(
  v: string | string[] | undefined,
  multiple: boolean
): string[] {
  if (v === undefined) return [];
  if (Array.isArray(v)) return v;
  return multiple ? [v] : [v];
}

/* ── Component ── */

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      multiple = false,
      value: valueProp,
      defaultValue,
      onChange,
      placeholder = "Select\u2026",
      searchable = false,
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
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(
      normalizeValue(defaultValue, multiple)
    );

    const selected = normalizeValue(
      isControlled
        ? valueProp
        : multiple
          ? internalValue
          : (internalValue[0] as string | undefined),
      multiple
    );

    const fireChange = React.useCallback(
      (next: string[]) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(multiple ? next : (next[0] ?? ""));
      },
      [isControlled, multiple, onChange]
    );

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const searchRef = React.useRef<HTMLInputElement>(null);

    const filteredOptions = React.useMemo(() => {
      if (!search) return options;
      const lower = search.toLowerCase();
      return options.filter((o) => o.label.toLowerCase().includes(lower));
    }, [options, search]);

    const handleItemClick = (optionValue: string) => {
      if (multiple) {
        const idx = selected.indexOf(optionValue);
        const next =
          idx >= 0
            ? selected.filter((v) => v !== optionValue)
            : [...selected, optionValue];
        fireChange(next);
      } else {
        fireChange([optionValue]);
        setOpen(false);
      }
    };

    const handleTagRemove = (e: React.MouseEvent, optionValue: string) => {
      e.stopPropagation();
      fireChange(selected.filter((v) => v !== optionValue));
    };

    const handleOpenChange = (nextOpen: boolean) => {
      if (disabled) return;
      setOpen(nextOpen);
      if (!nextOpen) setSearch("");
    };

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const rootClass = cn("kz-select-root", className);

    const wrapperClass = cn(
      "kz-select-wrapper",
      `kz-select-wrapper--${variant}`,
      `kz-select-wrapper--${size}`,
      state !== TextInputState.Default && `kz-select-wrapper--${state}`,
      open && "kz-select-wrapper--open",
      disabled && "kz-select-wrapper--disabled"
    );

    const valueClass = cn(
      "kz-select-value",
      `kz-select-value--${size}`,
      selected.length === 0 && "kz-select-value--placeholder"
    );

    const iconSize = size === TextInputSize.Sm ? 14 : 16;

    const getLabel = (val: string) =>
      options.find((o) => o.value === val)?.label ?? val;

    return (
      <div className={rootClass} ref={ref}>
        {label != null && label !== "" && (
          <label className="kz-select-label">
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
              {multiple ? (
                <div className="kz-select-tags">
                  {selected.length === 0 && (
                    <span className="kz-select-tags-placeholder">
                      {placeholder}
                    </span>
                  )}
                  {selected.map((val) => (
                    <span key={val} className="kz-select-tag">
                      {getLabel(val)}
                      <button
                        type="button"
                        className="kz-select-tag-remove"
                        onClick={(e) => handleTagRemove(e, val)}
                        aria-label={`Remove ${getLabel(val)}`}
                      >
                        <Icon name={IconName.X} size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className={valueClass}>
                  {selected.length > 0 ? getLabel(selected[0]) : placeholder}
                </span>
              )}
              <span className="kz-select-toggle">
                <Icon name={IconName.ChevronDown} size={iconSize} />
              </span>
            </div>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="kz-select-popover"
              sideOffset={4}
              align="start"
              style={{ width: "var(--radix-popover-trigger-width)" }}
              onOpenAutoFocus={(e) => {
                if (searchable) {
                  e.preventDefault();
                  searchRef.current?.focus();
                }
              }}
            >
              {searchable && (
                <div className="kz-select-search">
                  <Icon
                    name={IconName.Search}
                    size={14}
                    className="kz-select-search-icon"
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search\u2026"
                    className="kz-select-search-input"
                  />
                </div>
              )}

              <ul className="kz-select-list" role="listbox">
                {filteredOptions.length === 0 && (
                  <li className="kz-select-empty">No options</li>
                )}
                {filteredOptions.map((opt) => {
                  const isSelected = selected.includes(opt.value);
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      className={cn(
                        "kz-select-item",
                        isSelected && "kz-select-item--selected"
                      )}
                      onClick={() => handleItemClick(opt.value)}
                    >
                      {multiple ? (
                        <Checkbox
                          size={CheckboxSize.Sm}
                          checked={isSelected}
                          onCheckedChange={() => handleItemClick(opt.value)}
                          onClick={(e) => e.stopPropagation()}
                          tabIndex={-1}
                        />
                      ) : (
                        <span className="kz-select-item-check">
                          {isSelected && (
                            <Icon name={IconName.CheckCircle} size={14} />
                          )}
                        </span>
                      )}
                      <span className="kz-select-item-label">{opt.label}</span>
                    </li>
                  );
                })}
              </ul>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {stateMessage != null && stateMessage !== "" && (
          <Typography
            id="select-message"
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
              id="select-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
