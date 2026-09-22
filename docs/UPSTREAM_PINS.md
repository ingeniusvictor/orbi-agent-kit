# Upstream Pins

The initial kit is derived from the certified ORBI pilots using these reviewed upstream references:

- ECC `2.2.2` — commit `91ba9b4cf6c47c8130829004f8bb64762a76ccbb`
- AgentShield `1.6.0` — commit `b0891303bdcd6037376a94263d45cfd2ff3dfb98`

These are provenance records, not auto-update instructions.

## Update policy

1. Never float directly on `main` for governed adoption.
2. Review upstream diff from the currently certified pin.
3. Treat new agents, skills, hooks, MCP configs and scanners as untrusted until reviewed.
4. Re-run a pilot repository before changing the shared ORBI pin.
5. Do not auto-propagate a repository-specific scanner exception into another repository.
