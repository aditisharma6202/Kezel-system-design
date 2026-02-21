# MCP (Model Context Protocol)

## Figma

Figma MCP is configured for this project via the remote server (`https://mcp.figma.com/mcp`).

**To connect:**

1. **Reload Cursor** – Fully quit and reopen Cursor (or **Developer: Reload Window** from the Command Palette) so it loads `.cursor/mcp.json`.
2. **Open MCP settings** – **Settings → Tools & MCP** (or Command Palette → “MCP”).
3. **Connect Figma** – Find **figma** in the list and click **Connect**. Complete Figma’s OAuth flow when prompted.
4. **Use it** – Paste a Figma link (e.g. to a frame or node) in the chat; the agent can use it to pull design context.

No token in the config: the remote server uses OAuth through Cursor’s Connect flow.
