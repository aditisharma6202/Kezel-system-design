"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  SidePanel,
  Button,
  ButtonVariant,
  ButtonSize,
} from "kz-design-system";

export default function SidePanelShowcase() {
  const [rightOpen, setRightOpen] = React.useState(false);
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [wideOpen, setWideOpen] = React.useState(false);
  const [noOverlayOpen, setNoOverlayOpen] = React.useState(false);

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>SidePanel</Typography>

      <div className="flex flex-col gap-6 w-full">
        <Typography variant={TypographyVariantEnum.H3}>
          Right (default)
        </Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setRightOpen(true)}
        >
          Open Right Panel
        </Button>
        <SidePanel
          open={rightOpen}
          onOpenChange={setRightOpen}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Right Panel
            </Typography>
          }
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Sm}
                onClick={() => setRightOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setRightOpen(false)}
              >
                Save
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel slides in from the right with default 400px width.
          </Typography>
        </SidePanel>

        <Typography variant={TypographyVariantEnum.H3}>Left side</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setLeftOpen(true)}
        >
          Open Left Panel
        </Button>
        <SidePanel
          open={leftOpen}
          onOpenChange={setLeftOpen}
          side="left"
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Left Panel
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel slides in from the left.
          </Typography>
        </SidePanel>

        <Typography variant={TypographyVariantEnum.H3}>50% width</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setWideOpen(true)}
        >
          Open 50% Panel
        </Button>
        <SidePanel
          open={wideOpen}
          onOpenChange={setWideOpen}
          width="50%"
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Half Screen
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel takes up 50% of the screen width.
          </Typography>
        </SidePanel>

        <Typography variant={TypographyVariantEnum.H3}>No overlay</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setNoOverlayOpen(true)}
        >
          Open Without Overlay
        </Button>
        <SidePanel
          open={noOverlayOpen}
          onOpenChange={setNoOverlayOpen}
          overlay={false}
          width="300px"
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              No Overlay
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel has no backdrop overlay.
          </Typography>
        </SidePanel>
      </div>
    </section>
  );
}
