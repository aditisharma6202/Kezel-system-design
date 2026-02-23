import { KezelVariant, KezelMode } from "../constants/enum";

export { KezelVariant, KezelMode } from "../constants/enum";

import "./default/standard.css";
import "./default/standard.dark.css";
import "./default/neumorphic.css";
import "./default/neumorphic.dark.css";

export const KEZEL_VARIANTS: KezelVariant[] = [
  KezelVariant.Standard,
  KezelVariant.Neumorphic,
];
export const KEZEL_MODES: KezelMode[] = [KezelMode.Light, KezelMode.Dark];
