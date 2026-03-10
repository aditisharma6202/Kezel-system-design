import * as React from "react";
import QRCode from "qrcode";
import { cn } from "../../utils/cn";
import { Button, ButtonVariant, ButtonSize } from "../button";
import { Icon, IconName } from "../../icon";
import type { QrRendererProps } from "./QrRenderer.types";

function resolveImageSrc(image: string): string {
  if (image.startsWith("data:") || image.startsWith("http")) {
    return image;
  }
  return `data:image/png;base64,${image}`;
}

function QrRendererInner(
  props: QrRendererProps,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    size = 200,
    alt = "QR Code",
    logo,
    logoScale = 0.2,
    label,
    caption,
    debug,
    showDebug = false,
    foregroundColor = "#000000",
    backgroundColor = "#ffffff",
    downloadable = false,
    downloadFilename = "qr-code.png",
    className,
  } = props;

  const [generatedSrc, setGeneratedSrc] = React.useState<string | null>(null);

  const isDataMode = "data" in props && !!props.data;
  const data = isDataMode ? props.data : undefined;
  const image = !isDataMode && "image" in props ? props.image : undefined;
  const errorCorrectionLevel =
    isDataMode && "errorCorrectionLevel" in props
      ? props.errorCorrectionLevel
      : undefined;

  React.useEffect(() => {
    if (!isDataMode || !data) {
      setGeneratedSrc(null);
      return;
    }

    let cancelled = false;

    QRCode.toDataURL(data, {
      width: size,
      margin: 1,
      errorCorrectionLevel: errorCorrectionLevel || "M",
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
    })
      .then((url) => {
        if (!cancelled) setGeneratedSrc(url);
      })
      .catch(() => {
        if (!cancelled) setGeneratedSrc(null);
      });

    return () => {
      cancelled = true;
    };
  }, [data, size, foregroundColor, backgroundColor, errorCorrectionLevel, isDataMode]);

  const imgSrc = isDataMode ? generatedSrc : image ? resolveImageSrc(image) : null;
  const logoSize = Math.round(size * logoScale);

  const handleDownload = React.useCallback(() => {
    if (!imgSrc) return;
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imgSrc, downloadFilename]);

  return (
    <div
      ref={ref}
      className={cn("kz-qr-renderer-root", className)}
    >
      {/* QR image container */}
      <div
        className="kz-qr-renderer-image-container"
        style={{
          width: size,
          height: size,
          backgroundColor: backgroundColor || undefined,
        }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={alt}
            width={size}
            height={size}
            className="kz-qr-renderer-image"
            style={{
              width: size,
              height: size,
            }}
          />
        ) : (
          <div
            style={{
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--kz-component-input-placeholder)",
              fontSize: 12,
            }}
          >
            {isDataMode ? "Generating…" : "No image"}
          </div>
        )}

        {logo && imgSrc && (
          <div
            className="kz-qr-renderer-logo"
            style={{
              width: logoSize,
              height: logoSize,
            }}
          >
            <img
              src={resolveImageSrc(logo)}
              alt="Logo"
              width={logoSize}
              height={logoSize}
              className="kz-qr-renderer-logo-img"
            />
          </div>
        )}
      </div>

      {/* Label and caption */}
      {(label || caption || downloadable) && (
        <div className="kz-qr-renderer-footer">
          {label && (
            <div className="kz-qr-renderer-label">{label}</div>
          )}
          {caption && (
            <div className="kz-qr-renderer-caption">{caption}</div>
          )}
          {downloadable && (
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Sm}
              onClick={handleDownload}
            >
              <Icon name={IconName.ArrowDown} size={14} color="currentColor" />
              <span className="ml-1">Download</span>
            </Button>
          )}
        </div>
      )}

      {/* Debug info */}
      {showDebug && debug && (
        <div className="kz-qr-renderer-debug">
          <div className="kz-qr-renderer-debug-title">Debug Info</div>
          <div className="kz-qr-renderer-debug-grid">
            {Object.entries(debug).map(([key, value]) => (
              <React.Fragment key={key}>
                <span className="kz-qr-renderer-debug-key">{key}</span>
                <span className="kz-qr-renderer-debug-value">
                  {typeof value === "boolean" ? (value ? "true" : "false") : String(value)}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const QrRenderer = React.forwardRef(QrRendererInner);
QrRenderer.displayName = "QrRenderer";

export { QrRenderer };
