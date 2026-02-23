import type { TokenKey } from "../contract/token-keys";
import { TokenCategory } from "../../constants/enum";

function categoryForToken(key: TokenKey): TokenCategory {
  if (key.startsWith("color.")) return TokenCategory.Color;
  if (key.startsWith("typography.") && key.endsWith(".color"))
    return TokenCategory.Color;
  if (key.startsWith("shadow.")) return TokenCategory.Shadow;
  if (
    key.startsWith("radius.") ||
    key.startsWith("space.") ||
    key.startsWith("effect.blur.")
  )
    return TokenCategory.Length;
  if (key.startsWith("effect.glass.")) return TokenCategory.Number;
  if (key.startsWith("font.family.")) return TokenCategory.FontFamily;
  if (key.startsWith("font.weight.")) return TokenCategory.FontWeight;
  if (key.startsWith("line.height.")) return TokenCategory.LineHeight;
  if (key.startsWith("motion.duration.")) return TokenCategory.Duration;
  if (key.startsWith("motion.easing.")) return TokenCategory.Easing;
  if (key.startsWith("component.")) {
    if (key.includes(".shadow") || key.includes(".focus.ring"))
      return TokenCategory.Shadow;
    if (
      key.includes(".radius") ||
      key.includes(".blur") ||
      key.includes(".gap") ||
      key.includes(".width")
    )
      return TokenCategory.Length;
    if (key.includes("opacity")) return TokenCategory.Number;
    return TokenCategory.Color;
  }
  return TokenCategory.Length;
}

const re = {
  length: /^-?\d*\.?\d+(px|rem|em|%|vh|vw|vmin|vmax|ch|ex)$/i,
  number: /^-?\d*\.?\d+$/i,
  duration: /^-?\d*\.?\d+(ms|s)$/i,
  fontWeight: /^(100|200|300|400|500|600|700|800|900)$/i,
  easing:
    /^cubic-bezier\(\s*-?\d*\.?\d+\s*,\s*-?\d*\.?\d+\s*,\s*-?\d*\.?\d+\s*,\s*-?\d*\.?\d+\s*\)$/i,
};

export function validateTokenValue(
  key: TokenKey,
  value: string
): { ok: true } | { ok: false; reason: string } {
  const category = categoryForToken(key);
  const v = value.trim();

  // In the browser, CSS.supports is the best “real” validator.
  const canUseCssSupports =
    typeof CSS !== "undefined" && typeof CSS.supports === "function";

  if (category === TokenCategory.Color) {
    if (canUseCssSupports && CSS.supports("color", v)) return { ok: true };
    // fallback: allow hex/rgb(a)/hsl(a)/oklch/var(...)
    const basic =
      /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) ||
      /^rgb(a)?\(/i.test(v) ||
      /^hsl(a)?\(/i.test(v) ||
      /^oklch\(/i.test(v) ||
      /^var\(--/i.test(v);
    return basic
      ? { ok: true }
      : { ok: false, reason: `Invalid color: "${value}"` };
  }

  if (category === TokenCategory.Shadow) {
    if (v === "none") return { ok: true };
    if (canUseCssSupports && CSS.supports("box-shadow", v)) return { ok: true };
    // fallback: accept most shadows & var(...)
    return /^var\(--/i.test(v) || v.includes("px")
      ? { ok: true }
      : { ok: false, reason: `Invalid shadow: "${value}"` };
  }

  if (category === TokenCategory.Length) {
    if (v === "0") return { ok: true };
    if (re.length.test(v) || /^var\(--/i.test(v)) return { ok: true };
    return { ok: false, reason: `Invalid length: "${value}"` };
  }

  if (category === TokenCategory.Number) {
    if (re.number.test(v)) return { ok: true };
    return { ok: false, reason: `Invalid number: "${value}"` };
  }

  if (category === TokenCategory.FontFamily) {
    // allow raw font stacks + var()
    if (v.length > 0) return { ok: true };
    return { ok: false, reason: "Font family cannot be empty" };
  }

  if (category === TokenCategory.FontWeight) {
    if (re.fontWeight.test(v)) return { ok: true };
    return { ok: false, reason: `Invalid font weight: "${value}"` };
  }

  if (category === TokenCategory.Duration) {
    if (re.duration.test(v) || /^var\(--/i.test(v)) return { ok: true };
    return { ok: false, reason: `Invalid duration: "${value}"` };
  }

  if (category === TokenCategory.Easing) {
    if (re.easing.test(v) || /^var\(--/i.test(v)) return { ok: true };
    return { ok: false, reason: `Invalid easing: "${value}"` };
  }

  if (category === TokenCategory.LineHeight) {
    if (re.number.test(v) || /^var\(--/i.test(v)) return { ok: true };
    return { ok: false, reason: `Invalid line height: "${value}"` };
  }

  return { ok: false, reason: `Unknown token category for ${key}` };
}
