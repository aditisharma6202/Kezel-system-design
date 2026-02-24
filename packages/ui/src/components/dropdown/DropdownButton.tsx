import * as React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
} from "./dropdown";
import { DropdownTriggerVariant } from "../../constants/enum";
import { Button } from "../button";
import { ButtonVariant, ButtonSize, ButtonAspectRatio } from "../../constants/enum";
import { Icon, IconName } from "../../icon";
import type {
  DropdownButtonProps,
  DropdownButtonItem,
  DropdownButtonVariant,
} from "./dropdown.types";

function mapVariant(v: DropdownButtonVariant | undefined): DropdownTriggerVariant {
  return v === "ghost" ? DropdownTriggerVariant.Ghost : DropdownTriggerVariant.Default;
}

function renderItems(items: DropdownButtonItem[]): React.ReactNode {
  return items.map((item) => {
    if (item.type === "label") {
      return <DropdownLabel key={item.key}>{item.label}</DropdownLabel>;
    }
    if (item.type === "separator") {
      return <DropdownSeparator key={item.key} />;
    }
    if (item.type === "submenu") {
      return (
        <DropdownSub key={item.key}>
          <DropdownSubTrigger
            disabled={item.disabled}
            startIcon={item.icon}
          >
            {item.label}
          </DropdownSubTrigger>
          <DropdownSubContent>
            {renderItems(item.items)}
          </DropdownSubContent>
        </DropdownSub>
      );
    }
    const it = item as Extract<DropdownButtonItem, { type?: "item" }>;
    return (
      <DropdownItem
        key={it.key}
        disabled={it.disabled}
        onSelect={() => {
          it.onSelect?.();
        }}
        startIcon={it.icon}
        shortcut={it.shortcut}
      >
        {it.label}
      </DropdownItem>
    );
  });
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  trigger,
  items,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  disabled = false,
  contentClassName,
}) => {
  const triggerVariant = mapVariant(trigger.variant);
  const showChevron = trigger.showChevron !== false;
  const iconOnly = trigger.iconOnly === true;
  const triggerContent =
    iconOnly ? (
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.Sm}
        aspectRatio={ButtonAspectRatio.Square}
        aria-label={trigger.ariaLabel ?? "Actions"}
      >
        <Icon name={IconName.EllipsisVertical} size="sm" color="currentColor" aria-hidden />
      </Button>
    ) : trigger.icon != null ? (
      <>
        {trigger.icon}
        {trigger.label != null ? trigger.label : null}
      </>
    ) : (
      trigger.label
    );

  return (
    <Dropdown>
      <DropdownTrigger
        variant={triggerVariant}
        showChevron={!iconOnly && showChevron}
        disabled={disabled}
        className={trigger.className}
        asChild={iconOnly}
      >
        {triggerContent}
      </DropdownTrigger>
      <DropdownContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        {renderItems(items)}
      </DropdownContent>
    </Dropdown>
  );
};

DropdownButton.displayName = "DropdownButton";

export { DropdownButton };
