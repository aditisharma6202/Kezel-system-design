import type { LucideIcon } from "lucide-react";
import { Search, CircleAlert, CheckCircle, TriangleAlert } from "lucide-react";

export const iconRegistry: Record<string, LucideIcon> = {
  search: Search,
  "circle-alert": CircleAlert,
  "check-circle": CheckCircle,
  "triangle-alert": TriangleAlert,
} as const;

export type IconName = keyof typeof iconRegistry;

export const icon = {
  search: "search",
  "circle-alert": "circle-alert",
  "check-circle": "check-circle",
  "triangle-alert": "triangle-alert",
} as const satisfies Record<string, IconName>;
