import * as React from "react";
import { cn } from "../../utils/cn";
import { Icon, IconName } from "../../icon";

export interface CalendarProps {
  /** Single-date selection (used by DateTimePicker). */
  selected?: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;

  /** Range mode — start of range. */
  selectedStart?: Date;
  /** Range mode — end of range. */
  selectedEnd?: Date;
  /** Range mode — date currently hovered (for preview highlight). */
  hoverDate?: Date;
  /** Range mode — fires on cell mouse enter/leave. */
  onHover?: (date: Date | null) => void;

  /** Hide the prev-month nav button (used by DateRangePicker right panel). */
  hidePrev?: boolean;
  /** Hide the next-month nav button (used by DateRangePicker left panel). */
  hideNext?: boolean;
  /** External control of the displayed month. */
  viewMonth?: Date;
  /** Fires when nav buttons change the displayed month. */
  onViewMonthChange?: (date: Date) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date) {
  return isSameDay(date, new Date());
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date) {
  if (minDate != null) {
    const min = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    );
    if (date < min) return true;
  }
  if (maxDate != null) {
    const max = new Date(
      maxDate.getFullYear(),
      maxDate.getMonth(),
      maxDate.getDate()
    );
    if (date > max) return true;
  }
  return false;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isWithinRange(date: Date, start?: Date, end?: Date): boolean {
  if (start == null || end == null) return false;
  const d = date.getTime();
  const s = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  ).getTime();
  const e = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  ).getTime();
  const lo = Math.min(s, e);
  const hi = Math.max(s, e);
  return d > lo && d < hi;
}

const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  minDate,
  maxDate,
  className,
  selectedStart,
  selectedEnd,
  hoverDate,
  onHover,
  hidePrev = false,
  hideNext = false,
  viewMonth: viewMonthProp,
  onViewMonthChange,
}) => {
  const isRangeMode = selectedStart !== undefined || selectedEnd !== undefined;

  const [internalViewDate, setInternalViewDate] = React.useState(
    () => viewMonthProp ?? selected ?? selectedStart ?? new Date()
  );
  const viewDate = viewMonthProp ?? internalViewDate;

  const setViewDate = React.useCallback(
    (d: Date) => {
      if (onViewMonthChange != null) {
        onViewMonthChange(d);
      } else {
        setInternalViewDate(d);
      }
    },
    [onViewMonthChange]
  );

  const [focusedDate, setFocusedDate] = React.useState<Date | null>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells: { date: Date; inMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      inMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(year, month + 1, d), inMonth: false });
  }

  // Focus the correct button when focusedDate changes
  React.useEffect(() => {
    if (focusedDate == null || gridRef.current == null) return;
    const dateStr = focusedDate.toISOString().split("T")[0];
    const btn = gridRef.current.querySelector(
      `[data-date="${dateStr}"]`
    ) as HTMLButtonElement | null;
    btn?.focus();
  }, [focusedDate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const current =
      focusedDate ?? selected ?? selectedStart ?? new Date(year, month, 1);
    let next: Date | null = null;

    switch (e.key) {
      case "ArrowLeft":
        next = addDays(current, -1);
        break;
      case "ArrowRight":
        next = addDays(current, 1);
        break;
      case "ArrowUp":
        next = addDays(current, -7);
        break;
      case "ArrowDown":
        next = addDays(current, 7);
        break;
      case "Enter":
      case " ":
        if (!isDateDisabled(current, minDate, maxDate)) {
          onSelect(current);
        }
        e.preventDefault();
        return;
      default:
        return;
    }

    e.preventDefault();

    if (next != null) {
      if (!isDateDisabled(next, minDate, maxDate)) {
        setFocusedDate(next);
        if (next.getMonth() !== month || next.getFullYear() !== year) {
          setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
        }
      }
    }
  };

  // Determine the effective range end for highlighting (hover preview or actual end)
  const rangeEnd = hoverDate ?? selectedEnd;

  return (
    <div
      className={cn("kz-calendar", className)}
      role="grid"
      aria-label="Calendar"
    >
      <div className="kz-calendar-header">
        {hidePrev ? (
          <span className="kz-calendar-nav" style={{ visibility: "hidden" }} />
        ) : (
          <button
            type="button"
            onClick={prevMonth}
            className="kz-calendar-nav"
            aria-label="Previous month"
          >
            <Icon name={IconName.ChevronLeft} size={16} />
          </button>
        )}
        <span className="kz-calendar-title" aria-live="polite">
          {MONTHS[month]} {year}
        </span>
        {hideNext ? (
          <span className="kz-calendar-nav" style={{ visibility: "hidden" }} />
        ) : (
          <button
            type="button"
            onClick={nextMonth}
            className="kz-calendar-nav"
            aria-label="Next month"
          >
            <Icon name={IconName.ChevronRight} size={16} />
          </button>
        )}
      </div>

      <div
        className="kz-calendar-grid"
        ref={gridRef}
        onKeyDown={handleKeyDown}
        role="grid"
      >
        {DAYS.map((day) => (
          <div key={day} className="kz-calendar-day-name" role="columnheader">
            {day}
          </div>
        ))}
        {cells.map((cell, i) => {
          const disabled =
            !cell.inMonth || isDateDisabled(cell.date, minDate, maxDate);
          const today = isToday(cell.date) && cell.inMonth;
          const isFocused =
            focusedDate != null && isSameDay(cell.date, focusedDate);
          const dateStr = cell.date.toISOString().split("T")[0];

          // Single-date selection
          const isSelected =
            !isRangeMode &&
            selected != null &&
            cell.inMonth &&
            isSameDay(cell.date, selected);

          // Range selection
          const isStart =
            isRangeMode &&
            selectedStart != null &&
            cell.inMonth &&
            isSameDay(cell.date, selectedStart);
          const isEnd =
            isRangeMode &&
            rangeEnd != null &&
            cell.inMonth &&
            isSameDay(cell.date, rangeEnd);
          const inRange =
            isRangeMode &&
            cell.inMonth &&
            isWithinRange(cell.date, selectedStart, rangeEnd);

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              data-date={dateStr}
              onClick={() => {
                onSelect(cell.date);
                setFocusedDate(cell.date);
              }}
              onMouseEnter={() => onHover?.(cell.date)}
              onMouseLeave={() => onHover?.(null)}
              className={cn(
                "kz-calendar-cell",
                !cell.inMonth && "kz-calendar-cell--outside",
                isSelected && "kz-calendar-cell--selected",
                isStart && "kz-calendar-cell--range-start",
                isEnd && "kz-calendar-cell--range-end",
                inRange && "kz-calendar-cell--in-range",
                today && "kz-calendar-cell--today",
                disabled && "kz-calendar-cell--disabled"
              )}
              tabIndex={
                isFocused
                  ? 0
                  : (isSelected || isStart) && focusedDate == null
                    ? 0
                    : -1
              }
              role="gridcell"
              aria-selected={isSelected || isStart || isEnd}
              aria-label={cell.date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
