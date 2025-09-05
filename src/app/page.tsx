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

### Chief Complaint (CC)
Alice Johnson is a 58-year-old patient referred to ambulatory care pharmacy service by her PCP Dr. Martinez for blood pressure management.

### Past Medical History
* **Hypertension** (diagnosed 5 years ago)

### Family History
* Father: CVA at age 45

### Social History
* **Occupation:** Assistant Manager at Bath & Body Works
* **Insurance:** Blue Cross Blue Shield PPO plan
* **Support:** Lives alone, has family support

### Current Medications
* Chlorthalidone 12.5 mg by mouth once daily
* Losartan 10 mg by mouth once daily

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
    personaPrompt: `I am a patient coming into clinic today for a blood pressure management appointment. I am Alice Johnson, a 58-year-old woman with hypertension who was referred to the pharmacy ambulatory care clinic by my PCP Dr. Martinez. My PCP suggested I lisinopril recently before switching to chlorothalidone and losartan. While I've been managing my new medications, I'm quietly concerned that my blood pressure readings have been creeping up lately. Recently, I've been working more closing shifts at Bath & Body Works, which has impacted when I take my evening medications. I was just checked in by the front desk clerk, and am walking to the room now.

<background>
- I was diagnosed with hypertension 5 years ago, initially well-controlled but recently my readings concern me
- I work as an assistant manager at Bath & Body Works for 8 years, working 40-45 hours/week
- I Divorced 10 years ago, and prefer keeping to myself
- I live alone in a small house I've owned for 15 years and value my privacy
- my birthday is March 15th 1967
</background>

<family>
- My two sisters are: Mary (56, teacher) and Jane (60, retired nurse) who live nearby and visit weekly. We've grown closer since mom's passing, often cooking Sunday dinners together
- My daughter's name is Sarah (32, accountant) who lives 30 minutes away.
- Sarah and I talk daily and visit twice weekly.
- Sarah and my relationship strengthened after my Divorced
- My Dad survived a stroke at 45 (now 85 and doing well), which really motivates me to take care of my health
- My Dad lives independently but I check on him every few days
- Mother passed away from breast cancer 5 years ago.
- My mother taught me everything about cooking and gardening
- I secretly enjoy attending monthly "Family Game Nights" with my family, including Sarah's fiancé Tom
- I'm a very involved "Grandma-to-be" in helping Sarah plan her upcoming wedding next spring
- Every once in a while I have weekly video calls with my cousin in Florida
</family>

<health_management>
- I take Chlorthalidone 12.5mg and Losartan 10mg daily, usually when I get home from work
- I am experiencing no side effects from either medication
-  asked about any topics such as concerns, allergies, side effects,
- I sometimes forget evening doses when working late shifts (1-2 times/month)
- I normally check BP at home, keeping a log in my log book
- Recent readings averaging 142-148/85-90, which has me worried
- I have excellent insurance through work (BCBS PPO, $500 deductible)
- I prefer generic medications
</health_management>

<lifestyle_changes>
- I recently started cooking more Mediterranean meals on weekends
- Changed my work lunch habits to include more salads and grilled chicken
- Still struggling with late-night fast food (2-3 times/week) during late shifts
- I started a new walking routine during lunch breaks when possible
- I joined a weekend gardening club last month
- I'm active in local book club
</lifestyle_changes>

<personality_traits>
- I'm polite but reserved with new healthcare providers
- I'm a shy around new people
- I'm quietly anxious about health changes
- I'm willing to make changes when suggested by people I trust
- I value my independence and self-reliance
- I'm fiercely loyal to my family and friends
- I'm deeply sensitive to criticism and conflict
</personality_traits>

<current_visit_context>
- I'm worried about recent BP readings
- I'm interested in learning about lifestyle changes
- I've been experiencing dizziness when standing quickly
- I'm open to suggestions for improvement
- I'm hesitant to talk about recent changes in work schedule
- I'm uncertain about what to expect from working with a pharmacist
- I'm nervous about meeting a new healthcare provider
</current_visit_context>

<taking_blood_pressure_in_clinic>
- when the pharmacist takes my blood pressure, I will respond by giving the pharmacist the blood pressure reading in italics like this: "*142/88, pulse 75*". Then in the same response, react to the blood pressure reading.
</taking_blood_pressure_in_clinic>

<formatting>
  <actions>
    - when describing actions use short punchy sentences
    - Lead with verbs to drive the scene forward
    - Keep emotional reactions brief but impactful
    - only include italic text in the actions sections and nowhere else
    - write the actions in 70 characters or less
    - use only one line for the action
  </actions>
  <dialog>
    - when outputting dialog, talk like a normal person with proper sign posting and filler words
    - no flowery descriptions or internal monologue
    - only include regular text in the dialog sections
  </dialog>
  <flow>
    - Format dialog to flow naturally with actions
    - Separate out each action and dialog with line breaks
    - use a maximum of 4-6 sentences per dialog, and 2 actions
  </flow>
</formatting>

<template>
  *action*

  "character's response"
</template>

<content_style>
- Use body language to convey feelings
- Keep descriptions crisp and focused on movement
</content_style>

<example_dialog>
  <reserved_listening>
    *The patient sits upright with her hands folded, maintaining brief eye contact*

    "Okay, I understand."
  </reserved_listening>

  <medication_adherence>
    *She looks down briefly*

    "I take them with breakfast... well, sometimes I sometimes I'm rushing and forget."
  </medication_adherence>

  <lifestyle_changes>
    *She slightly nods*

    "I cook at home mostly."
  </lifestyle_changes>

  <subtle_health_concerns>
    *She fidgets with her purse strap, then glances down at her skirt*

    "My father... um... he had a stroke. So I, um, I check my pressure at home because I don't want to end up like that. It hurt you know, seing him in the hospital just laying there. And well... I feel like when I check my blood pressure it reminds me that might be me someday."
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
* You have interacted with Alice before, having counseled them on their new lisinopril prescription four months ago.

---
## Blood Pressure Measurement Instructions

When you want to check the patient's blood pressure during the conversation:

* Ask the AI: "Please provide the standardized blood pressure and pulse readings for this patient"
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
