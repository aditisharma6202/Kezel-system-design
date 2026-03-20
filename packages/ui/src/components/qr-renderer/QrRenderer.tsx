import * as React from "react";
import QRCode from "qrcode";
import { cn } from "../../utils/cn";
import { Button, ButtonVariant, ButtonSize } from "../button";
import { Icon, IconName } from "../../icon";
import { QrPattern } from "../../constants/enum";
import type { QrRendererProps } from "./QrRenderer.types";

function resolveImageSrc(image: string): string {
  if (image.startsWith("data:") || image.startsWith("http")) {
    return image;
  }
  return `data:image/png;base64,${image}`;
}

/**
 * Draw a single QR module on the canvas with the given pattern shape.
 */
function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  moduleSize: number,
  pattern: QrPattern
) {
  const center = moduleSize / 2;

  switch (pattern) {
    case QrPattern.Circle: {
      ctx.beginPath();
      ctx.arc(x + center, y + center, center * 0.85, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case QrPattern.Diamond: {
      ctx.beginPath();
      ctx.moveTo(x + center, y + moduleSize * 0.05);
      ctx.lineTo(x + moduleSize * 0.95, y + center);
      ctx.lineTo(x + center, y + moduleSize * 0.95);
      ctx.lineTo(x + moduleSize * 0.05, y + center);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case QrPattern.Square:
    default: {
      ctx.fillRect(x, y, moduleSize, moduleSize);
      break;
    }
  }
}

/**
 * Render the QR matrix onto a canvas with custom dot patterns.
 * Returns a data URL of the rendered image.
 */
function renderQrToCanvas(
  modules: boolean[][],
  size: number,
  pattern: QrPattern,
  fgColor: string,
  bgColor: string,
  logo: string | undefined,
  logoScale: number
): Promise<string> {
  const moduleCount = modules.length;
  const margin = 1;
  const totalModules = moduleCount + margin * 2;
  const moduleSize = size / totalModules;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Foreground modules
  ctx.fillStyle = fgColor;
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (modules[row][col]) {
        const x = (col + margin) * moduleSize;
        const y = (row + margin) * moduleSize;
        drawModule(ctx, x, y, moduleSize, pattern);
      }
    }
  }

  // Logo overlay
  if (logo) {
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const logoPixelSize = Math.round(size * logoScale);
        const logoX = (size - logoPixelSize) / 2;
        const logoY = (size - logoPixelSize) / 2;
        const padding = 4;

        // White background behind logo
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        const bgSize = logoPixelSize + padding * 2;
        const bgX = logoX - padding;
        const bgY = logoY - padding;
        const radius = 6;
        ctx.moveTo(bgX + radius, bgY);
        ctx.lineTo(bgX + bgSize - radius, bgY);
        ctx.quadraticCurveTo(bgX + bgSize, bgY, bgX + bgSize, bgY + radius);
        ctx.lineTo(bgX + bgSize, bgY + bgSize - radius);
        ctx.quadraticCurveTo(
          bgX + bgSize,
          bgY + bgSize,
          bgX + bgSize - radius,
          bgY + bgSize
        );
        ctx.lineTo(bgX + radius, bgY + bgSize);
        ctx.quadraticCurveTo(bgX, bgY + bgSize, bgX, bgY + bgSize - radius);
        ctx.lineTo(bgX, bgY + radius);
        ctx.quadraticCurveTo(bgX, bgY, bgX + radius, bgY);
        ctx.closePath();
        ctx.fill();

        ctx.drawImage(img, logoX, logoY, logoPixelSize, logoPixelSize);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => {
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = resolveImageSrc(logo);
    });
  }

  return Promise.resolve(canvas.toDataURL("image/png"));
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
    pattern = QrPattern.Square,
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

  // Use high error correction when logo is present to maintain scannability
  const effectiveECL = errorCorrectionLevel || (logo ? "H" : "M");

  React.useEffect(() => {
    if (!isDataMode || !data) {
      setGeneratedSrc(null);
      return;
    }

    let cancelled = false;

    // Generate QR matrix using qrcode library
    const qr = QRCode.create(data, {
      errorCorrectionLevel: effectiveECL,
    });

    const moduleCount = qr.modules.size;
    const modules: boolean[][] = [];
    for (let row = 0; row < moduleCount; row++) {
      const rowData: boolean[] = [];
      for (let col = 0; col < moduleCount; col++) {
        rowData.push(qr.modules.get(row, col) === 1);
      }
      modules.push(rowData);
    }

    renderQrToCanvas(
      modules,
      size,
      pattern,
      foregroundColor,
      backgroundColor,
      logo,
      logoScale
    )
      .then((url) => {
        if (!cancelled) setGeneratedSrc(url);
      })
      .catch(() => {
        if (!cancelled) setGeneratedSrc(null);
      });

    return () => {
      cancelled = true;
    };
  }, [
    data,
    size,
    foregroundColor,
    backgroundColor,
    effectiveECL,
    isDataMode,
    pattern,
    logo,
    logoScale,
  ]);

  const imgSrc = isDataMode
    ? generatedSrc
    : image
      ? resolveImageSrc(image)
      : null;

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
    <div ref={ref} className={cn("kz-qr-renderer-root", className)}>
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

        {/* Logo overlay for image mode (canvas handles it for data mode) */}
        {logo && imgSrc && !isDataMode && (
          <div
            className="kz-qr-renderer-logo"
            style={{
              width: Math.round(size * logoScale),
              height: Math.round(size * logoScale),
            }}
          >
            <img
              src={resolveImageSrc(logo)}
              alt="Logo"
              width={Math.round(size * logoScale)}
              height={Math.round(size * logoScale)}
              className="kz-qr-renderer-logo-img"
            />
          </div>
        )}
      </div>

      {/* Label and caption */}
      {(label || caption || downloadable) && (
        <div className="kz-qr-renderer-footer">
          {label && <div className="kz-qr-renderer-label">{label}</div>}
          {caption && <div className="kz-qr-renderer-caption">{caption}</div>}
          {downloadable && (
            <Button
              variant={ButtonVariant.Primary}
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
                  {typeof value === "boolean"
                    ? value
                      ? "true"
                      : "false"
                    : String(value)}
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
