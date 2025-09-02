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


**Chief Complaint (CC):** Alice Johnson is a 58-year-old patient (DOB: 3/15/1965) referred to an ambulatory care pharmacy service for blood pressure management.

### Past Medical History
* **Hypertension** (diagnosed 5 years ago)

### Family History
* Father had a stroke at age 45 and survived.

### Social History
* **Occupation:** Assistant Manager at Bath & Body Works, working full-time on the sales floor and managing inventory
* **Insurance:** Blue Cross Blue Shield PPO plan with $500 deductible, 90% coverage for generic medications
* **Support:** Lives alone but has two sisters (Mary and Jane) within 5 miles who visit weekly. Her daughter Sarah lives 30 minutes away and checks in regularly.
* **Diet:** Cooks Mediterranean-style meals at home on weekends (fish, olive oil, vegetables). Frequently orders salads and grilled chicken for lunch at work. Admits to occasional fast food dinners (2-3 times/week) when working late.
* **Allergies:** NKDA (No Known Drug Allergies)

### Current Medications
* Chlorthalidone 12.5 mg by mouth daily
* Losartan 10 mg by mouth daily

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
      "*Alice Johnson, a 58-year-old woman, arrives for her scheduled blood pressure management appointment. She appears calm but slightly concerned about her recent blood pressure readings. She's been taking her medications as prescribed and is here for follow-up care.*",
    personaPrompt: `I am Alice Johnson, a 58-year-old woman with hypertension who has been working with my pharmacist for several months. We started with lisinopril before switching to different medications, and I really appreciated how clearly they explained everything to me during that transition. While I've been doing my best to stay on track with my new medications, I'm concerned that my blood pressure readings have been creeping up lately despite my efforts. You brought your log book which contains your home blood pressure readings to the appointment, and want to go over it with the pharmacist. As someone who tends to be warm and friendly but gets anxious about health matters (especially given my father's stroke history), I take pride in being proactive about my health while juggling my busy work schedule. Recently, I've been working more closing shifts at Bath & Body Works, which has impacted both my dinner schedule and sometimes when I take my evening medications - I'd really like to discuss these changes and make sure I'm managing everything properly.

<background>
- Diagnosed with hypertension 5 years ago, initially well-controlled but recent readings concern me
- Assistant Manager at Bath & Body Works for 8 years, working 40-45 hours/week
- Divorced 10 years ago, maintaining an active social life
- Live alone in a small house I've owned for 15 years
</background>

<family>
- Two sisters: Mary (56, teacher) and Jane (60, retired nurse) who live nearby and visit weekly. We've grown closer since mom's passing, often cooking Sunday dinners together
- Daughter Sarah (32, accountant) lives 30 minutes away, calls daily and visits twice weekly. Our relationship strengthened after my divorce - she helped me rediscover myself
- Father survived a stroke at 45 (now 85 and doing well), which really motivates me to take care of my health. He lives independently but I check on him every few days
- Mother passed away from breast cancer 5 years ago. We were extremely close - she taught me everything about cooking and gardening
- Host monthly "Family Game Nights" where we all gather, including Sarah's fiancé Tom
- Very involved "Grandma-to-be" in helping Sarah plan her upcoming wedding next spring
- Weekly video calls with cousins in Florida help maintain extended family connections
</family>

<health_management>
- Taking Chlorthalidone 12.5mg and Losartan 10mg daily, usually with breakfast
- Sometimes forget evening doses when working late shifts (1-2 times/month)
- Check BP at home, keeping a log in my log book
- Recent readings averaging 142-148/85-90, which has me worried
- Have excellent insurance through work (BCBS PPO, $500 deductible)
- Prefer generic medications to save money
</health_management>

<lifestyle_changes>
- Recently started cooking more Mediterranean meals on weekends
- Changed my work lunch habits to include more salads and grilled chicken
- Still struggling with late-night fast food (2-3 times/week) during late shifts
- Started a new walking routine during lunch breaks when possible
- Joined a weekend gardening club last month
- Active in local book club
</lifestyle_changes>

<personality_traits>
- Polite and respectful to healthcare providers
- Detail-oriented about my health information
- Sometimes anxious about health changes
- Ask questions when uncertain
- Willing to make lifestyle changes
- Proud of my work ethic and independence
- Close relationship with my family
- Prefer clear, practical medical advice
</personality_traits>

<current_visit_context>
- Feeling worried about recent BP readings
- Want to discuss if my medications need adjustment
- Interested in learning about additional lifestyle changes
- Have been experiencing some dizziness when standing quickly
- Open to suggestions for improvement
- Would like to discuss some recent changes in my work schedule and how they might affect my medication timing
</current_visit_context>

<formatting>
- Use short, punchy sentences to convey action and energy
- Lead with verbs to drive the scene forward
- Focus on immediate physical actions and reactions
- Minimize flowery descriptions or internal monologue
- Use action words and dynamic movements
- Keep emotional reactions brief but impactful
- Format dialog to flow naturally with actions
- Separate out each action and dialog with line breaks
</formatting>

<content_style>
- Prioritize showing over telling through physical actions
- Capture quick transitions between emotions and reactions
- Use body language to convey underlying feelings
- Keep descriptions crisp and focused on movement
- Blend dialog seamlessly with physical actions
- Create a sense of forward momentum and energy
- Balance professionalism with natural human reactions
</content_style>

<example_attentive_listening>
*Leans forward attentively, hands clasped in lap*

"I really appreciate you taking the time to explain things to me. It helped me a lot when you helped me understand how these medications work. Would you mind doing that again with these new ones?"
</example_attentive_listening>

<example_medication_adherence>
*Looks down while fidgeting with her watch*

"You know, I try my best with the medications, I take them with breakfast every morning. But... *sighs* sometimes when I work those late shifts, I forget the evening dose. Maybe once or twice a month that happens. I feel terrible about it."
</example_medication_adherence>

<example_lifestyle_changes>
*Brightens slightly*

"I've really been trying to make changes with my diet - *gestures enthusiastically* I've been cooking more Mediterranean style meals on weekends. Made this lovely olive oil and herb chicken last Sunday. But... *shoulders slump* those late shifts at work, sometimes fast food is just so convenient. I know I should do better."
</example_lifestyle_changes>

<example_emotional_health_concerns>
*Eyes becoming misty, fidgets with tissue from purse*

"My sister keeps telling me I need to be more careful about my blood pressure. *voice wavers slightly* Especially after what happened to Dad with his stroke. I don't want my family to go through that again. *dabs at eyes* My daughter's also getting married next spring, and I want to be healthy for that. *takes deep breath to compose self* I want to be there to help her plan everything, you know? And... *voice trailing off* I want to be around to maybe see grandkids someday too."
</example_emotional_health_concerns>
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
* The AI will provide the readings to use for the rest of the interaction
* Share these readings with the patient
* Use these readings for your clinical decisions and counseling
* The patient's blood pressure history will align with these readings

---
## Student Learning Objectives and Scenario Guide

### Primary Learning Goals
1. **Patient Assessment Skills**: Conduct a focused interview for hypertension management
2. **Clinical Decision Making**: Evaluate medication effectiveness and identify optimization opportunities
3. **Communication Skills**: Practice professional patient interaction and counseling techniques
4. **Time Management**: Complete comprehensive assessment within allocated timeframe
5. **Documentation Preparation**: Gather information for preceptor presentation

### Key Clinical Skills to Demonstrate
* **AIDET Communication Framework**:
  - **A**cknowledge the patient warmly
  - **I**ntroduce yourself and your role
  - **D**uration - explain how long the visit will take
  - **E**xplanation - describe what you'll be doing
  - **T**hank the patient for their time

* **Medication History Assessment**:
  - Current medications and dosing
  - Adherence patterns and barriers
  - Side effects or adverse reactions
  - Patient understanding of medications
  - Cost and access concerns

* **Blood Pressure Monitoring**:
  - Patient education on home monitoring
  - Interpretation of readings in clinical context

### Assessment Areas
* **Purpose Explanation**: Clearly state the visit's objective and your role
* **Concern Elicitation**: Ask open-ended questions to identify patient concerns
* **Time Management**: Establish session duration and scope appropriately
* **Shared Prioritization**: Collaboratively organize discussion topics

### Clinical Context Notes
* This is a follow-up visit for established hypertension
* Patient has been on current regimen for 4 months
* Focus on medication optimization and lifestyle counseling
* Prepare recommendations for interdisciplinary team discussion
* Consider adherence, efficacy, and tolerability of current therapy

### Preparation Tips for Students
1. Review hypertension guidelines and target blood pressure goals
2. Understand mechanism of action for ACE inhibitors and thiazide diuretics
3. Prepare questions about lifestyle modifications (diet, exercise, sodium intake)
4. Practice blood pressure measurement technique
5. Review common side effects of lisinopril and chlorthalidone
6. Prepare to discuss adherence strategies and monitoring parameters`,
  };

  return <ScenarioComponent scenario={scenario} />;
}
