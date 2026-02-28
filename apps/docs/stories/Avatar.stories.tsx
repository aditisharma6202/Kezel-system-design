import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarSize,
  AvatarStatus,
  Icon,
  IconName,
} from "kz-design-system";

const meta: Meta<typeof Avatar> = {
  title: "Design System/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Circular avatar with image, initials, or icon fallback. Online status shows a green dot; busy/away/offline show no indicator. No shadow in any theme.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    initials: { control: "text" },
    size: {
      control: "select",
      options: [AvatarSize.Sm, AvatarSize.Md, AvatarSize.Lg, AvatarSize.Xl],
    },
    status: {
      control: "select",
      options: [
        undefined,
        AvatarStatus.Online,
        AvatarStatus.Busy,
        AvatarStatus.Away,
        AvatarStatus.Offline,
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/128?u=alice",
    alt: "Alice",
    size: AvatarSize.Md,
    status: AvatarStatus.Online,
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar with an image and online status indicator.",
      },
    },
  },
};

export const Initials: Story = {
  args: {
    initials: "JD",
    size: AvatarSize.Md,
    status: AvatarStatus.Online,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When no image is provided, falls back to initials with a muted background.",
      },
    },
  },
};

export const DefaultIcon: Story = {
  args: {
    size: AvatarSize.Md,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When no image or initials are provided, a default User icon is shown.",
      },
    },
  },
};

export const CustomFallbackIcon: Story = {
  args: {
    size: AvatarSize.Md,
    fallbackIcon: <Icon name={IconName.Shield} size="sm" color="currentColor" />,
  },
  parameters: {
    docs: {
      description: {
        story: "Custom fallback icon instead of the default User icon.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "end" }}>
      <Avatar
        src="https://i.pravatar.cc/128?u=sm"
        size={AvatarSize.Sm}
        status={AvatarStatus.Online}
      />
      <Avatar
        src="https://i.pravatar.cc/128?u=md"
        size={AvatarSize.Md}
        status={AvatarStatus.Online}
      />
      <Avatar
        src="https://i.pravatar.cc/128?u=lg"
        size={AvatarSize.Lg}
        status={AvatarStatus.Online}
      />
      <Avatar
        src="https://i.pravatar.cc/128?u=xl"
        size={AvatarSize.Xl}
        status={AvatarStatus.Online}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All sizes: sm (32px), md (40px), lg (48px), xl (64px).",
      },
    },
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/128?u=online"
          size={AvatarSize.Lg}
          status={AvatarStatus.Online}
        />
        <div style={{ fontSize: 12, marginTop: 4 }}>Online</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/128?u=busy"
          size={AvatarSize.Lg}
          status={AvatarStatus.Busy}
        />
        <div style={{ fontSize: 12, marginTop: 4 }}>Busy</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/128?u=away"
          size={AvatarSize.Lg}
          status={AvatarStatus.Away}
        />
        <div style={{ fontSize: 12, marginTop: 4 }}>Away</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/128?u=offline"
          size={AvatarSize.Lg}
          status={AvatarStatus.Offline}
        />
        <div style={{ fontSize: 12, marginTop: 4 }}>Offline</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Only **online** shows the green indicator dot. Busy, away, and offline show no indicator.",
      },
    },
  },
};
