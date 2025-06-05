# UI pages and FrontEnd Routes


| Category                 | Route                         | Purpose                                                           |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------- |
| **Public / Marketing**   | `/` (**Landing**)             | Hero, feature highlights, primary CTAs                            |
|                          | `/how-it-works`               | Step-by-step overview of the AI interview flow                    |
|                          | `/pricing`                    | Plans, feature matrix, FAQ                                        |
|                          | `/demo`                       | Read-only mock interview room (lets prospects “feel” the product) |
|                          | `/docs`                       | Help center & API / integration guides                            |
|                          | `/legal/terms`                | Terms of Service                                                  |
|                          | `/legal/privacy`              | Privacy Policy                                                    |
| **Auth & Account**       | `/auth/signup`                | Create account (multi-step)                                       |
|                          | `/auth/login`                 | Sign in                                                           |
|                          | `/auth/forgot`                | Request password reset link                                       |
|                          | `/auth/reset/:token`          | Enter new password                                                |
| **Candidate Experience** | `/dashboard`              | Upcoming interviews, quick-start practice, performance snapshot   |
|                          | `/history`                | Table of completed sessions & scores                              |
|                          | `/app/settings`               | Profile, language/theme prefs, API tokens                         |
|                          | `/app/interview/:id/precheck` | Environment check + instructions                                  |
|                          | `/app/interview/:id`          | **Live Interview** (split Chat ↔ Code)                            |
|                          | `/app/interview/:id/review`   | Post-interview score, feedback, export options                    |
