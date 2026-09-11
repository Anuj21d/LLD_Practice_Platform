# Design Note — LLD Practice Platform

## 1. MVP

The MVP is a small web application for practicing Low-Level Design problems.

The main features are:

- View available LLD problems
- Open a problem and read its requirements
- Write a design solution
- Submit the solution
- See the evaluation status
- Get feedback after evaluation
- View previous attempts
- Try the problem again

The first problem used for the prototype is **Parking Lot**.

The goal of the MVP is to make the complete practice flow work rather than build a large learning platform.

---

## 2. User Flow

The main user flow is:

```text
Problems
   ↓
Select Parking Lot
   ↓
Problem Details
   ↓
Start Practice
   ↓
Write LLD Solution
   ↓
Submit
   ↓
Submission Created
   ↓
Evaluation in Progress
   ↓
Feedback
   ↓
Try Again / View Attempts
```

When the user submits a solution, it is saved in MongoDB.

The submission initially has the status:

```text
QUEUED
```

The evaluation then changes the status to:

```text
EVALUATING
```

and finally to either:

```text
COMPLETED
```

or:

```text
FAILED
```

The frontend checks the submission status and moves the user to the feedback page when evaluation is completed.

---

## 3. Main Architecture

The project is a simple modular monolith.

```text
React + TypeScript
        ↓
Express + TypeScript
        ↓
MongoDB
        ↓
Evaluation Service
     ↙       ↘
Deterministic   Gemini
 Evaluator     Evaluator
```

### Frontend

The frontend is built with React and TypeScript.

Important pages are:

- `ProblemsPage`
- `ProblemDetailsPage`
- `PracticePage`
- `SubmissionPage`
- `FeedbackPage`
- `AttemptsPage`

The frontend uses Axios to communicate with the backend API.

### Backend

The backend is built with Node.js, Express and TypeScript.

It contains:

- Routes
- Controllers
- Services
- Models
- Evaluators

The backend is responsible for creating submissions, storing them, running evaluation and returning feedback.

### Database

MongoDB stores submissions.

A submission contains information such as:

- problem ID
- submitted solution
- status
- score
- feedback
- created time
- updated time

---

## 4. Important Classes and Interfaces

### Submission

`Submission` is the main database model for a learner's attempt.

It stores the solution and its evaluation state.

The possible states are:

```text
QUEUED
EVALUATING
COMPLETED
FAILED
```

This makes it possible for the frontend to show that evaluation is still running instead of assuming that evaluation finishes immediately.

---

### Evaluator Interface

The evaluator interface defines a common method:

```ts
interface Evaluator {
  evaluate(solution: string): Promise<EvaluationResult>;
}
```

The result contains:

- score
- summary
- criteria
- strengths
- improvements
- next step

Using an interface means different evaluator implementations can follow the same contract.

---

### ParkingLotEvaluator

`ParkingLotEvaluator` is the deterministic evaluator for the Parking Lot problem.

It checks important parts of the submitted design, such as:

- Parking Lot domain model
- Vehicle classification
- Allocation and pricing strategies
- Ticket lifecycle
- Concurrency considerations

It produces a score and criterion-level feedback.

---

### LLMEvaluator

`LLMEvaluator` uses Gemini to analyse the submitted solution.

It focuses on areas such as:

- Domain modelling
- SOLID principles
- Responsibility separation
- Strategy pattern usage
- Ticket lifecycle
- Concurrency
- Extensibility
- Design trade-offs

The LLM is mainly used for qualitative feedback.

---

### Evaluation Service

The evaluation service coordinates the evaluators.

Its basic flow is:

```text
Find submission
      ↓
Set status = EVALUATING
      ↓
Run deterministic evaluator
      ↓
Run LLM evaluator
      ↓
Combine results
      ↓
Save feedback
      ↓
Set status = COMPLETED
```

If evaluation fails, the submission is marked as:

```text
FAILED
```

---

## 5. Evaluation Approach

I decided not to depend completely on an LLM for the score.

The deterministic evaluator produces the main score based on known Parking Lot requirements.

The Gemini evaluator provides more detailed qualitative feedback.

For example, the deterministic evaluator can check whether important concepts are represented, while Gemini can explain whether the responsibilities and abstractions make sense.

The final evaluation therefore uses:

```text
Deterministic checks
        +
AI qualitative feedback
        ↓
Final feedback
```

This is useful because LLD does not always have one correct solution.

The AI can help explain different design choices, while deterministic checks provide a more consistent baseline.

---

## 6. Submission and Evaluation States

Evaluation can take some time, especially when an external AI service is involved.

Instead of making the submission request wait for the complete evaluation, the submission is saved first and evaluation is started separately.

The user can then see:

```text
QUEUED
   ↓
EVALUATING
   ↓
COMPLETED
```

If something goes wrong:

```text
EVALUATING
   ↓
FAILED
```

The frontend periodically checks the submission status.

This also makes the system easier to extend later if evaluation becomes slower or is moved to a separate worker.

---

## 7. Key Trade-offs

### Deterministic score vs LLM score

**Decision:** Use the deterministic evaluator for the main score and Gemini mainly for qualitative feedback.

**Why:**

An LLM can produce different scores for similar answers. A deterministic baseline makes the score more predictable.

The disadvantage is that the deterministic evaluator is less flexible and currently understands only a limited set of requirements.

---

### Background evaluation vs waiting for evaluation

**Decision:** Save the submission first and run evaluation in the background.

**Why:**

Gemini evaluation can take time. The user should not have to keep the original HTTP request open until evaluation finishes.

The disadvantage is that the system needs submission states and the frontend needs to check the status.

---

### Simple modular monolith vs more complex architecture

**Decision:** Use a modular monolith.

**Why:**

This is an MVP and the number of users and problems is small. Separate services or distributed infrastructure would add complexity without helping the main product goal.

The code is still separated into controllers, services, models and evaluators so it can be extended later.

---

### Store feedback with the submission

**Decision:** Store the generated feedback with each submission.

**Why:**

An attempt should keep the feedback it received at the time it was evaluated. It also makes the Attempts page simple because old feedback can be retrieved using the submission.

The current prototype stores the structured feedback as a JSON string. A future version could use a separate MongoDB schema for the feedback fields.

---

## 8. Current Limitations

The current prototype has some intentional limitations:

- The problem set is small.
- The evaluator is currently focused on the Parking Lot problem.
- The deterministic evaluator uses a limited set of checks.
- Gemini feedback depends on an external API.
- There is no authentication or user account system yet.
- The practice editor currently focuses on text-based design.
- Feedback is stored as a JSON string instead of separate database fields.

These are acceptable for the MVP because the main goal is to demonstrate the LLD practice and feedback workflow.

---

## 9. Possible Extensions

The structure allows future improvements without changing the main user flow.

Possible extensions include:

- More LLD problems
- Problem-specific evaluators
- Diagram submissions
- Code submissions
- Better deterministic evaluation
- More evaluation criteria
- User accounts
- Comparison between attempts
- More detailed progress tracking

The `Evaluator` interface makes it possible to add new evaluator implementations without changing the rest of the application.
