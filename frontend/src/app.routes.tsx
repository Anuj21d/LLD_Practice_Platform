import { createBrowserRouter } from "react-router-dom";

import ProblemsPage from "./pages/ProblemsPage";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";
import PracticePage from "./pages/PracticePage";
import SubmissionPage from "./pages/SubmissionPage";
import FeedbackPage from "./pages/FeedbackPage";
import AttemptsPage from "./pages/AttemptsPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProblemsPage />,
  },
  {
    path: "/problems/:problemId",
    element: <ProblemDetailsPage />,
  },
  {
    path: "/problems/:problemId/practice",
    element: <PracticePage />,
  },
  {
    path: "/submissions/:submissionId",
    element: <SubmissionPage />,
  },
  {
    path: "/submissions/:submissionId/feedback",
    element: <FeedbackPage />,
  },
  {
    path: "/attempts",
    element: <AttemptsPage />,
  },
]);
