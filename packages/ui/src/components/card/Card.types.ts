import type * as React from "react";
import type { CardShadow } from "../../constants/enum";

export type CardSize = "sm" | "md" | "lg";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card size preset affecting default padding. Default: "md" */
  size?: CardSize;
  /** Shadow elevation level. Default: CardShadow.Sm */
  shadow?: CardShadow;
  /** Override padding independently. Default: follows size. */
  padding?: CardPadding;
  /** Fixed width (CSS value, e.g. "300px", "100%"). Default: auto. */
  width?: string;
  /** Fixed height (CSS value). Default: auto. */
  height?: string;
  /** CSS aspect-ratio (e.g. "16/9", "1/1", "4/3"). Default: none. */
  aspectRatio?: string;
  /** Remove the card shadow. Default: false */
  flat?: boolean;
  /** Make the card hoverable with a subtle lift effect. Default: false */
  hoverable?: boolean;
  /** Make the card clickable (adds cursor and focus ring). Default: false */
  clickable?: boolean;
  /** Custom header slot rendered at the top of the card. */
  header?: React.ReactNode;
  /** Custom footer slot rendered at the bottom of the card. */
  footer?: React.ReactNode;
  /** Optional image/media to render above the content area. */
  cover?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
