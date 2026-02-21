import type { TokenKey } from "../tokens/contract/token-keys";

export type { TokenKey } from "../tokens/contract/token-keys";
export { TOKEN_KEYS } from "../tokens/contract/token-keys";

export type CssVarName = `--kz-${string}`;
export type TokenToCssVarMap = Record<TokenKey, CssVarName>;

export type { TokenOverrides } from "../tokens/apply/applyTokenOverrides";
export { OverrideMode } from "../constants/enum";

export type ValidationResult = { ok: true } | { ok: false; reason: string };

export { TokenCategory } from "../constants/enum";
