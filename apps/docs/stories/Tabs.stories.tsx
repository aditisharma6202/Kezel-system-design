import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Icon,
  IconName,
} from "kz-design-system";

const meta: Meta<typeof Tabs> = {
  title: "Design System/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tabs built with Radix Tabs. Variants: **pill**, **underline**, **vertical**. Sizes: **sm**, **md**, **lg**. Use the **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "pill",
    size: "md",
    fullWidth: false,
    defaultValue: "tab1",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["pill", "underline", "vertical"],
      description: "Visual variant: pill, underline, or vertical.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size: sm, md, or lg.",
    },
    fullWidth: {
      control: "boolean",
      description: "When true, tab list stretches to full width.",
    },
    defaultValue: {
      control: "text",
      description: "Initial active tab (uncontrolled).",
    },
    value: {
      control: "text",
      description: "Active tab (controlled).",
    },
    onValueChange: {
      action: "valueChange",
      description: "Called when active tab changes.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for root.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Pill: Story = {
  args: {
    variant: "pill",
    size: "md",
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1.</TabsContent>
      <TabsContent value="tab2">Content for Tab 2.</TabsContent>
      <TabsContent value="tab3">Content for Tab 3.</TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  args: {
    variant: "underline",
    size: "md",
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1.</TabsContent>
      <TabsContent value="tab2">Content for Tab 2.</TabsContent>
      <TabsContent value="tab3">Content for Tab 3.</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: {
    variant: "vertical",
    size: "md",
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1.</TabsContent>
      <TabsContent value="tab2">Content for Tab 2.</TabsContent>
      <TabsContent value="tab3">Content for Tab 3.</TabsContent>
    </Tabs>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm text-neutral-500">Small</p>
        <Tabs variant="pill" size="sm" defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Small tabs content.</TabsContent>
          <TabsContent value="b">Tab B content.</TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="mb-2 text-sm text-neutral-500">Medium</p>
        <Tabs variant="pill" size="md" defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Medium tabs content.</TabsContent>
          <TabsContent value="b">Tab B content.</TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="mb-2 text-sm text-neutral-500">Large</p>
        <Tabs variant="pill" size="lg" defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Large tabs content.</TabsContent>
          <TabsContent value="b">Tab B content.</TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    variant: "pill",
    size: "md",
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1" icon={<Icon name={IconName.Search} size="sm" color="currentColor" />}>
          Search
        </TabsTrigger>
        <TabsTrigger value="tab2" icon={<Icon name={IconName.BarChart2} size="sm" color="currentColor" />}>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="tab3" icon={<Icon name={IconName.Shield} size="sm" color="currentColor" />}>
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Search content.</TabsContent>
      <TabsContent value="tab2">Analytics content.</TabsContent>
      <TabsContent value="tab3">Security content.</TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  args: {
    variant: "pill",
    size: "md",
    fullWidth: true,
    defaultValue: "tab1",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1.</TabsContent>
      <TabsContent value="tab2">Content for Tab 2.</TabsContent>
      <TabsContent value="tab3">Content for Tab 3.</TabsContent>
    </Tabs>
  ),
};
