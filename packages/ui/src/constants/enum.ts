export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum ThemeStyle {
  Enterprise = "enterprise",
  Neumorphic = "neumorphic",
  Standard = "standard",
  Glassmorphic = "glassmorphic",
}

/** Token theme variant: standard (flat) or neumorphic. */
export enum KezelVariant {
  Standard = "standard",
  Neumorphic = "neumorphic",
}

/** Token theme mode: light or dark. Use KezelMode.Light / KezelMode.Dark (not string "light"/"dark"). */
export enum KezelMode {
  Light,
  Dark,
}

export enum ButtonVariant {
  Accent = "accent",
  Primary = "primary",
  Container = "container",
}

export enum ButtonSize {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

/** Native button type attribute: button, submit, or reset. */
export enum ButtonType {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

export enum TokenCategory {
  Color = "color",
  Shadow = "shadow",
  Length = "length",
  Number = "number",
  LineHeight = "lineHeight",
  FontFamily = "fontFamily",
  FontWeight = "fontWeight",
  Duration = "duration",
  Easing = "easing",
}

/** Token override validation: strict throws on invalid values, safe skips them. */
export enum OverrideMode {
  Safe = "safe",
  Strict = "strict",
}
