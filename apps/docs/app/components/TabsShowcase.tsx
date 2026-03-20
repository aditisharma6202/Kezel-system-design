"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  SubTabsTrigger,
  Icon,
  IconName,
} from "kz-design-system";

export default function TabsShowcase() {
  const [subTabValue, setSubTabValue] = React.useState("overview");
  const [subTabUnderlineValue, setSubTabUnderlineValue] =
    React.useState("overview");

  return (
    <section className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <Typography variant={TypographyVariantEnum.H2}>Tabs</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Horizontal and vertical orientations, each with pill and underline
        variants. Sizes: sm, md, lg. Switch theme and mode to see styles.
      </Typography>

      <div className="flex flex-col gap-6 w-full">
        {/* ── Horizontal Pill ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Horizontal Pill
          </Typography>
          <Tabs
            variant="pill"
            orientation="horizontal"
            size="md"
            defaultValue="hp1"
          >
            <TabsList>
              <TabsTrigger value="hp1">Tab 1</TabsTrigger>
              <TabsTrigger value="hp2">Tab 2</TabsTrigger>
              <TabsTrigger value="hp3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="hp1">
              Horizontal pill tab 1 content.
            </TabsContent>
            <TabsContent value="hp2">
              Horizontal pill tab 2 content.
            </TabsContent>
            <TabsContent value="hp3">
              Horizontal pill tab 3 content.
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Horizontal Underline ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Horizontal Underline
          </Typography>
          <Tabs
            variant="underline"
            orientation="horizontal"
            size="md"
            defaultValue="hu1"
          >
            <TabsList>
              <TabsTrigger value="hu1">Tab 1</TabsTrigger>
              <TabsTrigger value="hu2">Tab 2</TabsTrigger>
              <TabsTrigger value="hu3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="hu1">
              Horizontal underline tab 1 content.
            </TabsContent>
            <TabsContent value="hu2">
              Horizontal underline tab 2 content.
            </TabsContent>
            <TabsContent value="hu3">
              Horizontal underline tab 3 content.
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-12 flex-wrap">
          {/* ── Vertical Pill ── */}
          <div>
            <Typography variant={TypographyVariantEnum.H3} className="mb-2">
              Vertical Pill
            </Typography>
            <Tabs
              variant="pill"
              orientation="vertical"
              size="md"
              defaultValue="vp1"
            >
              <TabsList>
                <TabsTrigger value="vp1">Tab 1</TabsTrigger>
                <TabsTrigger value="vp2">Tab 2</TabsTrigger>
                <TabsTrigger value="vp3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="vp1">
                Vertical pill tab 1 content.
              </TabsContent>
              <TabsContent value="vp2">
                Vertical pill tab 2 content.
              </TabsContent>
              <TabsContent value="vp3">
                Vertical pill tab 3 content.
              </TabsContent>
            </Tabs>
          </div>

          {/* ── Vertical Underline ── */}
          <div>
            <Typography variant={TypographyVariantEnum.H3} className="mb-2">
              Vertical Underline
            </Typography>
            <Tabs
              variant="underline"
              orientation="vertical"
              size="md"
              defaultValue="vu1"
            >
              <TabsList>
                <TabsTrigger value="vu1">Tab 1</TabsTrigger>
                <TabsTrigger value="vu2">Tab 2</TabsTrigger>
                <TabsTrigger value="vu3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="vu1">
                Vertical underline tab 1 content.
              </TabsContent>
              <TabsContent value="vu2">
                Vertical underline tab 2 content.
              </TabsContent>
              <TabsContent value="vu3">
                Vertical underline tab 3 content.
              </TabsContent>
            </Tabs>
          </div>

          {/* ── Sizes ── */}
          <div>
            <Typography variant={TypographyVariantEnum.H3} className="mb-2">
              Sizes
            </Typography>
            <div className="flex flex-col gap-4">
              <Tabs variant="pill" size="sm" defaultValue="s1">
                <TabsList>
                  <TabsTrigger value="s1">Sm 1</TabsTrigger>
                  <TabsTrigger value="s2">Sm 2</TabsTrigger>
                </TabsList>
                <TabsContent value="s1">Small tabs content.</TabsContent>
                <TabsContent value="s2">Tab 2.</TabsContent>
              </Tabs>
              <Tabs variant="pill" size="md" defaultValue="m1">
                <TabsList>
                  <TabsTrigger value="m1">Md 1</TabsTrigger>
                  <TabsTrigger value="m2">Md 2</TabsTrigger>
                </TabsList>
                <TabsContent value="m1">Medium tabs content.</TabsContent>
                <TabsContent value="m2">Tab 2.</TabsContent>
              </Tabs>
              <Tabs variant="pill" size="lg" defaultValue="l1">
                <TabsList>
                  <TabsTrigger value="l1">Lg 1</TabsTrigger>
                  <TabsTrigger value="l2">Lg 2</TabsTrigger>
                </TabsList>
                <TabsContent value="l1">Large tabs content.</TabsContent>
                <TabsContent value="l2">Tab 2.</TabsContent>
              </Tabs>
            </div>
          </div>

          {/* ── With icon ── */}
          <div>
            <Typography variant={TypographyVariantEnum.H3} className="mb-2">
              With icon
            </Typography>
            <Tabs variant="pill" size="md" defaultValue="i1">
              <TabsList>
                <TabsTrigger
                  value="i1"
                  icon={
                    <Icon
                      name={IconName.Search}
                      size="sm"
                      color="currentColor"
                    />
                  }
                >
                  Search
                </TabsTrigger>
                <TabsTrigger
                  value="i2"
                  icon={
                    <Icon
                      name={IconName.BarChart2}
                      size="sm"
                      color="currentColor"
                    />
                  }
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="i3"
                  icon={
                    <Icon
                      name={IconName.Shield}
                      size="sm"
                      color="currentColor"
                    />
                  }
                >
                  Security
                </TabsTrigger>
              </TabsList>
              <TabsContent value="i1">Search content.</TabsContent>
              <TabsContent value="i2">Analytics content.</TabsContent>
              <TabsContent value="i3">Security content.</TabsContent>
            </Tabs>
          </div>
        </div>

        {/* ── Full width ── */}
        <div className="w-full max-w-md">
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Full width
          </Typography>
          <Tabs variant="pill" size="md" fullWidth defaultValue="f1">
            <TabsList>
              <TabsTrigger value="f1">Tab 1</TabsTrigger>
              <TabsTrigger value="f2">Tab 2</TabsTrigger>
              <TabsTrigger value="f3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="f1">Full width tab 1 content.</TabsContent>
            <TabsContent value="f2">Full width tab 2 content.</TabsContent>
            <TabsContent value="f3">Full width tab 3 content.</TabsContent>
          </Tabs>
        </div>

        {/* ── With Sub Tabs (Pill) ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            With Sub Tabs (Pill)
          </Typography>
          <Tabs
            variant="pill"
            size="md"
            value={subTabValue}
            onValueChange={setSubTabValue}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <SubTabsTrigger
                label="Reports"
                activeValue={subTabValue}
                subTabs={[
                  { value: "report-daily", label: "Daily" },
                  { value: "report-weekly", label: "Weekly" },
                  { value: "report-monthly", label: "Monthly" },
                ]}
              />
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Overview content.</TabsContent>
            <TabsContent value="report-daily">
              Daily report content.
            </TabsContent>
            <TabsContent value="report-weekly">
              Weekly report content.
            </TabsContent>
            <TabsContent value="report-monthly">
              Monthly report content.
            </TabsContent>
            <TabsContent value="settings">Settings content.</TabsContent>
          </Tabs>
        </div>

        {/* ── With Sub Tabs (Underline) ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            With Sub Tabs (Underline)
          </Typography>
          <Tabs
            variant="underline"
            size="md"
            value={subTabUnderlineValue}
            onValueChange={setSubTabUnderlineValue}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <SubTabsTrigger
                label="Reports"
                activeValue={subTabUnderlineValue}
                subTabs={[
                  { value: "report-daily", label: "Daily" },
                  { value: "report-weekly", label: "Weekly" },
                  { value: "report-monthly", label: "Monthly" },
                ]}
              />
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Overview content.</TabsContent>
            <TabsContent value="report-daily">
              Daily report content.
            </TabsContent>
            <TabsContent value="report-weekly">
              Weekly report content.
            </TabsContent>
            <TabsContent value="report-monthly">
              Monthly report content.
            </TabsContent>
            <TabsContent value="settings">Settings content.</TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
