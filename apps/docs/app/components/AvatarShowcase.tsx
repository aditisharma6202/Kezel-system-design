"use client";

import {
  Typography,
  TypographyVariantEnum,
  Avatar,
  AvatarSize,
  AvatarStatus,
} from "kz-design-system";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from "kz-design-system/dropdown";

export default function AvatarShowcase() {
  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-md">
      <Typography variant={TypographyVariantEnum.H2}>Avatar</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Circle avatar with online status indicator. Sizes: sm, md, lg, xl.
        Fallback: initials or default icon.
      </Typography>
      <div className="flex flex-wrap gap-4 justify-center items-end">
        <Avatar
          src="https://i.pravatar.cc/128?u=alice"
          alt="Alice"
          size={AvatarSize.Sm}
          status={AvatarStatus.Online}
        />
        <Avatar
          src="https://i.pravatar.cc/128?u=bob"
          alt="Bob"
          size={AvatarSize.Md}
          status={AvatarStatus.Online}
        />
        <Avatar
          src="https://i.pravatar.cc/128?u=carol"
          alt="Carol"
          size={AvatarSize.Lg}
          status={AvatarStatus.Busy}
        />
        <Avatar
          size={AvatarSize.Xl}
          initials="JD"
          status={AvatarStatus.Online}
        />
        <Avatar size={AvatarSize.Md} />
        <Avatar size={AvatarSize.Lg} initials="AB" status={AvatarStatus.Away} />
      </div>

      <Typography variant={TypographyVariantEnum.H3}>
        Avatar as dropdown trigger
      </Typography>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Dropdown>
          <DropdownTrigger asChild showChevron={false}>
            <button
              type="button"
              className="rounded-full cursor-pointer bg-transparent border-none p-0"
            >
              <Avatar
                src="https://i.pravatar.cc/128?u=alice"
                alt="Alice"
                size={AvatarSize.Md}
                status={AvatarStatus.Online}
              />
            </button>
          </DropdownTrigger>
          <DropdownContent align="end" sideOffset={6}>
            <DropdownLabel>Alice Johnson</DropdownLabel>
            <DropdownSeparator />
            <DropdownItem onSelect={() => {}}>Profile</DropdownItem>
            <DropdownItem onSelect={() => {}}>Settings</DropdownItem>
            <DropdownSeparator />
            <DropdownItem onSelect={() => {}}>Sign out</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </section>
  );
}
