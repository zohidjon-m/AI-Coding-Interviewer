-- ───────────────────────────────────────────────────────────────
-- File: src/main/resources/db/migration/V3__add_session_preferences.sql
-- (Flyway migration - number V3)
-- ───────────────────────────────────────────────────────────────
ALTER TABLE interview_session
    ADD COLUMN stack          VARCHAR(32)  NOT NULL DEFAULT 'SPRING_BOOT',
    ADD COLUMN experience     VARCHAR(32)  NOT NULL DEFAULT 'JUNIOR',
    ADD COLUMN difficulty     VARCHAR(16)  NOT NULL DEFAULT 'MEDIUM',
    ADD COLUMN company_tier   VARCHAR(16)  NOT NULL DEFAULT 'STARTUP';
