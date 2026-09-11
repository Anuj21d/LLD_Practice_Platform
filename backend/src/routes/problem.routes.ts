import { Router } from "express";

import {
  submitSubmission,
  getSubmission,
  getSubmissions,
} from "../controllers/submissionController";
import { testEvaluation } from "../controllers/evaluationController";

const problemRouter = Router();

problemRouter.post("/submission", submitSubmission);

problemRouter.get("/submission/:submissionId", getSubmission);

problemRouter.post("/test", testEvaluation);

problemRouter.get("/attempts", getSubmissions);

export default problemRouter;
