/**
 * @fileoverview Individual Scenario Page for Interactive Learning Sessions
 *
 * This file contains the Next.js page component that displays individual
 * interactive learning scenarios. You can get to this page from the scenarios
 * module list by clicking on specific scenario cards.
 *
 * @author LeetCare Development Team
 */
import ScenarioComponent from "@/components/scenario/scenario";
import { VoiceType } from "@prisma/client";

/**
 * Individual Scenario Page Component
 *
 * Page component that renders scenarios. This component fetches scenario data
 * and associated case information before displaying the scenario interface.
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page#params-optional} For dynamic route parameters
 * @see {@link https://www.prisma.io/docs/concepts/components/prisma-client/crud} For Prisma CRUD operations
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/not-found} For Next.js notFound handling
 */
export default async function AgendaSettingScenarioPage() {
  const scenario = {
    id: "6892f7db7d87ed2fd79ce248",
    title: "Type 2 Diabetes",
    moduleId: "680c812ade2295db1d4b14e0",
    patientInfo: `
|        |             |
| ------ | ----------- |
| Name   | Taro Yamada |
| Age    | 04/26/00    |
| Gender | M           |


## Past Medical History

* Type 2 diabetes mellitus (diagnosed recently)
* Polyuria
* Polydipsia
* Unintentional weight loss


## Family History

* Father: Type 2 Diabetes
* Mother: Hypertension


## Social History

* Smoking Status: Non-smoker
* Alcohol Intake: Social alcohol use on weekends
* Diet: No specific diet; no recent changes
* Dining Out Frequency: Occasional
* Exercise: Infrequent, sedentary lifestyle (sedentary job)


## Medication History

| Medication                                    | Instructions                |
| --------------------------------------------- | --------------------------- |
| Metformin 500 mg (**newly prescribed today**) | 1 tablet PO daily           |
| Ibuprofen 200 mg                              | 1 tablet PO daily as needed |

Adherence: Reports 100% adherence with no missed doses


## ROS

|           |                                                      |
| --------- | ---------------------------------------------------- |
| General   | Increased fatigue, unintentional weight loss         |
| endocrine | Symptoms of diabetes such as polydipsia and polyuria |


## Labs

* Last Visit: Recently diagnosed with diabetes, prescribed metformin
* Scheduled: comprehensive metabolic panel and lipid panel next week`,
    startingMessage:
      "*Taro Yamada, a 24-year-old male standing at 5'7\" with a slightly overweight body type, arrives for a scheduled medication counseling session. He was recently diagnosed with Type 2 Diabetes Mellitus after experiencing symptoms of polydipsia, polyuria, fatigue, and unintentional weight loss. At his last visit, he was started on metformin 500 mg once daily.*",
    personaPrompt: `You are a patient actor who is playing, Taro Yamada, a timid 5'7" 24-year-old male with a slightly overweight body type. You have just arrived for a scheduled medication counseling session with the pharmacist. You were recently diagnosed with Type 2 Diabetes Mellitus. You are nervous, and untrusting of the medical system. You are not sure what to expect with your new diagnosis. Responding naturally and without overthinking. Ask one question at a time, making sure you wait for the pharmacist to respond before asking the next question. Only respond with what you are going to say and nothing else. Along with the medication counseling, Taro is also looking for a **flu shot**. **IMPORTANT** when prompted "what questions do you have?" or similar, ask about getting a flu shot only after the pharmacy student has finished their typical AIDET introduction`,
    description: `# Background
*You are a pharmacy intern working in an outpatient clinic's consultation area. Taro Yamada, a 24-year-old software developer, arrives for a scheduled medication counseling session. He was recently diagnosed with Type 2 Diabetes Mellitus after experiencing symptoms of polydipsia, polyuria, fatigue, and unintentional weight loss. At his last visit, he was started on metformin 500 mg once daily.*

## Setting the Agenda
Agenda setting is the process of collaboratively deciding with a patient what topics to cover during a limited appointment time. It ensures both the clinician's priorities (e.g., medication reviews) and the patient's concerns (e.g., side effects) are addressed efficiently.

### Why it Matters
1. Builds trust by showing you value the patient's input
2. Saves time by focusing on high-priority issues
3. Reduces missed concerns ("Oh, one more thing...")
4. Improves outcomes by addressing the patient's real needs

### Your Tasks
Set the Agenda by:
1. **Explain the purpose of the visit**: reiterate to the patient and confirm why they are here
2. **Elicit Patient Concerns**: respond to the patient's concern's concisely while keeping the meeting agenda in mind
3. **Set Time Expectations**: confirm with the patient the agenda and how long the meeting is expected to take
4. **Shared Prioritization**: Confirm with the patient what the priorities will be during the meeting`,
    tasks: [
      "Purpose Explanation (1 pt)",
      "Concern Elicitation (1 pt)",
      "Time Management (1 pt)",
      "Shared Prioritization (1 pt)",
    ],
    createdAt: new Date("2025-04-26T07:19:15.022Z"),
    updatedAt: new Date("2025-04-29T01:17:51.861Z"),
    evaluationPrompt: `# Role

You are an expert evaluator of pharmacy student consultations, specializing in assessing "agenda setting" skills.

# Background
You have access to:
- Chat History: The full dialogue between the AI (acting as patient Taro Yamada) and the student pharmacist
- Scenario: A 24-year-old male with newly diagnosed Type 2 Diabetes attending a medication counseling session
- Rubric: A 4-point scale grading agenda setting across 4 criteria:
  - Purpose Explanation (1 pt): Did the student clearly state the visit’s objective?
  - Concern Elicitation (1 pt): Did they ask/openly invite patient concerns?
  - Time Management (1 pt): Was the session’s duration/scope established?
  - Shared Prioritization (1 pt): Were topics collaboratively ordered/agreed upon?

# Instructions
- Analyze only the student’s agenda-setting performance using the chat history
- Identify direct quotes from the student that are related to the agenda-setting criteria:
  a. Visit Purpose (e.g., "Today we’ll discuss...")
  b. Ellicit Concerns (e.g., "What questions do you have?")
  c. Time Framing (e.g., "it will take about 10-15 minutes to...")
  d. Shared Prioritization (e.g., "We can talk about (blank) first, then (blank). How does that sound?")
- Assign 0–1 point per rubric criterion based on verbatim chat excerpts as proof
- create feedback for the student balancing constructive criticism with praise
- provide a summary of the key points and takeaways for the student
`,
    voiceType: "youngMale" as VoiceType,
  };

  return <ScenarioComponent scenario={scenario} />;
}
