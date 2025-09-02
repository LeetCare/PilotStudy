import { tool } from "ai";
import { z } from "zod";

// Generate random blood pressure reading between specified ranges
export function generateRandomBP(): {
  systolic: number;
  diastolic: number;
  timestamp: string;
  reading: string;
} {
  console.log("Taking blood pressure...");
  // Generate systolic between 140-150
  const systolic = Math.floor(Math.random() * (150 - 140 + 1)) + 140;

  // Generate diastolic between 70-80
  const diastolic = Math.floor(Math.random() * (80 - 70 + 1)) + 70;

  const timestamp = new Date().toISOString();
  const reading = `${systolic}/${diastolic} mmHg`;

  return {
    systolic,
    diastolic,
    timestamp,
    reading,
  };
}

// Tool definition for taking blood pressure
export const takeBP = tool({
  description:
    "Allows the pharmacist to take a manual blood pressure reading on you. After calling this tool, displays the Blood Pressure reading in *italics* text, describing what happened to you in your perspective in *italics*.",
  parameters: z.null(),
  execute: async () => {
    return generateRandomBP();
  },
});
