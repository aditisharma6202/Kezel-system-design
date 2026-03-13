"use client";

import React, { useLayoutEffect } from "react";
import type { TokenOverrides } from "../tokens/apply/applyTokenOverrides";
import {
  applyTokenOverrides,
  clearTokenOverrides,
} from "../tokens/apply/applyTokenOverrides";
import { KezelVariant, KezelMode, OverrideMode } from "../constants/enum";

export { KezelVariant, KezelMode, OverrideMode } from "../constants/enum";

export interface KezelThemeProviderProps {
  children: React.ReactNode;
  variant?: KezelVariant;
  mode?: KezelMode;

  /** Overrides applied to all variant+mode combinations */
  tokens?: TokenOverrides;

  /** Overrides applied only in light mode */
  lightTokens?: TokenOverrides;
  /** Overrides applied only in dark mode */
  darkTokens?: TokenOverrides;

  /** Overrides applied only when variant is standard */
  standardTokens?: TokenOverrides;
  /** Overrides applied only when variant is neumorphic */
  neumorphicTokens?: TokenOverrides;

  /**
   * Overrides scoped to a specific variant+mode pair.
   * e.g. { "standard.dark": { "color.surface.base": "#111" } }
   */
  variantModeTokens?: Partial<
    Record<`${KezelVariant}.${KezelMode}`, TokenOverrides>
  >;

  validation?: OverrideMode;
}

export function KezelThemeProvider({
  children,
  variant = KezelVariant.Standard,
  mode = KezelMode.Light,
  tokens,
  lightTokens,
  darkTokens,
  standardTokens,
  neumorphicTokens,
  variantModeTokens,
  validation = OverrideMode.Safe,
}: KezelThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    root.dataset.variant = variant;
    root.dataset.mode = mode === KezelMode.Dark ? "dark" : "light";

    root.classList.toggle("dark", mode === KezelMode.Dark);

    // Clear previous overrides before applying new ones
    clearTokenOverrides(root);

    // Resolution order: tokens → mode-scoped → variant-scoped → variantModeTokens
    // Later layers win (inline style last-write-wins)
    applyTokenOverrides(root, tokens, validation);

    // Mode-scoped
    if (mode === KezelMode.Light) {
      applyTokenOverrides(root, lightTokens, validation);
    } else {
      applyTokenOverrides(root, darkTokens, validation);
    }

    // Variant-scoped
    if (variant === KezelVariant.Standard) {
      applyTokenOverrides(root, standardTokens, validation);
    } else if (variant === KezelVariant.Neumorphic) {
      applyTokenOverrides(root, neumorphicTokens, validation);
    }

    // Variant+mode scoped (most specific)
    const vmKey = `${variant}.${mode}` as `${KezelVariant}.${KezelMode}`;
    applyTokenOverrides(root, variantModeTokens?.[vmKey], validation);
  }, [
    variant,
    mode,
    tokens,
    lightTokens,
    darkTokens,
    standardTokens,
    neumorphicTokens,
    variantModeTokens,
    validation,
  ]);

  return <>{children}</>;
}
