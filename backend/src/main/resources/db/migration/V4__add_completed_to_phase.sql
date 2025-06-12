-- Boolean with default false (typical)
ALTER TABLE phase
    ADD COLUMN completed BOOLEAN NOT NULL DEFAULT FALSE;
