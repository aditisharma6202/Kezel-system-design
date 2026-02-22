/** Preset icon sizes (px). Use with Icon size prop. */
export const iconSize = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

export type IconSizeKey = keyof typeof iconSize;
