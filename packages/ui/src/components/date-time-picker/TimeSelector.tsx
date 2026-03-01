import * as React from "react";
import { cn } from "../../utils/cn";

export interface TimeSelectorProps {
  hour: number;
  minute: number;
  /** Pass a number (0-59) to show the seconds column. Omit to hide it. */
  second?: number;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
  onSecondChange?: (second: number) => void;
  format?: "12h" | "24h";
  className?: string;
}

function to12Hour(h24: number): { hour12: number; period: "AM" | "PM" } {
  const period: "AM" | "PM" = h24 >= 12 ? "PM" : "AM";
  let hour12 = h24 % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, period };
}

function to24Hour(hour12: number, period: "AM" | "PM"): number {
  if (period === "AM") return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

const SIXTY = Array.from({ length: 60 }, (_, i) => i);

const TimeSelector: React.FC<TimeSelectorProps> = ({
  hour,
  minute,
  second,
  onHourChange,
  onMinuteChange,
  onSecondChange,
  format = "12h",
  className,
}) => {
  const is12h = format === "12h";
  const showSeconds = second !== undefined && onSecondChange !== undefined;
  const { hour12, period } = to12Hour(hour);
  const [currentPeriod, setCurrentPeriod] = React.useState<"AM" | "PM">(period);

  React.useEffect(() => {
    setCurrentPeriod(period);
  }, [period]);

  const hourRef = React.useRef<HTMLDivElement>(null);
  const minuteRef = React.useRef<HTMLDivElement>(null);
  const secondRef = React.useRef<HTMLDivElement>(null);

  const hours = is12h
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);

  const selectedHourDisplay = is12h ? hour12 : hour;

  const handleHourSelect = (h: number) => {
    if (is12h) {
      onHourChange(to24Hour(h, currentPeriod));
    } else {
      onHourChange(h);
    }
  };

  const handlePeriodSelect = (p: "AM" | "PM") => {
    setCurrentPeriod(p);
    if (is12h) {
      onHourChange(to24Hour(hour12, p));
    }
  };

  const scrollToSelected = React.useCallback(
    (ref: React.RefObject<HTMLDivElement | null>, value: number) => {
      if (ref.current == null) return;
      const selected = ref.current.querySelector(
        `[data-value="${value}"]`
      ) as HTMLElement | null;
      if (selected != null) {
        selected.scrollIntoView({ block: "center", behavior: "instant" });
      }
    },
    []
  );

  React.useEffect(() => {
    scrollToSelected(hourRef, selectedHourDisplay);
  }, [scrollToSelected, selectedHourDisplay]);

  React.useEffect(() => {
    scrollToSelected(minuteRef, minute);
  }, [scrollToSelected, minute]);

  React.useEffect(() => {
    if (showSeconds && second !== undefined) {
      scrollToSelected(secondRef, second);
    }
  }, [scrollToSelected, second, showSeconds]);

  return (
    <div className={cn("kz-time-selector", className)}>
      <div className="kz-time-selector-columns">
        {/* Hour column */}
        <div className="kz-time-selector-column">
          <div className="kz-time-selector-label">Hr</div>
          <div className="kz-time-selector-scroll" ref={hourRef}>
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                data-value={h}
                onClick={() => handleHourSelect(h)}
                className={cn(
                  "kz-time-selector-option",
                  h === selectedHourDisplay &&
                    "kz-time-selector-option--selected"
                )}
              >
                {h.toString().padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        <div className="kz-time-selector-separator">:</div>

        {/* Minute column */}
        <div className="kz-time-selector-column">
          <div className="kz-time-selector-label">Min</div>
          <div className="kz-time-selector-scroll" ref={minuteRef}>
            {SIXTY.map((m) => (
              <button
                key={m}
                type="button"
                data-value={m}
                onClick={() => onMinuteChange(m)}
                className={cn(
                  "kz-time-selector-option",
                  m === minute && "kz-time-selector-option--selected"
                )}
              >
                {m.toString().padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        {/* Seconds column (optional) */}
        {showSeconds && (
          <>
            <div className="kz-time-selector-separator">:</div>

            <div className="kz-time-selector-column">
              <div className="kz-time-selector-label">Sec</div>
              <div className="kz-time-selector-scroll" ref={secondRef}>
                {SIXTY.map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-value={s}
                    onClick={() => onSecondChange(s)}
                    className={cn(
                      "kz-time-selector-option",
                      s === second && "kz-time-selector-option--selected"
                    )}
                  >
                    {s.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* AM/PM column */}
        {is12h && (
          <div className="kz-time-selector-column kz-time-selector-column--period">
            <div className="kz-time-selector-label">&nbsp;</div>
            <div className="kz-time-selector-scroll kz-time-selector-scroll--period">
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePeriodSelect(p)}
                  className={cn(
                    "kz-time-selector-option",
                    p === currentPeriod && "kz-time-selector-option--selected"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

TimeSelector.displayName = "TimeSelector";

export { TimeSelector };
