# LLD Practice Platform

A small web application for practicing Low-Level Design (LLD) problems.

The application allows a learner to:

- Select an LLD problem
- Read the problem requirements
- Write a design solution
- Submit the solution
- Wait while it is evaluated
- Receive feedback
- View previous attempts
- Try the problem again

The current prototype uses a **Parking Lot** problem as the main example.

---

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- Tailwind CSS utility classes

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

### Evaluation

- Deterministic evaluator
- Google Gemini API

### Testing

- Vitest

---

## Project Structure

```text
LLD-Practice-Platform/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── data/
│       └── pages/
│
├── backend/
│   ├── server.ts
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── evaluators/
│       ├── models/
│       ├── routes/
│       └── services/
│
├── research-note.md
├── design-note.md
├── README.md
├── AI_USAGE.md
└── .gitignore
```

---

# How to Run the Project

## 1. Requirements

Install the following before running the project:

- Node.js
- npm
- MongoDB

You also need a Google Gemini API key for AI evaluation.

---

## 2. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd LLD-Practice-Platform
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with the actual GitHub repository URL.

---

# Backend Setup

Open a terminal and go to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```text
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/lld-practice
GEMINI_API_KEY=your_api_key_here
```

Do not commit the `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

You can check the API with:

```text
http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "LLD Practice Platform API is running"
}
```

---

# Frontend Setup

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the URL shown by Vite in the terminal, usually:

```text
http://localhost:5173
```

---

# Application Flow

The main flow is:

```text
Problems
    ↓
Problem Details
    ↓
Start Practice
    ↓
Write Solution
    ↓
Submit
    ↓
QUEUED
    ↓
EVALUATING
    ↓
COMPLETED
    ↓
Feedback
    ↓
Try Again
    ↓
My Attempts
```

---

# How Evaluation Works

When a learner submits a solution, the backend creates a submission in MongoDB.

The submission starts with:

```text
QUEUED
```

The evaluation service then changes it to:

```text
EVALUATING
```

Two evaluators are used.

## 1. Deterministic Evaluator

The deterministic evaluator checks important Parking Lot requirements.

It currently checks areas such as:

- Parking Lot domain model
- Vehicle classification
- Allocation strategy
- Pricing strategy
- Ticket lifecycle
- Concurrency considerations

It produces the main score.

## 2. Gemini Evaluator

Gemini is used to provide qualitative feedback.

It looks at areas such as:

- Domain modelling
- SOLID principles
- Responsibility separation
- Strategy pattern
- Ticket lifecycle
- Concurrency
- Extensibility
- Design trade-offs

Gemini provides the explanation, strengths, improvements and recommended next step.

The two results are then combined and saved with the submission.

---

# Submission Status

A submission can have one of these statuses:

```text
QUEUED
EVALUATING
COMPLETED
FAILED
```

The frontend checks the status while evaluation is running.

When the status becomes `COMPLETED`, the user is taken to the feedback page.

---

# API Endpoints

## Health Check

```http
GET /api/health
```

## Create Submission

```http
POST /api/submissions
```

Request:

```json
{
  "problemId": "parking-lot",
  "solution": "My LLD solution..."
}
```

## Get All Submissions

```http
GET /api/submissions
```

This is used by the Attempts page.

## Get One Submission

```http
GET /api/submissions/:submissionId
```

This is used to check submission status and retrieve feedback.

---

# Example Solution

You can test the application with a simple Parking Lot design such as:

```text
ParkingLot manages parking spots.

Vehicle is the base class.
Car, Motorcycle and Truck extend Vehicle.

ParkingLot uses AllocationStrategy
to find a suitable parking spot.

Ticket is created when a vehicle enters.

PricingStrategy calculates the parking fee.

A lock is used to prevent two vehicles
from claiming the same parking spot.
```

Submit this from the Practice page and wait for the evaluation to finish.

---

# Testing

The project uses Vitest for tests.

Run tests from the backend:

```bash
npm test
```

If the test script is not available yet, the test command will be added as part of the test setup.

The important test areas are expected to include:

- Deterministic evaluator behaviour
- Valid submission
- Invalid submission
- Empty solution
- Missing problem ID
- Submission not found
- Evaluation failure

---

# Environment Variables

The backend requires:

```env
MONGO_URI=
GEMINI_API_KEY=
```

These values should be kept private.

Never commit:

```text
.env
```

to GitHub.

The repository should contain a `.gitignore` entry such as:

```gitignore
.env
node_modules/
dist/
```

---

# Design Decisions

## Deterministic + AI Evaluation

The main score comes from deterministic checks while Gemini provides qualitative feedback.

This was chosen because an LLM-only score can be less consistent, while deterministic checks alone cannot explain design trade-offs very well.

## Background Evaluation

The submission is saved first and evaluation happens separately.

This prevents the submission request from waiting for the complete Gemini evaluation.

## Modular Monolith

The project uses a simple modular monolith instead of multiple services.

This keeps the MVP easier to develop and understand while still separating controllers, services, models and evaluators.

## Evaluator Interface

The evaluator follows a common interface:

```ts
interface Evaluator {
  evaluate(solution: string): Promise<EvaluationResult>;
}
```

This makes it easier to add other evaluators later.

---

# Current Limitations

The current prototype has some limitations:

- Only a small number of LLD problems are included.
- The deterministic evaluator is currently focused on Parking Lot.
- The deterministic checks are intentionally simple.
- Gemini evaluation requires an API key and an internet connection.
- There is no authentication system.
- The practice editor currently focuses on text-based designs.
- Feedback is currently stored as a JSON string inside the submission document.

These limitations are acceptable for the current MVP.

---

# Future Improvements

Possible future improvements include:

- More LLD problems
- Problem-specific evaluators
- Diagram submissions
- Code submissions
- Better deterministic evaluation
- User accounts
- Comparing different attempts
- More detailed learner progress
- More evaluation criteria

---

# Project Documentation

Additional project documentation:

- `research-note.md` — research and product direction
- `design-note.md` — MVP architecture, evaluation approach and trade-offs
- `AI_USAGE.md` — AI-assisted decisions made during development

