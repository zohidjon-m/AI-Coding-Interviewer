/* ------------------------------------------------------------
 *  V1__init.sql   –  Core schema for AI-Coding-Interviewer MVP
 *  PostgreSQL 16+
 * ---------------------------------------------------------- */

BEGIN;

/* ---------- ENUM TYPES (simple, fast RBAC & branching) ----- */
CREATE TYPE role_enum         AS ENUM ('CANDIDATE', 'ADMIN');
CREATE TYPE phase_type_enum   AS ENUM ('BASELINE', 'SCENARIO', 'ARCHITECTURE', 'DEEP_DIVE');
CREATE TYPE question_type_enum AS ENUM ('CODING', 'SYSTEM_DESIGN', 'MULTIPLE_CHOICE');

/* ---------- USERS ------------------------------------------ */
CREATE TABLE users (
                       id          bigserial PRIMARY KEY,
                       email       varchar(255) NOT NULL,
                       full_name   varchar(255) NOT NULL,
                       role        role_enum    NOT NULL DEFAULT 'CANDIDATE',
                       created_at  timestamptz  NOT NULL DEFAULT now(),
                       updated_at  timestamptz,
                       version     bigint,
                       CONSTRAINT  uk_user_email UNIQUE (email)
);
CREATE INDEX idx_user_email ON users(email);

/* ---------- INTERVIEW SESSION ------------------------------ */
CREATE TABLE interview_session (
                                   id          bigserial PRIMARY KEY,
                                   user_id     bigint       NOT NULL,
                                   active      boolean      NOT NULL DEFAULT TRUE,
                                   started_at  timestamptz  NOT NULL DEFAULT now(),
                                   ended_at    timestamptz,
                                   created_at  timestamptz  NOT NULL DEFAULT now(),
                                   updated_at  timestamptz,
                                   version     bigint,
                                   CONSTRAINT  fk_session_user
                                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_session_user_active ON interview_session(user_id, active);

/* ---------- PHASE ------------------------------------------ */
CREATE TABLE phase (
                       id          bigserial PRIMARY KEY,
                       session_id  bigint            NOT NULL,
                       phase_type  phase_type_enum   NOT NULL,
                       opened_at   timestamptz,
                       created_at  timestamptz       NOT NULL DEFAULT now(),
                       updated_at  timestamptz,
                       version     bigint,
                       CONSTRAINT  fk_phase_session
                           FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE
);
CREATE INDEX idx_phase_session ON phase(session_id);

/* ---------- QUESTION --------------------------------------- */
CREATE TABLE question (
                          id             bigserial PRIMARY KEY,
                          phase_id       bigint              NOT NULL,
                          question_type  question_type_enum  NOT NULL,
                          prompt         text                NOT NULL,
                          metadata       jsonb               DEFAULT '{}'::jsonb,
                          created_at     timestamptz         NOT NULL DEFAULT now(),
                          updated_at     timestamptz,
                          version        bigint,
                          CONSTRAINT fk_question_phase
                              FOREIGN KEY (phase_id) REFERENCES phase(id) ON DELETE CASCADE
);
CREATE INDEX idx_question_phase ON question(phase_id);

/* ---------- ANSWER ----------------------------------------- */
CREATE TABLE answer (
                        id            bigserial PRIMARY KEY,
                        question_id   bigint       NOT NULL,
                        content       text         NOT NULL,
                        submitted_at  timestamptz  NOT NULL DEFAULT now(),
                        created_at    timestamptz  NOT NULL DEFAULT now(),
                        updated_at    timestamptz,
                        version       bigint,
                        CONSTRAINT fk_answer_question
                            FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);
CREATE INDEX idx_answer_question ON answer(question_id);

/* ---------- ANSWER SCORE ----------------------------------- */
CREATE TABLE answer_score (
                              id         bigserial PRIMARY KEY,
                              answer_id  bigint    NOT NULL,
                              value      DOUBLE PRECISION,
                              feedback   text,
                              created_at timestamptz NOT NULL DEFAULT now(),
                              updated_at timestamptz,
                              version    bigint,
                              CONSTRAINT fk_score_answer
                                  FOREIGN KEY (answer_id) REFERENCES answer(id) ON DELETE CASCADE,
                              CONSTRAINT uk_score_answer UNIQUE (answer_id)
);

/* ---------- MCP CONTEXT ------------------------------------ */
CREATE TABLE mcp_context (
                             id          bigserial PRIMARY KEY,
                             session_id  bigint  NOT NULL UNIQUE,
                             state       jsonb   NOT NULL,
                             last_sync   timestamptz,
                             created_at  timestamptz  NOT NULL DEFAULT now(),
                             updated_at  timestamptz,
                             version     bigint,
                             CONSTRAINT fk_mcp_session
                                 FOREIGN KEY (session_id) REFERENCES interview_session(id) ON DELETE CASCADE
);
CREATE INDEX idx_mcp_session ON mcp_context(session_id);

COMMIT;
