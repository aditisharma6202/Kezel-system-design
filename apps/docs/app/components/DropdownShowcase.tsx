"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  type TokenKey,
} from "kz-design-system";
import {
  DropdownButton,
  DropdownTriggerVariant,
  type DropdownButtonItem,
} from "kz-design-system/dropdown";

interface DropdownShowcaseProps {
  onTokenOverridesChange: (
    tokens: Partial<Record<TokenKey, string>> | undefined
  ) => void;
  dropdownTokenOverrides: Partial<Record<TokenKey, string>> | undefined;
}

export default function DropdownShowcase({
  onTokenOverridesChange,
  dropdownTokenOverrides,
}: DropdownShowcaseProps) {
  const actionsDropdownItems: DropdownButtonItem[] = [
    { type: "label", key: "l1", label: "Actions" },
    { type: "separator", key: "s1" },
    { key: "new", label: "New file", onSelect: () => {} },
    { key: "copy", label: "Copy link", onSelect: () => {} },
    { key: "edit", label: "Edit", onSelect: () => {} },
    { type: "separator", key: "s2" },
    {
      type: "submenu",
      key: "more",
      label: "More options",
      items: [
        { key: "subA", label: "Sub option A", onSelect: () => {} },
        { key: "subB", label: "Sub option B", onSelect: () => {} },
      ],
    },
  ];

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-md">
      <Typography variant={TypographyVariantEnum.H2}>Dropdown</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Default, Ghost variant, and no-chevron. All styles use design tokens;
        override via{" "}
        <code className="text-xs bg-black/10 dark:bg-white/10 px-1 rounded">
          KezelThemeProvider tokens
        </code>
        .
      </Typography>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <DropdownButton
          trigger={{ label: "Actions" }}
          items={actionsDropdownItems}
          align="start"
          sideOffset={6}
        />
        <DropdownButton
          trigger={{
            label: "Ghost trigger",
            variant: DropdownTriggerVariant.Ghost,
          }}
          items={[
            { key: "1", label: "Item one", onSelect: () => {} },
            { key: "2", label: "Item two", onSelect: () => {} },
          ]}
          align="start"
          sideOffset={6}
        />
        <DropdownButton
          trigger={{ label: "No chevron", showChevron: false }}
          items={[
            { key: "a", label: "Option A", onSelect: () => {} },
            { key: "b", label: "Option B", onSelect: () => {} },
          ]}
          align="start"
          sideOffset={6}
        />
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Sm}
          onClick={() =>
            onTokenOverridesChange(
              dropdownTokenOverrides
                ? undefined
                : ({
                    "component.dropdown.trigger.bg": "#fef3c7",
                    "component.dropdown.trigger.text": "#92400e",
                    "component.dropdown.item.text.selected": "#b45309",
                    "component.dropdown.item.bg.hover":
                      "rgba(245, 158, 11, 0.15)",
                  } as Partial<Record<TokenKey, string>>)
            )
          }
        >
          {dropdownTokenOverrides
            ? "Reset dropdown tokens"
            : "Override dropdown tokens"}
        </Button>
      </div>
      {dropdownTokenOverrides && (
        <Typography variant={TypographyVariantEnum.Caption}>
          Custom tokens applied: trigger bg/text, selected item color, item
          hover bg.
        </Typography>
      )}
    </section>
  );
}
