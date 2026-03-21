import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ErrorPage,
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  Icon,
  IconName,
} from "kz-design-system";

const meta: Meta<typeof ErrorPage> = {
  title: "Design System/ErrorPage",
  component: ErrorPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-screen error, warning, and info pages with status code, icon, description, and action buttons. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: [
        "error",
        "warning",
        "info",
        "not-found",
        "forbidden",
        "server-error",
      ],
      description: "Determines default icon and color scheme.",
    },
    statusCode: {
      control: "text",
      description: "Large status code display, e.g. 404, 500.",
    },
    title: {
      control: "text",
      description: "Main heading text.",
    },
    description: {
      control: "text",
      description: "Body text below the heading.",
    },
    fullPage: {
      control: "boolean",
      description:
        "If true (default), uses fixed positioning. If false, fills parent.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorPage>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      height: 420,
      borderRadius: 8,
      overflow: "hidden",
      border: "1px solid var(--kz-color-border-subtle)",
    }}
  >
    {children}
  </div>
);

export const NotFound: Story = {
  render: () => (
    <Wrapper>
      <ErrorPage
        status="not-found"
        statusCode={404}
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        fullPage={false}
        action={
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Md}
          >
            Go Home
          </Button>
        }
      />
    </Wrapper>
  ),
};

export const ServerError: Story = {
  render: () => (
    <Wrapper>
      <ErrorPage
        status="server-error"
        statusCode={500}
        title="Internal Server Error"
        description="Something went wrong on our end. Please try again later."
        fullPage={false}
        action={
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Error}
            size={ButtonSize.Md}
          >
            Retry
          </Button>
        }
      />
    </Wrapper>
  ),
};

export const Forbidden: Story = {
  render: () => (
    <Wrapper>
      <ErrorPage
        status="forbidden"
        statusCode={403}
        title="Access Denied"
        description="You don't have permission to view this resource."
        fullPage={false}
        action={
          <div style={{ display: "flex", gap: 12 }}>
            <Button
              variant={ButtonVariant.Primary}
              status={ButtonStatus.Brand}
              size={ButtonSize.Md}
            >
              Go Home
            </Button>
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Md}>
              Contact Support
            </Button>
          </div>
        }
      />
    </Wrapper>
  ),
};

export const GenericError: Story = {
  render: () => (
    <Wrapper>
      <ErrorPage
        status="error"
        title="Something Went Wrong"
        description="An unexpected error occurred. Please try again."
        fullPage={false}
        action={
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Error}
            size={ButtonSize.Md}
          >
            Retry
          </Button>
        }
      />
    </Wrapper>
  ),
};

export const Warning: Story = {
  render: () => (
    <Wrapper>
      <ErrorPage
        status="warning"
        title="Service Degraded"
        description="Some features may be temporarily unavailable."
        fullPage={false}
        action={
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Md}>
            Check Status
          </Button>
        }
      />
    </Wrapper>
  ),
};

export const Info: Story = {
  render: () => (
    <Wrapper>
      <ErrorPage
        status="info"
        title="Maintenance Scheduled"
        description="We'll be performing maintenance on March 25 from 2:00 AM to 4:00 AM UTC."
        fullPage={false}
      />
    </Wrapper>
  ),
};

export const WithCustomLogo: Story = {
  render: () => (
    <Wrapper>
      <ErrorPage
        status="not-found"
        statusCode={404}
        title="Page Not Found"
        description="We couldn't find what you were looking for."
        fullPage={false}
        logo={
          <Icon
            name={IconName.BarChart2}
            size={32}
            color="var(--kz-color-brand-accent)"
          />
        }
        action={
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Md}
          >
            Back to Dashboard
          </Button>
        }
      />
    </Wrapper>
  ),
};
