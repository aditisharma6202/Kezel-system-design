"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  QrRenderer,
  QrPattern,
  Button,
  ButtonVariant,
  ButtonSize,
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
  const [pattern, setPattern] = React.useState(QrPattern.Square);

  // Logo controls
  const [logoUrl, setLogoUrl] = React.useState("");
  const [logoPreview, setLogoPreview] = React.useState<string | undefined>(
    undefined
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setLogoUrl("");
    };
    reader.readAsDataURL(file);
  };

  const effectiveLogo = logoUrl || logoPreview || undefined;

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
        data with custom colors and dot patterns. Supports brand logo overlay.
      </Typography>

      {/* ── Section 1: Generate from data ── */}
      <div className="w-full">
        <Typography variant={TypographyVariantEnum.H3}>
          Generate from Data
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Pass a <code>data</code> prop to generate a QR code on the fly with
          custom foreground/background colors and dot patterns.
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
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          Pattern
          <select
            value={pattern}
            onChange={(e) => setPattern(e.target.value as QrPattern)}
            className="px-2 py-1 rounded text-sm"
            style={{
              background: "var(--kz-component-input-bg)",
              border: "1px solid var(--kz-component-input-border)",
              color: "var(--kz-component-input-text)",
            }}
          >
            <option value={QrPattern.Square}>Square</option>
            <option value={QrPattern.Circle}>Circle</option>
            <option value={QrPattern.Diamond}>Diamond</option>
          </select>
        </label>
      </div>

      {/* Logo controls */}
      <div className="flex flex-wrap items-center gap-4 w-full">
        <label
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          Brand Logo URL
          <input
            type="text"
            value={logoUrl}
            onChange={(e) => {
              setLogoUrl(e.target.value);
              setLogoPreview(undefined);
            }}
            placeholder="https://..."
            className="px-2 py-1 rounded text-sm w-48"
            style={{
              background: "var(--kz-component-input-bg)",
              border: "1px solid var(--kz-component-input-border)",
              color: "var(--kz-component-input-text)",
            }}
          />
        </label>
        <div
          className="flex items-center gap-2 text-sm"
          style={controlLabelStyle}
        >
          or
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Sm}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Logo
          </Button>
          {effectiveLogo && (
            <span className="text-xs" style={controlHintStyle}>
              Logo loaded
            </span>
          )}
        </div>
        {effectiveLogo && (
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Sm}
            onClick={() => {
              setLogoUrl("");
              setLogoPreview(undefined);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            Clear logo
          </Button>
        )}
      </div>

      {/* Generated QR */}
      <div className="flex flex-wrap items-start gap-6 w-full justify-center">
        <QrRenderer
          data={genData}
          size={genSize}
          foregroundColor={fgColor}
          backgroundColor={bgColor}
          errorCorrectionLevel={ecl}
          pattern={pattern}
          logo={effectiveLogo}
          logoScale={0.22}
          label="Generated QR"
          caption={genData}
          downloadable
        />
      </div>

      {/* ── Pattern comparison ── */}
      <div className="w-full mt-4">
        <Typography variant={TypographyVariantEnum.H3}>
          Pattern Styles
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Three dot patterns: <strong>Square</strong> (default),{" "}
          <strong>Circle</strong>, and <strong>Diamond</strong>.
        </Typography>
      </div>
      <div className="flex flex-wrap items-start gap-6 w-full justify-center">
        <QrRenderer
          data="https://kezel.dev"
          size={180}
          pattern={QrPattern.Square}
          label="Square"
        />
        <QrRenderer
          data="https://kezel.dev"
          size={180}
          pattern={QrPattern.Circle}
          label="Circle"
        />
        <QrRenderer
          data="https://kezel.dev"
          size={180}
          pattern={QrPattern.Diamond}
          label="Diamond"
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
          {`import { QrRenderer, QrPattern } from "kz-design-system";

// Generate with circle pattern and brand logo
<QrRenderer
  data="https://kezel.dev"
  pattern={QrPattern.Circle}
  logo="/brand-logo.png"
  logoScale={0.22}
  foregroundColor="#1a1a2e"
  backgroundColor="#e2e8f0"
  size={240}
  label="Scan me"
  downloadable
/>

// Diamond pattern
<QrRenderer
  data="https://kezel.dev"
  pattern={QrPattern.Diamond}
  size={240}
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
