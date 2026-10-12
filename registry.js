/* Single source of truth for the tool list: used by the tools hub,
   the "related tools" strip on every tool page and the portfolio section. */
window.TOOLS = [
  { slug: "subnet-calculator", tag: "NET", name: "IPv4 Subnet Calculator",
    desc: "Network, broadcast, usable hosts, wildcard and netmask from any IP/CIDR." },
  { slug: "cidr-range", tag: "NET", name: "CIDR ↔ IP Range Converter",
    desc: "Expand a CIDR into its range, or turn any start–end range into the minimal CIDR list." },
  { slug: "fortigate-address-generator", tag: "FORTINET", name: "FortiGate Address Object Generator",
    desc: "Paste IPs, subnets, ranges or FQDNs and get ready-to-paste FortiOS CLI with an address group." },
  { slug: "mac-formatter", tag: "NET", name: "MAC Address Formatter",
    desc: "Convert MACs between colon, hyphen, Cisco dotted and bare formats, in bulk." },
  { slug: "password-generator", tag: "SEC", name: "Password Generator",
    desc: "Cryptographically random passwords and passphrases with live entropy estimate." },
  { slug: "hash-generator", tag: "SEC", name: "Hash Generator",
    desc: "MD5, SHA-1, SHA-256, SHA-384 and SHA-512 of any text, computed locally." },
  { slug: "jwt-decoder", tag: "SEC", name: "JWT Decoder",
    desc: "Decode a JSON Web Token header and payload, with human-readable expiry dates." },
  { slug: "base64", tag: "DEV", name: "Base64 & URL Encoder / Decoder",
    desc: "Encode and decode Base64, Base64URL and percent-encoding with full UTF-8 support." },
  { slug: "timestamp-converter", tag: "DEV", name: "Unix Timestamp Converter",
    desc: "Epoch seconds or milliseconds to UTC/local dates and back, ISO 8601 included." },
  { slug: "chmod-calculator", tag: "LINUX", name: "Chmod Calculator",
    desc: "Toggle permissions or type an octal mode: get symbolic notation and the chmod command." }
];
