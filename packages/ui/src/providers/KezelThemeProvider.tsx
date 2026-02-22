"use client";

import React, { useLayoutEffect } from "react";
import type { TokenOverrides } from "../tokens/apply/applyTokenOverrides";
import { applyTokenOverrides } from "../tokens/apply/applyTokenOverrides";
import { KezelVariant, KezelMode, OverrideMode } from "../constants/enum";

export { KezelVariant, KezelMode, OverrideMode } from "../constants/enum";

export interface KezelThemeProviderProps {
  children: React.ReactNode;
  variant?: KezelVariant;
  mode?: KezelMode;
  tokens?: TokenOverrides;
  validation?: OverrideMode;
}

export function KezelThemeProvider({
  children,
  variant = KezelVariant.Standard,
  mode = KezelMode.Light,
  tokens,
  validation = OverrideMode.Safe,
}: KezelThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    root.dataset.variant = variant;
    root.dataset.mode = mode === KezelMode.Dark ? "dark" : "light";

    root.classList.toggle("dark", mode === KezelMode.Dark);

    applyTokenOverrides(root, tokens, validation);
  }, [variant, mode, tokens, validation]);

  return <>{children}</>;
}
