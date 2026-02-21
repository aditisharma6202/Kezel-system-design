import type { TokenKey } from "../contract/token-keys";
import { tokenToCssVar } from "../contract/css-var-maps";
import { validateTokenValue } from "../validate/validateTokenValue";
import { OverrideMode } from "../../constants/enum";

export type TokenOverrides = Partial<Record<TokenKey, string>>;

export function applyTokenOverrides(
  el: HTMLElement,
  overrides: TokenOverrides | undefined,
  mode: OverrideMode = OverrideMode.Safe
) {
  if (!overrides) return;

  for (const [key, value] of Object.entries(overrides) as Array<
    [TokenKey, string]
  >) {
    const cssVar = tokenToCssVar[key];
    const result = validateTokenValue(key, value);

    if (!result.ok) {
      const msg = `[Kezel] Invalid token override ${key}: ${result.reason}`;
      if (mode === OverrideMode.Strict) throw new Error(msg);
      continue;
    }

    el.style.setProperty(cssVar, value.trim());
  }
}
