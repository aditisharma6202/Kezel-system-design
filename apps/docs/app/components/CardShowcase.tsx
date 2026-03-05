"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  Card,
  CardShadow,
} from "kz-design-system";

export default function CardShowcase() {
  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <Typography variant={TypographyVariantEnum.H2}>Card</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Neumorphic theme uses raised shadows; standard uses a subtle elevation.
        Switch themes to compare.
      </Typography>

      {/* Shadow levels */}
      <Typography variant={TypographyVariantEnum.H3}>Shadow Levels</Typography>
      <div className="flex flex-wrap gap-4 w-full">
        <Card width="220px" shadow={CardShadow.Sm}>
          <Typography variant={TypographyVariantEnum.Label}>
            Shadow Sm (default)
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Subtle elevation.
          </Typography>
        </Card>

        <Card width="220px" shadow={CardShadow.Md}>
          <Typography variant={TypographyVariantEnum.Label}>
            Shadow Md
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Medium elevation.
          </Typography>
        </Card>

        <Card width="220px" shadow={CardShadow.Lg}>
          <Typography variant={TypographyVariantEnum.Label}>
            Shadow Lg
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Heavy elevation.
          </Typography>
        </Card>
      </div>

      {/* Size + padding */}
      <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
      <div className="flex flex-wrap gap-4 w-full">
        <Card width="220px" size="sm">
          <Typography variant={TypographyVariantEnum.Label}>
            Small card
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Compact padding, auto height.
          </Typography>
        </Card>

        <Card width="260px">
          <Typography variant={TypographyVariantEnum.Label}>
            Medium card
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Default size with standard padding.
          </Typography>
        </Card>

        <Card width="300px" size="lg">
          <Typography variant={TypographyVariantEnum.Label}>
            Large card
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            More breathing room with large padding.
          </Typography>
        </Card>
      </div>

      {/* Flat */}
      <Typography variant={TypographyVariantEnum.H3}>Flat</Typography>
      <Card flat width="100%">
        <Typography variant={TypographyVariantEnum.Label}>
          Flat card (no shadow)
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Useful for nesting cards or reducing visual weight.
        </Typography>
      </Card>

      {/* Hoverable & Clickable */}
      <Typography variant={TypographyVariantEnum.H3}>
        Hoverable & Clickable
      </Typography>
      <div className="flex flex-wrap gap-4 w-full">
        <Card width="260px" hoverable>
          <Typography variant={TypographyVariantEnum.Label}>
            Hoverable
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Lifts on hover with enhanced shadow.
          </Typography>
        </Card>

        <Card
          width="260px"
          clickable
          hoverable
          onClick={() => alert("Card clicked!")}
        >
          <Typography variant={TypographyVariantEnum.Label}>
            Clickable
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Has cursor pointer and focus ring.
          </Typography>
        </Card>
      </div>

      {/* Aspect ratio */}
      <Typography variant={TypographyVariantEnum.H3}>Aspect Ratio</Typography>
      <div className="flex flex-wrap gap-4 w-full">
        <Card width="200px" aspectRatio="1/1" padding="md">
          <Typography variant={TypographyVariantEnum.Label}>1 : 1</Typography>
        </Card>
        <Card width="240px" aspectRatio="16/9" padding="md">
          <Typography variant={TypographyVariantEnum.Label}>16 : 9</Typography>
        </Card>
        <Card width="180px" aspectRatio="4/3" padding="md">
          <Typography variant={TypographyVariantEnum.Label}>4 : 3</Typography>
        </Card>
      </div>

      {/* Header + Footer */}
      <Typography variant={TypographyVariantEnum.H3}>
        Header & Footer
      </Typography>
      <Card
        width="100%"
        header={
          <Typography variant={TypographyVariantEnum.Label}>
            Card Header
          </Typography>
        }
        footer={
          <div className="flex justify-end gap-2">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
              Cancel
            </Button>
            <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm}>
              Save
            </Button>
          </div>
        }
      >
        <Typography variant={TypographyVariantEnum.Caption}>
          Card body content sits between the header and footer sections, each
          separated by a border.
        </Typography>
      </Card>

      {/* Cover image */}
      <Typography variant={TypographyVariantEnum.H3}>Cover Media</Typography>
      <Card
        width="320px"
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=360&fit=crop"
            alt="Mountain landscape"
            style={{ height: 180, objectFit: "cover" }}
          />
        }
      >
        <Typography variant={TypographyVariantEnum.Label}>
          Mountain View
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          A card with a cover image above the body content.
        </Typography>
      </Card>

      {/* Fixed dimensions */}
      <Typography variant={TypographyVariantEnum.H3}>
        Fixed Width & Height
      </Typography>
      <Card width="300px" height="200px">
        <Typography variant={TypographyVariantEnum.Label}>300 x 200</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Explicit width and height.
        </Typography>
      </Card>
    </section>
  );
}
