import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  problemId: string;
  solution: string;
  status: "QUEUED" | "EVALUATING" | "COMPLETED" | "FAILED";
  score?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    problemId: {
      type: String,
      required: true,
    },

    solution: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["QUEUED", "EVALUATING", "COMPLETED", "FAILED"],
      default: "QUEUED",
    },

    score: {
      type: Number,
    },

    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Submission = mongoose.model<ISubmission>("Submission", submissionSchema);

export default Submission;
