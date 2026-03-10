"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  QrRenderer,
} from "kz-design-system";

/* The base64 QR image provided by the user */
const SAMPLE_QR_BASE64 =
  "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";

const SAMPLE_DEBUG = {
  qr_size_modules: 37,
  module_size_px: 8,
  native_img_px: 296,
  out_size_px: 320,
  pattern_style: "circle" as const,
  border_modules: 2,
  org: "LGw1YdzDRPZR",
  has_logo: true,
  logo_source: "file",
};

export default function QrRendererShowcase() {
  const [size, setSize] = React.useState(240);
  const [showDebug, setShowDebug] = React.useState(false);
  const [showLabel, setShowLabel] = React.useState(true);

  // Generate-from-data controls
  const [genData, setGenData] = React.useState("https://kezel.dev");
  const [fgColor, setFgColor] = React.useState("#000000");
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [genSize, setGenSize] = React.useState(240);
  const [ecl, setEcl] = React.useState<"L" | "M" | "Q" | "H">("M");

  const controlLabelStyle: React.CSSProperties = {
    color: "var(--kz-component-input-text)",
  };
  const controlHintStyle: React.CSSProperties = {
    color: "var(--kz-component-input-placeholder)",
  };

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <Typography variant={TypographyVariantEnum.H2}>QR Renderer</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Renders QR codes from pre-built images or generates them from text/URL
        data with custom colors. Adapts to all theme variants.
      </Typography>

      {/* ── Section 1: Generate from data ── */}
      <div className="w-full">
        <Typography variant={TypographyVariantEnum.H3}>
          Generate from Data
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Pass a <code>data</code> prop to generate a QR code on the fly with
          custom foreground/background colors.
        </Typography>
      </div>

      {/* Generate controls */}
      <div className="flex flex-wrap items-center gap-4 w-full">
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          Data
          <input
            type="text"
            value={genData}
            onChange={(e) => setGenData(e.target.value)}
            className="px-2 py-1 rounded text-sm w-48"
            style={{
              background: "var(--kz-component-input-bg)",
              border: "1px solid var(--kz-component-input-border)",
              color: "var(--kz-component-input-text)",
            }}
          />
        </label>
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          FG
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
          <span className="font-mono text-xs" style={controlHintStyle}>
            {fgColor}
          </span>
        </label>
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          BG
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
          <span className="font-mono text-xs" style={controlHintStyle}>
            {bgColor}
          </span>
        </label>
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          Size
          <input
            type="range"
            min={100}
            max={400}
            step={20}
            value={genSize}
            onChange={(e) => setGenSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="font-mono text-xs" style={controlHintStyle}>
            {genSize}px
          </span>
        </label>
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          ECL
          <select
            value={ecl}
            onChange={(e) => setEcl(e.target.value as "L" | "M" | "Q" | "H")}
            className="px-2 py-1 rounded text-sm"
            style={{
              background: "var(--kz-component-input-bg)",
              border: "1px solid var(--kz-component-input-border)",
              color: "var(--kz-component-input-text)",
            }}
          >
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </label>
      </div>

      {/* Generated QR */}
      <div className="flex flex-wrap items-start gap-6 w-full justify-center">
        <QrRenderer
          data={genData}
          size={genSize}
          foregroundColor={fgColor}
          backgroundColor={bgColor}
          errorCorrectionLevel={ecl}
          label="Generated QR"
          caption={genData}
          downloadable
        />
      </div>

      {/* ── Section 2: Pre-rendered image ── */}
      <div className="w-full mt-4">
        <Typography variant={TypographyVariantEnum.H3}>
          Pre-rendered Image
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Pass an <code>image</code> prop with a base64 string, data URI, or
          URL.
        </Typography>
      </div>

      {/* Pre-rendered controls */}
      <div className="flex flex-wrap items-center gap-4 w-full">
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          Size
          <input
            type="range"
            min={100}
            max={400}
            step={20}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-28"
          />
          <span className="font-mono text-xs" style={controlHintStyle}>
            {size}px
          </span>
        </label>
        <label
          className="flex items-center gap-2 text-sm cursor-pointer"
          style={controlLabelStyle}
        >
          <input
            type="checkbox"
            checked={showDebug}
            onChange={(e) => setShowDebug(e.target.checked)}
          />
          Show debug
        </label>
        <label
          className="flex items-center gap-2 text-sm cursor-pointer"
          style={controlLabelStyle}
        >
          <input
            type="checkbox"
            checked={showLabel}
            onChange={(e) => setShowLabel(e.target.checked)}
          />
          Show label
        </label>
      </div>

      {/* Pre-rendered QR demos */}
      <div className="flex flex-wrap items-start gap-6 w-full justify-center">
        <QrRenderer
          image={SAMPLE_QR_BASE64}
          size={size}
          label={showLabel ? "Scan to connect" : undefined}
          caption={showLabel ? "Circle pattern \u00B7 37 modules" : undefined}
          debug={SAMPLE_DEBUG}
          showDebug={showDebug}
          downloadable
        />
        <QrRenderer
          image={SAMPLE_QR_BASE64}
          size={160}
          alt="Small QR"
          label={showLabel ? "Compact" : undefined}
        />
      </div>

      {/* Usage code */}
      <div className="w-full mt-4">
        <Typography variant={TypographyVariantEnum.H3}>Usage</Typography>
        <pre
          className="mt-2 p-4 rounded-[var(--kz-component-input-radius)] border border-[var(--kz-component-input-border)] bg-[var(--kz-component-input-bg)] overflow-x-auto"
          style={{
            color: "var(--kz-component-input-text)",
            boxShadow: "var(--kz-component-input-shadow)",
            fontFamily:
              "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
            fontSize: 13,
            lineHeight: "20px",
          }}
        >
          {`import { QrRenderer } from "kz-design-system";

// Generate from data with custom colors
<QrRenderer
  data="https://kezel.dev"
  foregroundColor="#1a1a2e"
  backgroundColor="#e2e8f0"
  size={240}
  errorCorrectionLevel="H"
  label="Scan me"
  downloadable
/>

// Render a pre-built image
<QrRenderer
  image={base64String}
  size={240}
  label="Scan to connect"
  downloadable
/>`}
        </pre>
      </div>
    </section>
  );
}
