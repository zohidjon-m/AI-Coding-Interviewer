# End-to-End Implementation Playbook (Backend Only)

**Order matters.**  
Treat every stage as a “merge gate”: nothing from the next stage starts until the previous one is green in CI and pushed to `main`.

---

## 0. Local Foundation

| Step | Description |
|------|-------------|
| 0-1 | Bootstrap repo – `mvn -N wrapper:wrapper -Dmaven=3.9.8` → consistent builds. |
| 0-2 | Add dependencies: <br/>• `spring-boot-starter-{web,data-jpa,security,validation}`<br/>• Lombok, MapStruct, Flyway<br/>• PostgreSQL driver, Redis (Lettuce)<br/>• Testcontainers, WireMock<br/>• SpotBugs, PMD, Checkstyle |
| 0-3 | Dev-container – `docker-compose.yml` with Postgres 16, Redis 7, Judge0, Grafana/Prometheus |
| 0-4 | Static-analysis hook – `spotless-maven-plugin` + pre-commit Git hook |

> Locks down the toolchain before any code appears; every later step reuses the same container stack.

---

## 1. Domain & Persistence Layer

| Step | Description |
|------|-------------|
| 1-1 | Auditable base class (`createdAt`, `updatedAt`, `@Version`) |
| 1-2 | Entities:<br/>• `User (id, email, fullName, role)`<br/>• `InterviewSession (user, active, startedAt)`<br/>• `Phase (session, title, order)`<br/>• `Question (phase, prompt, type)`<br/>• `Answer (question, payload, submittedAt)`<br/>• `Score (answer, value, rubric, comment)`<br/>• `McpContext (session, state JSONB, lastSync)` |
| 1-3 | `V1__init.sql` – table DDL, indexes, FKs |
| 1-4 | Spring Data repositories with custom camel-style finders (e.g., `findBySessionIdOrderById`) |
| 1-5 | Seed script (`R__sample_data.sql`) – sample demo questions |

> Gives you a compiling app with Flyway-driven schema and CRUD tests, but no business logic yet.

---

## 2. DTO + Mapping + Service Skeletons

| Step | Description |
|------|-------------|
| 2-1 | DTOs (request/response) per entity, plus `AuthenticationDTO` |
| 2-2 | MapStruct mappers – static factory → no reflection |
| 2-3 | Service interfaces (`UserService`, `InterviewService`, …) with `@Transactional` boundaries but only pass-through behaviour |
| 2-4 | Global exception handler (`@ControllerAdvice`) returning RFC 7807 `problem+json` |

> Keeps REST layer slim; DTO & mapper compile-check that you never leak entities.

---

## 3. REST API Layer

| Step | Description |
|------|-------------|
| 3-1 | Controllers:<br/>• `/api/v1/auth` – signup / login (JWT)<br/>• `/users` – CRUD<br/>• `/sessions` – start/finish, list user sessions<br/>• `/phases/{id}/questions` – next question, submit answer<br/>• `/answers/{id}/score` – get scores |
| 3-2 | Input validation – Hibernate BV annotations & `@Valid` |
| 3-3 | Pagination – Spring `Pageable` for list endpoints |

> Provides an externally testable contract (OpenAPI doc) before we wire expensive integrations.

---

## 4. Security & Multi-Tenancy Hooks

| Step | Description |
|------|-------------|
| 4-1 | JWT filter chain – stateless bearer tokens, BCrypt password encoder |
| 4-2 | Role model – `ROLE_CANDIDATE`, `ROLE_ADMIN` with `@PreAuthorize` on services |
| 4-3 | *(Optional)* basic tenant filter (`X-Tenant-ID → TenantContextHolder`) |

> Moving security earlier prevents accidental exposure of the new endpoints you’ll add in later stages.

---

## 5. Adapters to External Services

| Step | Description |
|------|-------------|
| 5-1 | Judge0 client (`WebClient`) – submit code, poll result |
| 5-2 | LLM adapter – abstraction with OpenAI + fallback local llama-cpp |
| 5-3 | MCP client – call your context-manager server, store response in `McpContext` |
| 5-4 | Async config – `@Async` + virtual-thread executor so sandbox/LLM calls don’t block servlet threads |

> Clears the boundary between your domain and third-party clouds, making it testable with WireMock.

---

## 6. Interview Orchestration Engine

| Step | Description |
|------|-------------|
| 6-1 | Question-flow state machine – decides next phase/question using MCP state + last answer |
| 6-2 | Scoring pipeline – auto score (unit-tests pass/fail + GPT rubric) ➜ manual override |
| 6-3 | Domain events – `InterviewCreated`, `AnswerSubmitted` pushed to Redis pub/sub |

> Central brain of the product. Building it after adapters means you can already hit real services when iterating.

---

## 7. Caching & Rate-Limiting

| Step | Description |
|------|-------------|
| 7-1 | Redis cache layer – e.g. `UserDetails` + `nextQuestionPreview` (TTL 60 s) |
| 7-2 | Rate limiter – Resilience4j token-bucket backed by Redis |

> Reduces repeated GPT calls and protects Judge0 from floods.

---

## 8. Observability

| Step | Description |
|------|-------------|
| 8-1 | Micrometer + Prometheus – JVM, DB, Redis, custom interview metrics |
| 8-2 | OpenTelemetry tracing – outbound HTTP instrumented, context propagated into async |
| 8-3 | Health & readiness probes – `/actuator/health`, `/actuator/redis` |

> Lets you see spikes in GPT latency before real users complain.

---

## 9. Testing Matrix

| Step | Description |
|------|-------------|
| 9-1 | Unit tests – Service & engine logic (Mockito) |
| 9-2 | Integration tests – Testcontainers for Postgres + Redis; WireMock for external HTTP |
| 9-3 | Contract tests – Spring Cloud Contract or simple MockMvc golden snapshots for REST |

> Locks behaviour; refactors later (e.g. micro-services) won’t break clients.

---

## 10. CI/CD & Packaging

| Step | Description |
|------|-------------|
| 10-1 | GitHub Actions – build, static analysis, unit+integration tests |
| 10-2 | Build image – Spring Boot Buildpacks → distroless JRE 21 image |
| 10-3 | Deploy – dev branch to staging (single ECS Fargate task); main branch to prod with blue/green swap |
| 10-4 | *(Optional)* `-Pnative` GraalVM build for CLI batch-grader jobs |

> Final gate ensures every merge can ship; infra stays boring and reproducible.

---

## How to Work Through the List

- One PR per sub-step (e.g., 1-1, 1-2 …).
- Green tests = merge.
- Broken `master` blocks the next engineer, so keep PRs short.
- Keep docs close to code: each stage adds a `docs/stage-X.md` with decisions & trade-offs.
- Tag releases – `v0.1-local-foundation`, `v1.0-domain`, etc.

---

### ✅ Finish Gate 10 and You Have a Back-End That:

- Accepts sign-ups
- Runs adaptive interviews
- Auto-scores code
- Persists everything in Postgres
- Caches hot data in Redis
- Exposes metrics + traces
- Ships via one-click GitHub Actions
