/* ------------------------------------------------------------
 *  V2__add__open__and__password.sql   –  open type of question and password for user is added for AI-Coding-Interviewer MVP
 *  PostgreSQL 16+
 * ---------------------------------------------------------- */
-- Step 1: Drop the old enum type constraint dependency
-- You *cannot* just remove a value from a PostgreSQL ENUM, so we recreate it.

-- 1. Rename the existing enum
ALTER TYPE question_type_enum RENAME TO question_type_enum_old;

-- 2. Create the new enum with desired values
CREATE TYPE question_type_enum AS ENUM ('CODING', 'SYSTEM_DESIGN', 'OPEN');

-- 3. Alter the column to use the new enum
ALTER TABLE question
    ALTER COLUMN question_type DROP DEFAULT,
    ALTER COLUMN question_type TYPE question_type_enum USING question_type::text::question_type_enum;

-- 4. Drop the old enum
DROP TYPE question_type_enum_old;

-- Step 2: Modify the 'users' table to include a password column
ALTER TABLE users
    ADD COLUMN password VARCHAR(255) NOT NULL;
