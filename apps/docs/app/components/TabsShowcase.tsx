"use client";

import {
  Typography,
  TypographyVariantEnum,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Icon,
  IconName,
} from "kz-design-system";

export default function TabsShowcase() {
  return (
    <section className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <Typography variant={TypographyVariantEnum.H2}>Tabs</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Pill, underline, and vertical variants in sm, md, lg. Switch theme and
        mode to see styles.
      </Typography>

      <div className="flex flex-col gap-6 w-full">
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Pill
          </Typography>
          <Tabs variant="pill" size="md" defaultValue="p1">
            <TabsList>
              <TabsTrigger value="p1">Tab 1</TabsTrigger>
              <TabsTrigger value="p2">Tab 2</TabsTrigger>
              <TabsTrigger value="p3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="p1">Pill tab 1 content.</TabsContent>
            <TabsContent value="p2">Pill tab 2 content.</TabsContent>
            <TabsContent value="p3">Pill tab 3 content.</TabsContent>
          </Tabs>
        </div>

        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Underline
          </Typography>
          <Tabs variant="underline" size="md" defaultValue="u1">
            <TabsList>
              <TabsTrigger value="u1">Tab 1</TabsTrigger>
              <TabsTrigger value="u2">Tab 2</TabsTrigger>
              <TabsTrigger value="u3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="u1">Underline tab 1 content.</TabsContent>
            <TabsContent value="u2">Underline tab 2 content.</TabsContent>
            <TabsContent value="u3">Underline tab 3 content.</TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-12 flex-wrap">
          <div>
            <Typography variant={TypographyVariantEnum.H3} className="mb-2">
              Vertical
            </Typography>
            <Tabs variant="vertical" size="md" defaultValue="v1">
              <TabsList>
                <TabsTrigger value="v1">Tab 1</TabsTrigger>
                <TabsTrigger value="v2">Tab 2</TabsTrigger>
                <TabsTrigger value="v3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="v1">Vertical tab 1 content.</TabsContent>
              <TabsContent value="v2">Vertical tab 2 content.</TabsContent>
              <TabsContent value="v3">Vertical tab 3 content.</TabsContent>
            </Tabs>
          </div>
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
      </div>
    </section>
  );
}
