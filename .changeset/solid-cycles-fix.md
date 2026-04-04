---
"@kezel/ui": patch
---

fix: theme token corrections for sidemenu, sidepanel, and form controls

- Fix sidepanel using sidemenu tokens instead of sidesheet tokens
- Add sidesheet-bg token to dark and neumorphic themes
- Fix duplicate `1px solid` in container/ghost input border tokens
- Add hover styles for sidemenu items (brand color text, icon, chevron, border)
- Prevent hover effect on active sidemenu items
- Fix sidemenu item layout shift on hover by using transparent border default
- Add thin scrollbar styling for sidemenu nav
- Add sidemenu-bg token for standard dark theme (#111010)
- Define all sidemenu tokens in neumorphic to prevent bleed from standard
