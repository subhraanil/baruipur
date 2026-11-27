# Baruipur Online — Assumptions Log (v3.0)

1. **Positioning (O-1)**: Facebook daily news scraping was removed per owner directive. The portal operates as a 5-pillar Civic Directory & City Guide (`Places`, `Organizations`, `Health Directory`, `Notices`, `Tenders`) plus `Transport`, `Emergency Contacts`, `Property / Bank Auctions`, and 85 curated evergreen guides.
2. **Weather in Utility Bar (O-6)**: Header utility bar fetches live Baruipur temperature (`lat=22.3654, lon=88.4325`) from Open-Meteo client-side, with no hardcoded stale weather claims.
3. **Emergency Contacts Single Source (O-9 / D3)**: `src/lib/constants.ts` (`EMERGENCY_CONTACTS`) and `/emergency-contacts` use verified Baruipur numbers (`033-2433-5303` Hospital, `8100820190` Hospital Emergency, `033-2433-0083` Police Control, `033-2433-8201` Municipality, `033-2433-8579` SDO, `033-2433-2555` Fire).
4. **Open Now Filter/Badge**: Removed `"খোলা আছে"` free-text assumptions; only explicit boolean flags (`isOpen24Hours`, `swasthyaSathiAccepted`) render status chips.
