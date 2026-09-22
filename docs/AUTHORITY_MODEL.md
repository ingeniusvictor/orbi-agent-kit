# ORBI Authority Model

Agent output is not authority.

## Base invariants

```text
MODEL RESPONSE != TOOL / WRITE AUTHORITY
READ ACCESS != WRITE ACCESS
TOOL SUCCESS != PERMISSION FOR NEXT TOOL
TESTS GREEN != REAL-WORLD / HARDWARE ACCEPTANCE
SCANNER GREEN != PRODUCT SAFETY CERTIFICATION
MEMORY != CANONICAL TRUTH
```

Target repositories extend this list with domain-specific rules.

Examples already proven by ORBI pilots:

### Creative Studio

- benchmark success != model/provider promotion authority
- upstream implementation != ORBI contract authority
- router observation != cutover authority

### PVMetrics

- data governance != operational authority
- source verified != measurement correct != acceptance
- synthetic != real
- AI output != plant fact != acceptance evidence
- framework ready != verified real pilot

### L.U.M.I.A.

- diarization != speaker authentication
- speaker similarity != identity proof
- speaker match != authorization for sensitive action
- CI contract pass != workstation/hardware ready
- fallback success != permanent preference change

## Required target-repository decision

Every adopted profile must explicitly enumerate authority-impact fields rather than relying on omission to mean `false`.
