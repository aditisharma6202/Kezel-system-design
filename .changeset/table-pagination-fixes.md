---
"kz-design-system": patch
---

- Fix table max-height: remove hardcoded 60vh cap, add `maxHeight` prop for consumer control
- Fix pagination label: show "N items" instead of "1–N of N" when single page
- Fix SubTabsTrigger menu z-index from 51 to 9999 to render above SidePanel overlay
- Add `pagination` subpath export to package.json and tsup config
- Add Skeleton, Loader, and new Storybook stories for TextInput types, SidePanel form controls, Avatar dropdown trigger
