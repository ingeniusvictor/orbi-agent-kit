# Portability Matrix

| Component | Shared core | Must adapt per repo | Notes |
|---|---:|---:|---|
| evidence-backed completion | ✅ | ✅ | exact gates differ |
| structured observations | ✅ | ✅ | authority fields differ |
| safe retry / stop conditions | ✅ | minor | fail closed |
| context loading classes | ✅ | minor | paths differ |
| AgentShield report-only posture | ✅ | ✅ | baseline is always repo-specific |
| root `AGENTS.md` | template | ✅ | never copy blindly |
| security trust boundaries | pattern | ✅ | product/runtime specific |
| operational/biometric authority | no | ✅ | domain specific |
| scanner accepted findings | no | ✅ | never inherit automatically |
| hooks/MCP/memory/autonomy | disabled | separate phase | not core v0.1 |
