import { KezelVariant, KezelMode } from "../constants/enum";

export { KezelVariant, KezelMode } from "../constants/enum";

import "./themes/base.css";
import "./themes/default/standard.css";
import "./themes/default/standard.dark.css";
import "./themes/default/neumorphic.css";
import "./themes/default/neumorphic.dark.css";

export const KEZEL_VARIANTS: KezelVariant[] = [
  KezelVariant.Standard,
  KezelVariant.Neumorphic,
];
export const KEZEL_MODES: KezelMode[] = [KezelMode.Light, KezelMode.Dark];
