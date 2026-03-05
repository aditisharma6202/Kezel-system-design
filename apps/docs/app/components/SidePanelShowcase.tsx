"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  SidePanel,
  Button,
  ButtonVariant,
  ButtonSize,
  Icon,
  IconName,
} from "kz-design-system";

const LONG_CONTENT = Array.from({ length: 20 }, (_, i) => (
  <Typography key={i} variant={TypographyVariantEnum.Body}>
    Scrollable content block {i + 1}. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
  </Typography>
));

export default function SidePanelShowcase() {
  const [rightOpen, setRightOpen] = React.useState(false);
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [wideOpen, setWideOpen] = React.useState(false);
  const [noOverlayOpen, setNoOverlayOpen] = React.useState(false);
  const [customHeaderOpen, setCustomHeaderOpen] = React.useState(false);
  const [scrollableOpen, setScrollableOpen] = React.useState(false);

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

        {/* Custom header with breadcrumbs + buttons, custom footer */}
        <Typography variant={TypographyVariantEnum.H3}>
          Custom Header & Footer
        </Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setCustomHeaderOpen(true)}
        >
          Open Custom Header Panel
        </Button>
        <SidePanel
          open={customHeaderOpen}
          onOpenChange={setCustomHeaderOpen}
          width="480px"
          header={
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-1">
                <Typography variant={TypographyVariantEnum.Caption}>
                  Home
                </Typography>
                <span style={{ color: "var(--kz-color-text-muted)" }}>/</span>
                <Typography variant={TypographyVariantEnum.Caption}>
                  Settings
                </Typography>
                <span style={{ color: "var(--kz-color-text-muted)" }}>/</span>
                <Typography variant={TypographyVariantEnum.Caption}>
                  Profile
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant={TypographyVariantEnum.H4}>
                  Edit Profile
                </Typography>
                <div className="flex gap-2">
                  <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
                    <Icon name={IconName.Filter} size={14} />
                  </Button>
                  <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
                    <Icon name={IconName.Settings} size={14} />
                  </Button>
                </div>
              </div>
            </div>
          }
          footer={
            <div className="flex items-center justify-between w-full">
              <Typography variant={TypographyVariantEnum.Caption}>
                Last saved: 2 min ago
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant={ButtonVariant.Outline}
                  size={ButtonSize.Sm}
                  onClick={() => setCustomHeaderOpen(false)}
                >
                  Discard
                </Button>
                <Button
                  variant={ButtonVariant.Primary}
                  size={ButtonSize.Sm}
                  onClick={() => setCustomHeaderOpen(false)}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-4">{LONG_CONTENT}</div>
        </SidePanel>

        {/* Scrollable (non-sticky) header & footer */}
        <Typography variant={TypographyVariantEnum.H3}>
          Scrollable Header & Footer
        </Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setScrollableOpen(true)}
        >
          Open Scrollable Panel
        </Button>
        <SidePanel
          open={scrollableOpen}
          onOpenChange={setScrollableOpen}
          stickyHeader={false}
          stickyFooter={false}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Scrollable Header
            </Typography>
          }
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Sm}
                onClick={() => setScrollableOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setScrollableOpen(false)}
              >
                Done
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-4">{LONG_CONTENT}</div>
        </SidePanel>
      </div>
    </section>
  );
}
