import type { LucideIcon } from "lucide-react";
import {
  Search,
  CircleAlert,
  CheckCircle,
  TriangleAlert,
  Loader2,
  ChevronDown,
} from "lucide-react";

export const iconRegistry: Record<string, LucideIcon> = {
  search: Search,
  "circle-alert": CircleAlert,
  "check-circle": CheckCircle,
  "triangle-alert": TriangleAlert,
  "loader-2": Loader2,
  "chevron-down": ChevronDown,
} as const;

export type IconName = keyof typeof iconRegistry;

export const icon = {
  search: "search",
  "circle-alert": "circle-alert",
  "check-circle": "check-circle",
  "triangle-alert": "triangle-alert",
  "loader-2": "loader-2",
  "chevron-down": "chevron-down",
} as const satisfies Record<string, IconName>;
