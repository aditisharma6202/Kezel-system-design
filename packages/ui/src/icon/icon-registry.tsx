import type { LucideIcon } from "lucide-react";
import {
  Search,
  CircleAlert,
  CheckCircle,
  TriangleAlert,
  Loader2,
  ChevronDown,
  BarChart2,
  Shield,
} from "lucide-react";

export const iconRegistry: Record<string, LucideIcon> = {
  search: Search,
  "circle-alert": CircleAlert,
  "check-circle": CheckCircle,
  "triangle-alert": TriangleAlert,
  "loader-2": Loader2,
  "chevron-down": ChevronDown,
  "bar-chart-2": BarChart2,
  shield: Shield,
} as const;

export type IconName = keyof typeof iconRegistry;

export const icon = {
  search: "search",
  "circle-alert": "circle-alert",
  "check-circle": "check-circle",
  "triangle-alert": "triangle-alert",
  "loader-2": "loader-2",
  "chevron-down": "chevron-down",
  "bar-chart-2": "bar-chart-2",
  shield: "shield",
} as const satisfies Record<string, IconName>;
