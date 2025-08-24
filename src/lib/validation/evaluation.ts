/**
 * @fileoverview Evaluation validation schemas for student assessments
 *
 * This file defines Zod schemas for validating evaluation and scoring data
 * in the student assessment system. Used in the patient simulator page to
 * produce feedback for the student's interactions with the patient.
 *
 * @author LeetCare Development Team
 */
import { z } from "zod";

/**
 * defines individual tasks within a section
 */
const evaluationTaskSchema = z.object({
  title: z.string().describe("Task title or name"),
  score: z.number().describe("Points scored for this task"),
  totalPoints: z.number().describe("Maximum possible points for this task"),
  feedbackItems: z
    .array(z.string())
    .describe("Feedback comments for this task made by the AI"),
});

/**
 * defines a section of the rubric
 */
const evaluationSectionSchema = z.object({
  title: z.string().describe("Section title"),
  description: z.string().optional().describe("Optional section description"),
  tasks: z.array(evaluationTaskSchema).describe("Tasks within this section"),
});

/**
 * Complete evaluation schema for student assessments
 *
 * @see {@link https://zod.dev/basics} Zod documentation
 */
export const evaluationSchema = z.object({
  sections: z
    .array(evaluationSectionSchema)
    .describe("Evaluation sections containing tasks"),
  overallScore: z
    .number()
    .optional()
    .describe("Overall score across all sections"),
  totalPossibleScore: z
    .number()
    .optional()
    .describe("Total possible points for evaluation"),
  summary: z.array(z.string()).optional().describe("Summary feedback comments"),
});
export type EvaluationSchema = z.infer<typeof evaluationSchema>;
