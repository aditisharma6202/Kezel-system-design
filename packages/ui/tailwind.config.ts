import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", ".dark"],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border) / var(--border-opacity))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        ring: "rgb(var(--ring))",
        "app-background": "rgb(var(--app-background))",
        "accent-brand": "rgb(var(--accent-brand))",
        "text-primary": "rgb(var(--text-primary))",
        "card-pressed": "rgb(var(--card-pressed))",
        input: "rgb(var(--input) / var(--input-opacity))",
        "input-background": "rgb(var(--input-background))",
        "switch-background": "rgb(var(--switch-background))",
        chart: {
          1: "rgb(var(--chart-1))",
          2: "rgb(var(--chart-2))",
          3: "rgb(var(--chart-3))",
          4: "rgb(var(--chart-4))",
          5: "rgb(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "rgb(var(--sidebar))",
          foreground: "rgb(var(--sidebar-foreground))",
          primary: "rgb(var(--sidebar-primary))",
          "primary-foreground": "rgb(var(--sidebar-primary-foreground))",
          accent: "rgb(var(--sidebar-accent))",
          "accent-foreground": "rgb(var(--sidebar-accent-foreground))",
          border: "rgb(var(--sidebar-border))",
          ring: "rgb(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "btn-neu": "var(--btn-neu-radius)",
      },
      boxShadow: {
        "neumorphic-raised": "var(--raised-shadow)",
        "neumorphic-inset": "var(--inset-shadow)",
        "btn-primary": "var(--btn-primary-shadow)",
        "btn-primary-hover": "var(--btn-primary-shadow-hover)",
        "btn-primary-active": "var(--btn-primary-shadow-active)",
        "btn-secondary": "var(--btn-secondary-shadow)",
        "btn-secondary-hover": "var(--btn-secondary-shadow-hover)",
        "btn-secondary-active": "var(--btn-secondary-shadow-active)",
      },
    },
  },
  plugins: [],
};

export default config;
