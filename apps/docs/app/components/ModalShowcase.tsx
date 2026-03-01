"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  Modal,
  ModalSize,
  Button,
  ButtonVariant,
  ButtonSize,
  TextInput,
} from "kz-design-system";

export default function ModalShowcase() {
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  const [smOpen, setSmOpen] = React.useState(false);
  const [lgOpen, setLgOpen] = React.useState(false);
  const [xlOpen, setXlOpen] = React.useState(false);
  const [noOverlayOpen, setNoOverlayOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>Modal</Typography>

      <div className="flex flex-col gap-6 w-full">
        {/* Default (md) */}
        <Typography variant={TypographyVariantEnum.H3}>Default (md)</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setDefaultOpen(true)}
        >
          Open Modal
        </Button>
        <Modal
          open={defaultOpen}
          onOpenChange={setDefaultOpen}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Default Modal
            </Typography>
          }
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Sm}
                onClick={() => setDefaultOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setDefaultOpen(false)}
              >
                Confirm
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This is a default medium-sized modal with header and footer.
          </Typography>
        </Modal>

        {/* Small */}
        <Typography variant={TypographyVariantEnum.H3}>Small</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setSmOpen(true)}
        >
          Open Small Modal
        </Button>
        <Modal
          open={smOpen}
          onOpenChange={setSmOpen}
          size={ModalSize.Sm}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Small Modal
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            A compact modal for simple confirmations.
          </Typography>
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Sm}
              onClick={() => setSmOpen(false)}
            >
              No
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Sm}
              onClick={() => setSmOpen(false)}
            >
              Yes
            </Button>
          </div>
        </Modal>

        {/* Large */}
        <Typography variant={TypographyVariantEnum.H3}>Large</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setLgOpen(true)}
        >
          Open Large Modal
        </Button>
        <Modal
          open={lgOpen}
          onOpenChange={setLgOpen}
          size={ModalSize.Lg}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Large Modal
            </Typography>
          }
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Sm}
                onClick={() => setLgOpen(false)}
              >
                Close
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            A larger modal for more complex content. This size is great for
            forms, detailed information, or multi-step flows.
          </Typography>
        </Modal>

        {/* XL */}
        <Typography variant={TypographyVariantEnum.H3}>Extra Large</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setXlOpen(true)}
        >
          Open XL Modal
        </Button>
        <Modal
          open={xlOpen}
          onOpenChange={setXlOpen}
          size={ModalSize.Xl}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Extra Large Modal
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            An extra-large modal for data-heavy content like tables or
            dashboards.
          </Typography>
        </Modal>

        {/* No overlay */}
        <Typography variant={TypographyVariantEnum.H3}>No overlay</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setNoOverlayOpen(true)}
        >
          Open Without Overlay
        </Button>
        <Modal
          open={noOverlayOpen}
          onOpenChange={setNoOverlayOpen}
          overlay={false}
          size={ModalSize.Sm}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              No Overlay
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This modal has no backdrop overlay.
          </Typography>
        </Modal>

        {/* Form modal */}
        <Typography variant={TypographyVariantEnum.H3}>Form modal</Typography>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setFormOpen(true)}
        >
          Open Form Modal
        </Button>
        <Modal
          open={formOpen}
          onOpenChange={setFormOpen}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Create Account
            </Typography>
          }
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Sm}
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setFormOpen(false)}
              >
                Create
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <TextInput
              value={name}
              onValueChange={setName}
              placeHolder="Full name"
              label="Name"
            />
            <TextInput
              value={email}
              onValueChange={setEmail}
              placeHolder="you@example.com"
              label="Email"
            />
          </div>
        </Modal>
      </div>
    </section>
  );
}
