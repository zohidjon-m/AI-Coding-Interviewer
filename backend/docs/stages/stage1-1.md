# Stage 1 Domain Object Walkthrough: AI Coding Interviewer

Below is a concept-by-concept walkthrough of the seven domain objects that anchor Stage 1 of your AI-coding-interviewer backend.

---

## 1. User

| Aspect              | Detail                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Business role**   | A person who logs into the system. Initially only candidates, but plan for ADMIN, HIRING\_MANAGER, INTERVIEWER for future extensibility. |
| **Core fields**     | `email` (unique, login credential), `fullName` (UI and certificate display), `role` (enum – supports RBAC).                              |
| **Auditing**        | Inherits from `Auditable` – tracks `createdAt`, `updatedAt`, `version`.                                                                  |
| **Relationships**   | One-to-many with `InterviewSession`. `orphanRemoval=true` – deleting a user deletes their sessions.                                      |
| **Lifecycle**       | Create on sign-up/OAuth → Update profile → Soft delete later if GDPR needed.                                                             |
| **Typical queries** | `findByEmail`, `existsByEmail`, `findByRole(Role.ADMIN)`                                                                                 |
| **Trade-offs**      | No password column – assumes outsourced auth (Cognito/Auth0). Add password field if needed for in-house JWT.                             |

---

## 2. InterviewSession

| Aspect              | Detail                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Business role**   | Represents one interview run – from "Start interview" to grading.                       |
| **Core fields**     | `active` (resume logic), `startedAt`, `endedAt` (for timing/reporting).                 |
| **Relationships**   | Many-to-one `User`, one-to-one `McpContext`, one-to-many `Phase`.                       |
| **Cascades**        | `CascadeType.ALL` + `orphanRemoval` – cleans up entire session tree.                    |
| **Lifecycle**       | Create on Start → `active=true` → Update on session progress → `endedAt` when finished. |
| **Typical queries** | `findByUserAndActiveTrue`, `findByStartedAtBetween(...)`                                |
| **Trade-offs**      | Could use JSON array for `phases`, but row model enables better scoring/querying.       |

---

## 3. Phase

| Aspect              | Detail                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Business role**   | Models interview stages: BASELINE, SCENARIO, ARCHITECTURE, DEEP\_DIVE. Enables UI progress tracking and service branching logic. |
| **Core fields**     | `phaseType` (enum), `openedAt` (timing SLAs).                                                                                    |
| **Relationships**   | Many-to-one `InterviewSession`, one-to-many `Question`.                                                                          |
| **Lifecycle**       | Created when AI generates first question of phase → closed implicitly after last question.                                       |
| **Typical queries** | `findBySessionIdOrderById`, `countBySessionAndPhaseType`                                                                         |
| **Trade-offs**      | To support custom phase flow, extract `PhaseType` to DB table.                                                                   |

---

## 4. Question

| Aspect              | Detail                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **Business role**   | A prompt for the candidate – code task, system design, MCQ, etc.                              |
| **Core fields**     | `prompt`, `questionType`, `metadata` (jsonb: difficulty, tags, timeLimit).                    |
| **JSON mapping**    | Stored as `jsonb`, queried via SQL (`metadata->>'difficulty' = '3'`), mapped in Java via Map. |
| **Relationships**   | Many-to-one `Phase`, one-to-many `Answer`.                                                    |
| **Lifecycle**       | Inserted by AI → Immutable post-creation.                                                     |
| **Typical queries** | `findByPhaseId`, `searchByPromptIlike("%binary tree%")`                                       |
| **Trade-offs**      | Could nest in `Phase`, but separate row helps versioning, scoring.                            |

---

## 5. Answer

| Aspect              | Detail                                                           |
| ------------------- | ---------------------------------------------------------------- |
| **Business role**   | Stores the user’s code/answer submission. One row per attempt.   |
| **Core fields**     | `content` (TEXT), `submittedAt`.                                 |
| **Relationships**   | Many-to-one `Question`, one-to-one `Score`.                      |
| **Lifecycle**       | Created on "Submit"/auto-save → editable until lock.             |
| **Typical queries** | `findFirstByQuestionOrderBySubmittedAtDesc`, `countByQuestion`   |
| **Trade-offs**      | Plain TEXT supports all languages. Add language field if needed. |

---

## 6. Score

| Aspect              | Detail                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| **Business role**   | Stores grading result – from GPT/test harness or human review.            |
| **Core fields**     | `value` (double), `feedback` (long-form explanation or diff).             |
| **Relationships**   | One-to-one `Answer`. Unique constraint enforced.                          |
| **Lifecycle**       | Created by grader service → updated if human overrides.                   |
| **Typical queries** | `findByAnswerId`, `averageByQuestionId`                                   |
| **Trade-offs**      | Could merge into `Answer` but separate table enables AI vs human scoring. |

---

## 7. McpContext

| Aspect              | Detail                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Business role**   | Stores LLM state using MCP: enables resume, audits, forked follow-ups.                              |
| **Core fields**     | `state` (jsonb), `lastSync` (detect stale sessions).                                                |
| **Relationships**   | One-to-one `InterviewSession` (owned by session).                                                   |
| **Lifecycle**       | Created after first OpenAI call → updated on every LLM roundtrip → optionally deleted post-session. |
| **Typical queries** | `findBySessionId`, `where last_sync < now() - 10 min and active=true`                               |
| **Trade-offs**      | Could offload to S3 later if blob gets too large.                                                   |

---

## How They Cooperate – 30-Second Journey

1. User "[alice@example.com](mailto:alice@example.com)" clicks *Start Interview* → backend creates `InterviewSession #42`
2. Backend creates `Phase #101` with `phaseType=BASELINE`
3. AI inserts `Question #1001`: "Reverse a string"
4. User submits → creates `Answer #5001`
5. Grader Lambda processes it → inserts `Score #8001`
6. MCP call made → state stored in `McpContext`
7. Interview finishes → `endedAt` set, `active=false`

---

## Quick ERD (text form)

```
User 1 ─── * InterviewSession 1 ─── * Phase 1 ─── * Question 1 ─── * Answer 1 ─── 1 Score
                         │
                         └── 1 McpContext
```

Legend: Solid line = mandatory FK, star (\*) = "many"

---

## If Requirements Change

| New Need                      | Adjustment                                                                    |
| ----------------------------- | ----------------------------------------------------------------------------- |
| Multiple reviewers per answer | Split `Score` into `AnswerScore` with composite PK (answer\_id, reviewer\_id) |
| Custom phase order per org    | Replace enum with a DB lookup table                                           |
| Resume mid-question           | Add `draft` and `cursorPos` fields to `Answer`                                |
| Live pair-programming         | Add `interviewer_id` and `collaborationRoomId` to `InterviewSession`          |

---

## TL;DR

* **User** – who
* **InterviewSession** – one interview run
* **Phase** – structured step inside a session
* **Question** – the prompt
* **Answer** – what the candidate sent
* **Score** – evaluation of that answer
* **McpContext** – serialized LM state to support resuming
