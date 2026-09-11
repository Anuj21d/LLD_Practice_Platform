# AI_USAGE.md

## How I Used AI

I used AI as a development helper while building this project. I did not use it to generate the whole project and submit it without checking it. I used it mainly when I was stuck, when I needed an explanation, or when I wanted to compare different implementation choices.

### 1. Deterministic evaluator + LLM feedback

**What AI suggested:**  
Use a combination of normal code-based checks and an LLM instead of depending completely on an LLM.

**What I did:**  
I accepted this approach.

The `ParkingLotEvaluator` handles the objective checks, while Gemini handles the more descriptive feedback.

**Why:**  
I wanted the evaluation to have some predictable behaviour but still give feedback that is useful to a learner.

---

### 2. Letting the LLM decide the final score

**What AI suggested:**  
The LLM could produce the score along with the feedback.

**What I changed:**  
I did not use the LLM score as the final score.

The deterministic evaluator's score is stored as the submission score, while the LLM result is used for the summary, strengths, improvements, and next step.

**Why:**  
LLM responses can vary. For this prototype, I felt that keeping the score deterministic was easier to understand and test.

---

### 3. Evaluator interface

**What AI suggested:**  
Create an `Evaluator` interface so that different evaluation methods can follow the same structure.

**What I did:**  
I accepted this and created:

```text
Evaluator
   |
   +-- ParkingLotEvaluator
   |
   +-- LLMEvaluator
```

Both evaluators expose an `evaluate()` method.

**Why:**  
It keeps the evaluation code separate from the submission flow and makes it easier to add another evaluator later.

---

### 4. Background evaluation

**What AI suggested:**  
Do not make the submission request wait for the full Gemini evaluation. Save the submission first and run evaluation afterwards.

**What I did:**  
I accepted this for the prototype.

After a submission is created, its status starts as `QUEUED`. The backend then starts the evaluation and changes the status to `EVALUATING`, `COMPLETED`, or `FAILED`.

**Why:**  
LLM evaluation can take some time. I wanted the submit action to return quickly and let the frontend show the evaluation status.

---

### 5. Polling for evaluation status

**What AI suggested:**  
The frontend can periodically request the submission status while evaluation is running.

**What I did:**  
I used a simple polling approach with Axios and a two-second interval.

**Why:**  
For a small MVP, this was easier to implement than introducing WebSockets or another real-time system. If the application became larger, I would consider a more suitable background/event-based solution.
