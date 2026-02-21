import type { Config } from "tailwindcss";

export const kezelPreset: Partial<Config> = {
  darkMode: ["class", '[data-mode="dark"]'],

  theme: {
    extend: {
      colors: {
        kz: {
          brand: {
            primary: "var(--kz-color-brand-primary)",
            secondary: "var(--kz-color-brand-secondary)",
            accent: "var(--kz-color-brand-accent)",
          },

          surface: {
            background: "var(--kz-color-surface-background)",
            base: "var(--kz-color-surface-base)",
            raised: "var(--kz-color-surface-raised)",
            sunken: "var(--kz-color-surface-sunken)",
            muted: "var(--kz-color-surface-muted)",
          },

          text: {
            primary: "var(--kz-color-text-primary)",
            secondary: "var(--kz-color-text-secondary)",
            muted: "var(--kz-color-text-muted)",
            inverse: "var(--kz-color-text-inverse)",
          },

          border: {
            DEFAULT: "var(--kz-color-border-default)",
            subtle: "var(--kz-color-border-subtle)",
            strong: "var(--kz-color-border-strong)",
            focus: "var(--kz-color-border-focus)",
          },

          status: {
            success: "var(--kz-color-status-success)",
            warning: "var(--kz-color-status-warning)",
            error: "var(--kz-color-status-error)",
            info: "var(--kz-color-status-info)",
          },
        },
      },

      boxShadow: {
        kz0: "var(--kz-shadow-elevation-0)",
        kz1: "var(--kz-shadow-elevation-1)",
        kz2: "var(--kz-shadow-elevation-2)",
        kz3: "var(--kz-shadow-elevation-3)",
        kz4: "var(--kz-shadow-elevation-4)",
        kz5: "var(--kz-shadow-elevation-5)",
        "kz-inset-1": "var(--kz-shadow-inset-1)",
        "kz-inset-2": "var(--kz-shadow-inset-2)",
      },

      borderRadius: {
        kzNone: "var(--kz-radius-none)",
        kzXs: "var(--kz-radius-xs)",
        kzSm: "var(--kz-radius-sm)",
        kzMd: "var(--kz-radius-md)",
        kzLg: "var(--kz-radius-lg)",
        kzXl: "var(--kz-radius-xl)",
        kzFull: "var(--kz-radius-full)",
      },

      spacing: {
        kz0: "var(--kz-space-0)",
        kz1: "var(--kz-space-1)",
        kz2: "var(--kz-space-2)",
        kz3: "var(--kz-space-3)",
        kz4: "var(--kz-space-4)",
        kz5: "var(--kz-space-5)",
        kz6: "var(--kz-space-6)",
        kz8: "var(--kz-space-8)",
        kz10: "var(--kz-space-10)",
        kz12: "var(--kz-space-12)",
        kz16: "var(--kz-space-16)",
      },

      transitionDuration: {
        kzFast: "var(--kz-motion-duration-fast)",
        kzNormal: "var(--kz-motion-duration-normal)",
        kzSlow: "var(--kz-motion-duration-slow)",
      },

      transitionTimingFunction: {
        kzStandard: "var(--kz-motion-easing-standard)",
        kzEmphasized: "var(--kz-motion-easing-emphasized)",
      },
    },
  },
};
