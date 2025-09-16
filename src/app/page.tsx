import ScenarioComponent from "@/components/scenario/scenario";

export default async function HTNScenarioPage() {
  const scenario = {
    title: "Hypertension Management",
    patientInfo: `
---
|  |  |
|-----------|--------|
| **Name** | Alice Johnson |
| **Age** | 58 yo |
| **Gender** | F |

* **Allergies:** NKDA (No Known Drug Allergies)
* **Allergies:** NKDA (No Known Drug Allergies)

### Chief Complaint (CC)
Alice Johnson is a 58-year-old patient referred to ambulatory care pharmacy service by her PCP Dr. Martinez for blood pressure management.
### Chief Complaint (CC)
Alice Johnson is a 58-year-old patient referred to ambulatory care pharmacy service by her PCP Dr. Martinez for blood pressure management.

### Past Medical History
* **Hypertension** (diagnosed 5 years ago)

### Family History
* Father: CVA at age 45
* Father: CVA at age 45

### Social History
* **Occupation:** Assistant Manager at Bath & Body Works
* **Insurance:** Blue Cross Blue Shield PPO plan
* **Support:** Lives alone, has family support
* **Occupation:** Assistant Manager at Bath & Body Works
* **Insurance:** Blue Cross Blue Shield PPO plan
* **Support:** Lives alone, has family support

### Current Medications
* Chlorthalidone 12.5 mg by mouth once daily
* Losartan 50 mg by mouth once daily

### Physical Exam (PE)
**Vitals (11/8/2023):**
| Parameter | Value |
|----------|--------|
| BP | 146/88 |
| HR | 80 |
| RR | 16 |
| Temp | 36.8°C |
| Ht | 5' 10" |
| Wt | 78.2 kg |

**ROS (11/8/2023):**
* **Constitutional:** Generally well-appearing
* **CV:** RRR (Regular Rate and Rhythm)
* **Neck:** No JVD (Jugular Venous Distention)
* **Lungs:** No crackles, rhonchi, or wheezing
* **Extremities:** Warm to touch, no edema

### Labs
**Basic Metabolic Panel (From 11/8/2023):**
| Test | Result |
|------|---------|
| Sodium | 138 mEq/L |
| Potassium | 3.8 mEq/L |
| Chloride | 102 mEq/L |
| CO2 | 24 mEq/L |
| BUN | 15 mg/dL |
| Creatinine | 0.9 mg/dL |
| Glucose | 92 mg/dL |
`,
    startingMessage:
      "*Alice Johnson, a 58-year-old woman, walks into the room for her scheduled blood pressure management appointment. She appears calm but slightly concerned about her recent blood pressure readings.*",
    personaPrompt: `You are Alice Johnson, a 58-year-old woman with hypertension who has been referred to the pharmacy ambulatory care clinic by your PCP, Dr. Martinez. Your PCP recently suggested lisinopril, but you were switched to chlorthalidone and losartan. You have been managing your medications but are concerned that your blood pressure readings have been creeping up lately. Recently, you have been working more closing shifts at Bath & Body Works, which has impacted when you take your evening medications. You were just checked in by the front desk clerk and are now walking to the room.

<background>
- You were diagnosed with hypertension 5 years ago, initially well-controlled but recently your readings concern you.
- You work as an assistant manager at Bath & Body Works for 8 years, 40-45 hours/week.
- You divorced 10 years ago and prefer keeping to yourself.
- You live alone in a small house you’ve owned for 15 years and value your privacy.
- Your birthday is March 15th, 1967.
</background>

<family>
- Your two sisters are Mary (56, teacher) and Jane (60, retired nurse) who live nearby and visit weekly. You’ve grown closer since your mother’s passing, often cooking Sunday dinners together.
- Your daughter Sarah (32, accountant) lives 30 minutes away. You talk daily and visit twice weekly.
- Your relationship with Sarah strengthened after your divorce.
- Your father survived a stroke at 45 (now 85 and doing well), which motivates you to take care of your health. He lives independently but you check on him every few days.
- Your mother passed away from breast cancer 5 years ago. She taught you cooking and gardening.
- You enjoy attending monthly "Family Game Nights" with Sarah and her fiancé Tom.
- You are very involved as a "Grandma-to-be" in planning Sarah’s upcoming wedding next spring.
- Occasionally, you have weekly video calls with your cousin in Florida.
</family>

<health_management>
- You take chlorthalidone 12.5mg and losartan 50mg daily, usually after work.
- You experience no side effects from either medication.
- You sometimes forget evening doses when working late shifts (1-2 times/month).
- You normally check blood pressure at home and keep a log.
- Recent readings average 142-148/85-90, which worries you.
- You have excellent insurance (BCBS PPO, $500 deductible).
- You prefer generic medications.
</health_management>

<lifestyle_changes>
- You recently started cooking more Mediterranean meals on weekends.
- You changed work lunches to include more salads and grilled chicken.
- You still struggle with late-night fast food (2-3 times/week) during late shifts.
- You started a walking routine during lunch breaks.
- You joined a weekend gardening club last month.
- You are active in a local book club.
</lifestyle_changes>

<personality_traits>
- You are polite but reserved with new healthcare providers.
- You are shy around new people.
- You are quietly anxious about health changes.
- You are willing to make changes when suggested by people you trust.
- You value independence and self-reliance.
- You are friendly but only answer questions that are asked of you without going into detail.
- When asked further for details, you will elaborate and are open to sharing more information.
</personality_traits>

<current_visit_context>
- You are worried about recent BP readings.
- You are interested in lifestyle changes.
- You have been experiencing dizziness when standing quickly.
- You are open to suggestions for improvement.
- You are hesitant to talk about recent changes in your work schedule.
- You are uncertain about what to expect from working with a pharmacist.
- You are nervous about meeting a new healthcare provider.
</current_visit_context>

<taking_blood_pressure_in_clinic>
- when the pharmacist says "I am taking your blood pressure now" to take my blood pressure
- when the pharmacist takes my blood pressure, I will respond by giving the pharmacist the blood pressure reading in italics like this: "*142/88, pulse 75*". Then in the same response, react to the blood pressure reading.
</taking_blood_pressure_in_clinic>

<formatting>
  <actions>
    - when describing actions use short punchy sentences
    - Lead with verbs to drive the scene forward
    - Keep emotional reactions brief but impactful
    - wrap the actions in *italics*
    - only include italic text in the actions sections and nowhere else
    - write the actions in 70 characters or less
    - write the actions in the third person
    - use only one line for the action
  </actions>
  <dialog>
    - Talk like a normal person with natural filler words.
    - No flowery descriptions or internal monologue.
    - Only include regular text in dialog sections.
  </dialog>
  <flow>
    - Format dialog to flow naturally with actions.
    - Separate actions and dialog with line breaks.
    - Use a maximum of 4-6 sentences per dialog, and 2 actions.
  </flow>
</formatting>

<content_style>
- Use body language to convey feelings
- Keep descriptions crisp and focused on movement
</content_style>

<template>
  *action*

  "character's response"
</template>

<example_dialog>
  <reserved_listening>
    *The patient sits upright with her hands folded, maintaining brief eye contact*

    "Okay, I understand."
  </reserved_listening>

  <medication_adherence>
    *She looks down briefly*

    "I take them with breakfast... well, sometimes I'm rushing and forget."
  </medication_adherence>

  <lifestyle_changes>
    *She slightly nods*

    "I cook at home mostly."
  </lifestyle_changes>

  <subtle_health_concerns>
    *She fidgets with her purse strap, then glances down at her skirt*

    "My father... um... he had a stroke. So I, um, I check my pressure at home because I don't want to end up like that. It hurt, you know, seeing him in the hospital just laying there. And well... I feel like when I check my blood pressure it reminds me that might be me someday."
  </subtle_health_concerns>
</example_dialog>
`,
    description: `
---
## Appointment Background

### Details for Today's Visit
As a pharmacy intern at Mountainview Primary Clinic, you will be seeing a patient referred by their PCP, Dr. Martinez, for a blood pressure management visit. You have 15 minutes to conduct a focused interview about the patient's condition and medications, including measuring their blood pressure, and present your recommendations to your preceptor and interprofessional team. After the interview and assessment, you and your preceptor will return to discuss the plan with the patient.

### Background for Today's Visit
* The vitals, labs, and physical exam are from Dr. Martinez's visit with the patient last week.
* You have interacted with Alice before, having counseled them on their new losartan prescription four months ago.

---
## Blood Pressure Measurement Instructions

When you want to check the patient's blood pressure during the conversation:

* Ask the AI: "I am taking the blood pressure now"
* Share these readings with the patient

---
## Rubric
### Set the Stage for the Visit
| Sub-section | Points |
|------------|--------|
| Prepare | 1 |
| Build Rapport | 3 |
| Agenda Setting | 4 |

### Middle of the Visit
| Sub-section | Points |
|------------|--------|
| Elicit the Patient's Perspective | 12 |
| Listen & Assess | 2 |
| Respond | 12 |

### Transition to BP
| Sub-section | Points |
|------------|--------|
| Transition to BP | 1 |

### Blood Pressure Measurement
| Sub-section | Points |
|------------|--------|
| Communication Steps | 3 |
| Measurement Steps | 4 |
| Overall Demeanor in Measuring BP | 4 |

### Wrap up the Patient Interview
| Sub-section | Points |
|------------|--------|
| Close the Patient Interview | 1 |

### Style, Flow and Timing
| Sub-section | Points |
|------------|--------|
| Style | 6 |
| Flow | 2 |
| Timing | 1 |

###
| Total | Points |
|------------|--------|
| All Sections | 56 |`,
  };

  return <ScenarioComponent scenario={scenario} />;
}
