# Free network & security tools

Static, 100% client-side tools served by GitHub Pages at https://france5cogreen.github.io/tools/.
No build step and no backend: every page is plain HTML + JavaScript.

| Path | Tool |
|---|---|
| `subnet-calculator/` | IPv4 Subnet Calculator |
| `cidr-range/` | CIDR ↔ IP Range Converter |
| `fortigate-address-generator/` | FortiGate Address Object Generator |
| `mac-formatter/` | MAC Address Formatter |
| `password-generator/` | Password Generator |
| `hash-generator/` | Hash Generator |
| `jwt-decoder/` | JWT Decoder |
| `base64/` | Base64 & URL Encoder / Decoder |
| `timestamp-converter/` | Unix Timestamp Converter |
| `chmod-calculator/` | Chmod Calculator |

## Adding a tool
1. Copy an existing `<slug>/index.html` and change the title, meta description, canonical URL and `data-tool`.
2. Add the entry to `registry.js` — the hub, the "related tools" strip and the portfolio section all read from it.
3. Add the URL to `sitemap.xml`.

Shared pieces: `tools.js` (nav/footer, copy buttons, IPv4 helpers), `tools.css`, and `assets/styles.css`
(a copy of the portfolio theme so this repo is self-contained).
