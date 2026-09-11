export type EvaluationCriterion = {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
};

export type EvaluationResult = {
  score: number;
  summary: string;
  criteria: EvaluationCriterion[];
  strengths: string[];
  improvements: string[];
  nextStep: string;
};

export interface Evaluator {
  evaluate(solution: string): Promise<EvaluationResult>;
}