"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
  SideMenu,
  IconName,
  type TokenKey,
  type SideMenuNode,
  ToastProvider,
} from "kz-design-system";

import TypographyShowcase from "./components/TypographyShowcase";
import ButtonShowcase from "./components/ButtonShowcase";
import ToggleButtonShowcase from "./components/ToggleButtonShowcase";
import CheckboxShowcase from "./components/CheckboxShowcase";
import RadioButtonShowcase from "./components/RadioButtonShowcase";
import TabsShowcase from "./components/TabsShowcase";
import TableShowcase from "./components/TableShowcase";
import TextInputShowcase from "./components/TextInputShowcase";
import TextAreaShowcase from "./components/TextAreaShowcase";
import NumberInputShowcase from "./components/NumberInputShowcase";
import DateTimePickerShowcase from "./components/DateTimePickerShowcase";
import DateRangePickerShowcase from "./components/DateRangePickerShowcase";
import ColorPickerShowcase from "./components/ColorPickerShowcase";
import IconPickerShowcase from "./components/IconPickerShowcase";
import DropdownShowcase from "./components/DropdownShowcase";
import AvatarShowcase from "./components/AvatarShowcase";
import SideMenuShowcase from "./components/SideMenuShowcase";
import FileUploaderShowcase from "./components/FileUploaderShowcase";
import SelectShowcase from "./components/SelectShowcase";
import SidePanelShowcase from "./components/SidePanelShowcase";
import FormGroupShowcase from "./components/FormGroupShowcase";
import ModalShowcase from "./components/ModalShowcase";
import ToastShowcase from "./components/ToastShowcase";

type SectionId =
  | "typography"
  | "button"
  | "toggle-button"
  | "checkbox"
  | "radio-button"
  | "tabs"
  | "table"
  | "text-input"
  | "text-area"
  | "number-input"
  | "date-time-picker"
  | "date-range-picker"
  | "color-picker"
  | "icon-picker"
  | "dropdown"
  | "avatar"
  | "side-menu"
  | "file-uploader"
  | "select"
  | "side-panel"
  | "form-group"
  | "modal"
  | "toast";

const docsMenuData: SideMenuNode[] = [
  {
    type: "section",
    id: "general",
    label: "GENERAL",
    items: [
      {
        type: "link",
        id: "typography",
        label: "Typography",
        icon: IconName.BarChart2,
        href: "#",
      },
    ],
  },
  {
    type: "section",
    id: "actions",
    label: "ACTIONS",
    items: [
      {
        type: "link",
        id: "button",
        label: "Button",
        icon: IconName.BarChart2,
        href: "#",
      },
      {
        type: "link",
        id: "toggle-button",
        label: "Toggle Button",
        icon: IconName.BarChart2,
        href: "#",
      },
    ],
  },
  {
    type: "section",
    id: "form-controls",
    label: "FORM CONTROLS",
    items: [
      {
        type: "link",
        id: "checkbox",
        label: "Checkbox",
        icon: IconName.CheckCircle,
        href: "#",
      },
      {
        type: "link",
        id: "radio-button",
        label: "Radio Button",
        icon: IconName.CheckCircle,
        href: "#",
      },
      {
        type: "link",
        id: "text-input",
        label: "TextInput",
        icon: IconName.Search,
        href: "#",
      },
      {
        type: "link",
        id: "text-area",
        label: "TextArea",
        icon: IconName.Search,
        href: "#",
      },
      {
        type: "link",
        id: "number-input",
        label: "NumberInput",
        icon: IconName.Search,
        href: "#",
      },
      {
        type: "link",
        id: "date-time-picker",
        label: "DateTimePicker",
        icon: IconName.Search,
        href: "#",
      },
      {
        type: "link",
        id: "date-range-picker",
        label: "DateRangePicker",
        icon: IconName.Search,
        href: "#",
      },
      {
        type: "link",
        id: "color-picker",
        label: "ColorPicker",
        icon: IconName.Palette,
        href: "#",
      },
      {
        type: "link",
        id: "icon-picker",
        label: "IconPicker",
        icon: IconName.LayoutGrid,
        href: "#",
      },
      {
        type: "link",
        id: "dropdown",
        label: "Dropdown",
        icon: IconName.BarChart2,
        href: "#",
      },
      {
        type: "link",
        id: "file-uploader",
        label: "FileUploader",
        icon: IconName.FilePlus,
        href: "#",
      },
      {
        type: "link",
        id: "select",
        label: "Select",
        icon: IconName.List,
        href: "#",
      },
      {
        type: "link",
        id: "form-group",
        label: "FormGroup",
        icon: IconName.LayoutGrid,
        href: "#",
      },
    ],
  },
  {
    type: "section",
    id: "navigation",
    label: "NAVIGATION",
    items: [
      {
        type: "link",
        id: "tabs",
        label: "Tabs",
        icon: IconName.BarChart2,
        href: "#",
      },
      {
        type: "link",
        id: "side-menu",
        label: "SideMenu",
        icon: IconName.BarChart2,
        href: "#",
      },
      {
        type: "link",
        id: "side-panel",
        label: "SidePanel",
        icon: IconName.LayoutGrid,
        href: "#",
      },
      {
        type: "link",
        id: "modal",
        label: "Modal",
        icon: IconName.LayoutGrid,
        href: "#",
      },
    ],
  },
  {
    type: "section",
    id: "feedback",
    label: "FEEDBACK",
    items: [
      {
        type: "link",
        id: "toast",
        label: "Toast",
        icon: IconName.CircleAlert,
        href: "#",
      },
    ],
  },
  {
    type: "section",
    id: "data-display",
    label: "DATA DISPLAY",
    items: [
      {
        type: "link",
        id: "table",
        label: "Table",
        icon: IconName.BarChart2,
        href: "#",
      },
      {
        type: "link",
        id: "avatar",
        label: "Avatar",
        icon: IconName.Shield,
        href: "#",
      },
    ],
  },
];

export default function App() {
  const [activeSection, setActiveSection] =
    React.useState<SectionId>("typography");
  const [docsNavCollapsed, setDocsNavCollapsed] = React.useState(false);
  const [mode, setMode] = React.useState<KezelMode>(KezelMode.Light);
  const [variant, setVariant] = React.useState<KezelVariant>(
    KezelVariant.Neumorphic
  );
  const [dropdownTokenOverrides, setDropdownTokenOverrides] = React.useState<
    Partial<Record<TokenKey, string>> | undefined
  >(undefined);

  return (
    <KezelThemeProvider
      variant={variant}
      mode={mode}
      tokens={dropdownTokenOverrides}
    >
      <ToastProvider>
        <div className="flex flex-col h-screen bg-[var(--kz-color-surface-background)]">
          {/* Sticky header — theme switcher */}
          <header
            className="sticky top-0 z-50 flex items-center justify-center gap-4 px-6 py-3 border-b border-[var(--kz-color-border-subtle)]"
            style={{ background: "var(--kz-color-surface-background)" }}
          >
            <Typography variant={TypographyVariantEnum.Caption}>
              Theme: {variant} · {mode === KezelMode.Light ? "light" : "dark"}
            </Typography>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setVariant(KezelVariant.Standard)}
              >
                Standard
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setVariant(KezelVariant.Neumorphic)}
              >
                Neumorphic
              </Button>
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Sm}
                onClick={() =>
                  setMode(
                    mode === KezelMode.Light ? KezelMode.Dark : KezelMode.Light
                  )
                }
              >
                {mode === KezelMode.Light
                  ? "Switch to dark"
                  : "Switch to light"}
              </Button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Docs navigation sidebar */}
            <SideMenu
              data={docsMenuData}
              selectedId={activeSection}
              onNavigate={(p) => setActiveSection(p.id as SectionId)}
              collapsed={docsNavCollapsed}
              onCollapsedChange={setDocsNavCollapsed}
              collapsible
              expandedWidth={250}
              collapsedWidth={72}
              header={
                <div
                  className="flex items-center justify-start p-3 text-sm font-bold"
                  style={{ color: "var(--kz-color-text-default)" }}
                >
                  {!docsNavCollapsed && "Design System"}
                </div>
              }
              showTooltipsWhenCollapsed
            />

            {/* Main content */}
            <main className="flex-1 overflow-auto flex flex-col items-center gap-12 p-8">
              {activeSection === "typography" && <TypographyShowcase />}
              {activeSection === "button" && <ButtonShowcase />}
              {activeSection === "toggle-button" && <ToggleButtonShowcase />}
              {activeSection === "checkbox" && <CheckboxShowcase />}
              {activeSection === "radio-button" && <RadioButtonShowcase />}
              {activeSection === "tabs" && <TabsShowcase />}
              {activeSection === "table" && <TableShowcase />}
              {activeSection === "text-input" && <TextInputShowcase />}
              {activeSection === "text-area" && <TextAreaShowcase />}
              {activeSection === "number-input" && <NumberInputShowcase />}
              {activeSection === "date-time-picker" && (
                <DateTimePickerShowcase />
              )}
              {activeSection === "date-range-picker" && (
                <DateRangePickerShowcase />
              )}
              {activeSection === "color-picker" && <ColorPickerShowcase />}
              {activeSection === "icon-picker" && <IconPickerShowcase />}
              {activeSection === "file-uploader" && <FileUploaderShowcase />}
              {activeSection === "select" && <SelectShowcase />}
              {activeSection === "dropdown" && (
                <DropdownShowcase
                  onTokenOverridesChange={setDropdownTokenOverrides}
                  dropdownTokenOverrides={dropdownTokenOverrides}
                />
              )}
              {activeSection === "avatar" && <AvatarShowcase />}
              {activeSection === "side-menu" && <SideMenuShowcase />}
              {activeSection === "side-panel" && <SidePanelShowcase />}
              {activeSection === "form-group" && <FormGroupShowcase />}
              {activeSection === "modal" && <ModalShowcase />}
              {activeSection === "toast" && <ToastShowcase />}
            </main>
          </div>
        </div>
      </ToastProvider>
    </KezelThemeProvider>
  );
}
