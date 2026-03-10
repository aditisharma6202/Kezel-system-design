import type * as React from "react";

export type QrPatternStyle = "square" | "circle" | "rounded";

export interface QrRendererDebugInfo {
  qr_size_modules?: number;
  module_size_px?: number;
  native_img_px?: number;
  out_size_px?: number;
  pattern_style?: QrPatternStyle;
  border_modules?: number;
  org?: string;
  has_logo?: boolean;
  logo_source?: string;
}

export type QrErrorCorrectionLevel = "L" | "M" | "Q" | "H";

interface QrRendererBaseProps {
  /** Display size in pixels (defaults to 200) */
  size?: number;
  /** Alt text for the QR image (defaults to "QR Code") */
  alt?: string;
  /** Optional logo to overlay in the center of the QR code */
  logo?: string;
  /** Logo size as a fraction of the QR size (defaults to 0.2 = 20%) */
  logoScale?: number;
  /** Optional label text shown below the QR code */
  label?: React.ReactNode;
  /** Optional caption/description below the label */
  caption?: React.ReactNode;
  /** Debug/metadata info to display (if showDebug is true) */
  debug?: QrRendererDebugInfo;
  /** Whether to show debug metadata below the QR code */
  showDebug?: boolean;
  /** Foreground (dark modules) color */
  foregroundColor?: string;
  /** Background (light modules) color */
  backgroundColor?: string;
  /** Whether to show a download button */
  downloadable?: boolean;
  /** Filename for download (defaults to "qr-code.png") */
  downloadFilename?: string;
  /** Root element className */
  className?: string;
}

export interface QrRendererImageProps extends QrRendererBaseProps {
  /** Pre-rendered image: base64 string, data URI, or URL */
  image: string;
  data?: never;
  errorCorrectionLevel?: never;
}

export interface QrRendererDataProps extends QrRendererBaseProps {
  /** Text/URL to encode as a QR code (generated via qrcode library) */
  data: string;
  image?: never;
  /** Error correction level (defaults to "M") */
  errorCorrectionLevel?: QrErrorCorrectionLevel;
}

export type QrRendererProps = QrRendererImageProps | QrRendererDataProps;
