/* ---------------------------------------------------------------------------
   R__sample_data.sql  –  Dev/CI seed data for the AI-Coding-Interviewer MVP
   Compatible with V1__init.sql posted 2025-05-22
   ---------------------------------------------------------------------------
   ▸ One demo candidate
   ▸ One active interview session with 4 phases (enum-typed)
   ▸ 8 questions (mixed types)
   ▸ 2 sample answers + scores
   ▸ An MCP context row with empty state
   ---------------------------------------------------------------------------
   Re-run safe in local dev thanks to TRUNCATE … RESTART IDENTITY.
   Remove the TRUNCATE block if you prefer append-only in prod.
---------------------------------------------------------------------------*/

/* 1️⃣  Wipe previous seed rows so the script can be re-executed harmlessly */
TRUNCATE TABLE answer_score,
    answer,
    question,
    phase,
    interview_session,
    mcp_context,
    users
    RESTART IDENTITY CASCADE;

/* 2️⃣  Use a DO block so we can capture generated IDs cleanly */
DO $$
    DECLARE
        v_user_id     BIGINT;
        v_session_id  BIGINT;
        v_phase_base  BIGINT;
        v_phase_scn   BIGINT;
        v_phase_arch  BIGINT;
        v_phase_deep  BIGINT;
        v_answer_id1  BIGINT;
        v_answer_id2  BIGINT;
    BEGIN
        /* ---------- USER ------------------------------------------------------- */
        INSERT INTO users (email, full_name, password, role)
        VALUES ('candidate@example.com', 'Demo Candidate','abc123', 'CANDIDATE')
        RETURNING id INTO v_user_id;

        /* ---------- SESSION ---------------------------------------------------- */
        INSERT INTO interview_session (user_id, active, started_at)
        VALUES (v_user_id, TRUE, NOW())
        RETURNING id INTO v_session_id;

        /* ---------- PHASES (enum phase_type) ----------------------------------- */
        INSERT INTO phase (session_id, phase_type)
        VALUES (v_session_id, 'BASELINE')      RETURNING id INTO v_phase_base;
        INSERT INTO phase (session_id, phase_type)
        VALUES (v_session_id, 'SCENARIO')      RETURNING id INTO v_phase_scn;
        INSERT INTO phase (session_id, phase_type)
        VALUES (v_session_id, 'ARCHITECTURE')  RETURNING id INTO v_phase_arch;
        INSERT INTO phase (session_id, phase_type)
        VALUES (v_session_id, 'DEEP_DIVE')     RETURNING id INTO v_phase_deep;

        /* ---------- QUESTIONS -------------------------------------------------- */
        -- Baseline
        INSERT INTO question (phase_id, question_type, prompt) VALUES
                                                                   (v_phase_base, 'OPEN',
                                                                    'Explain the difference between HTML <div> and <section>.'),
                                                                   (v_phase_base, 'CODING',
                                                                    'Write a SQL query that selects DISTINCT roles from the users table.');

        -- Scenario
        INSERT INTO question (phase_id, question_type, prompt) VALUES
                                                                   (v_phase_scn, 'CODING',
                                                                    'Given an array of integers, return indices of the two numbers that add up to a target.'),
                                                                   (v_phase_scn, 'OPEN',
                                                                    'List edge cases you would test for the previous algorithm.');

        -- Architecture
        INSERT INTO question (phase_id, question_type, prompt) VALUES
                                                                   (v_phase_arch, 'SYSTEM_DESIGN',
                                                                    'Design a RESTful API for a URL shortener. Detail endpoints, data model, and scaling strategy.'),
                                                                   (v_phase_arch, 'OPEN',
                                                                    'How would you leverage Redis in your design to improve performance?');

        -- Deep Dive
        INSERT INTO question (phase_id, question_type, prompt) VALUES
                                                                   (v_phase_deep, 'OPEN',
                                                                    'Explain how the JVM garbage collector works and how you would tune it for a memory-intensive service.'),
                                                                   (v_phase_deep, 'OPEN',
                                                                    'Compare optimistic vs. pessimistic locking in JPA. When would you choose each?');

        /* ---------- SAMPLE ANSWERS & SCORES (optional but handy) --------------- */
        -- Grab two question IDs to demo the answer/score cascade
        SELECT id INTO v_answer_id1 FROM question
        WHERE prompt LIKE 'Explain the difference%'
        ORDER BY id ASC
        LIMIT 1;

        SELECT id INTO v_answer_id2 FROM question
        WHERE prompt LIKE 'Design a RESTful API%'
        ORDER BY id ASC
        LIMIT 1;


        INSERT INTO answer (question_id, content)
        VALUES (v_answer_id1, 'A <div> is generic; <section> conveys document structure.')
        RETURNING id INTO v_answer_id1;

        INSERT INTO answer (question_id, content)
        VALUES (v_answer_id2, 'API would expose POST /links, GET /{code}, data in PostgreSQL, cache in Redis.')
        RETURNING id INTO v_answer_id2;


        /* First answer’s score */
        INSERT INTO answer_score (answer_id, value, feedback)
        VALUES (v_answer_id1, 0.85, 'Good grasp of semantic HTML; mention accessibility next time.');

        /* Second answer's score */
        INSERT INTO answer_score (answer_id, value, feedback)
        VALUES (v_answer_id2, 0.9, 'Solid system design; consider rate limiting.');

    END
$$;

/* 3️⃣  Blank MCP context so server code can sync without null checks */
INSERT INTO mcp_context (session_id, state, last_sync)
SELECT id, '{}'::jsonb, NOW()
FROM interview_session
WHERE active = TRUE;
