# Product Requirements Document

## "Tummy Talk" — Paediatric GI Symptom Companion

**Version:** 0.1 (Draft)
**Status:** Concept / competition submission
**Scope note:** This document describes a prototype built for educational and competition purposes only. It is not a certified medical device, has not undergone clinical validation, and is not intended for use in patient care in its current form.

---

## 1. Problem

Paediatric gastrointestinal history-taking is slow, low-yield, and unpleasant for everyone involved.

Ward rounds move fast. A registrar has a handful of minutes per bed and must reconstruct several days of symptom history from a tired child and an anxious parent. Children in the 5–12 range under-report symptoms for predictable reasons: they lack the vocabulary for interoceptive experience, they are embarrassed by GI topics specifically (soiling, toileting, flatulence), they defer to whatever the adult in the room seems to want to hear, and they disengage when questioned by an unfamiliar adult in a white coat.

The result is a history that is thin, second-hand, and reconstructed largely from the parent. Meanwhile the round has consumed ten minutes it didn't have.

### The opportunity

The waiting time before a ward round is dead time. If a structured, playful, child-appropriate history could be captured in that window and delivered to the clinician as a clean summary, the round starts from a much better baseline — and the child has already rehearsed the vocabulary they'll need to answer the doctor directly.

### Goals

| # | Goal | Success measure |
|---|---|---|
| G1 | Deliver a visual, icon-led interface rather than a text-heavy one, so comprehension does not depend on reading ability | Every child-facing item answerable from imagery and audio alone; ≤10 words of on-screen text per question; no free-text input anywhere in the child flow |
| G2 | Improve data quality from children | ≥70% of standard items answered by the child directly (not proxied to parent) |
| G3 | Reduce child anxiety around clinical questioning | Post-session child-reported comfort score; observed engagement |
| G4 | Front-load history before the ward round | Median session ≤8 min; summary available to clinician before round reaches the bed |
| G5 | Clinician-perceived usefulness | ≥80% of clinicians rate the summary as "changed or accelerated" their questioning |

### Non-goals

- Diagnosis, triage, or any clinical recommendation
- Replacing the clinician–patient conversation
- Autonomous AI interaction with the child (the child never converses freely with a model)
- Safeguarding detection or escalation (explicitly out of scope for this prototype; see §9)
- Emergency or deteriorating-patient use

---

## 2. Users

**Primary — Child (5–12).** Wide developmental range. Requires two content tiers (5–8 and 9–12) differing in reading load, abstraction, and interaction style. May be unwell, tired, cannulated, or in pain. Attention budget is short and non-renewable.

**Primary — Parent/carer.** Present throughout and aware of everything the child answers. Provides duration, frequency, medication, dietary, and contextual detail the child cannot. Often the more anxious party.

**Primary — Clinician.** Consultant, registrar, or nurse. Nurses will do most of the actual initiation and hand-off; the consultant is the main consumer of the summary. Extremely low tolerance for anything requiring a separate login or a second screen.

**Secondary — Ward administrator.** Owns the device, cleaning schedule, and charging.

---

## 3. Core principles

1. **Deterministic capture.** Every question the child sees is pre-authored, paediatrician-approved, and fixed. No generative model sits between the clinician's intent and the child's screen.
2. **AI is advisory, downstream, and clinician-gated.** The model's only role is proposing follow-up questions *after* the standard set is complete, and no proposal reaches a patient without a clinician tapping approve.
3. **Visual first, words last.** The interface is built from icons, illustrations, and tappable imagery. Text is a label on a picture, never the carrier of meaning. A child who cannot read the screen at all should still be able to complete the session.
4. **Modality matches the construct.** Pain intensity gets a faces scale, location gets a body map, stool form gets a Bristol chart. Yes/No is used only where the underlying clinical item is genuinely binary.
5. **The child is the primary respondent.** The parent supplements; they do not answer on the child's behalf for interoceptive items.
6. **Fun is a means, not the end.** Engagement mechanics exist to sustain attention long enough to get good data, not to make a game.

---

## 4. Feature specification

### 4.1 Clinician setup (Feature A)

The clinician opens the app, scans the patient wristband or selects from the ward list, and confirms the child's age band and language. They then review the standard question set.

The standard set is **fixed and always asked**. The clinician can:

- Toggle individual standard items off if clinically irrelevant
- Add up to three items from a curated, paediatrician-approved supplementary library (e.g. stoma care, PEG feeding, post-operative items)
- Enter a free-text note for context — this is **for the clinician's own reference and for AI follow-up generation only**; it is never shown to the child

They hand the device over. Setup target: under 60 seconds.

> **Design decision:** clinicians cannot free-type questions for the child. This is the single most important constraint in the product. A registrar typing "any haematochezia?" at 7am and having a model translate it live is exactly the failure mode that would make this tool unsafe. The supplementary library is the escape valve.

### 4.2 The standard nine

Each item is mapped to a validated instrument where one exists, and to a fixed input modality.

| # | Clinical item | Child modality | Instrument basis |
|---|---|---|---|
| 1 | Tummy pain — present now? | Yes / No | Screening gate for items 2–3 |
| 2 | Pain intensity | Faces Pain Scale – Revised (6 faces) | FPS-R |
| 3 | Pain location | Tappable body map, front/back | Adapted paediatric body map |
| 4 | Pain timing vs. eating & toileting | Three-option picture choice | Rome IV paediatric criteria |
| 5 | Stool form | Bristol Stool Chart, child-illustrated version | Modified Bristol (Children's) |
| 6 | Stool frequency | Counting interaction ("how many times since you woke up?") | Rome IV |
| 7 | Blood or unusual colour | Colour-swatch picker, non-alarming framing | Clinical item |
| 8 | Nausea / vomiting | Yes/No + count | PedsQL GI Symptoms Module |
| 9 | Appetite & eating | Three-option plate illustration | PedsQL GI Symptoms Module |

**Parent items** run in a separate segment after the child's turn, on the same device:

- Duration and trajectory of the presenting complaint
- Current medications and recent changes
- Dietary changes, intolerances, recent illness or travel
- School attendance and impact on daily function
- Anything the parent wants the team to know (free text)

Parent free text is the only unstructured input in the product.

### 4.3 Child interaction design (Feature B/C)

The child's segment is framed as a journey with a companion character. Progress is spatial rather than numeric — a path with visible stops — so the child can always see the end. Each response gets immediate, non-evaluative acknowledgement (the companion reacts, never approves or disapproves, since approval cues bias the next answer).

Requirements:

- **R-C1** All questions are read aloud with synchronised audio in the selected language; no item depends on reading ability.
- **R-C1a** Every question and every response option is carried by an icon or illustration. On-screen text is capped at 10 words per question and 3 words per response option, and functions only as a label for the image beside it. Any item that cannot be expressed visually is redesigned or cut, not written out.
- **R-C1b** No free-text entry, keyboard, or open input appears anywhere in the child flow. All responses are taps on imagery.
- **R-C2** No question is skippable but every question has an explicit "I don't know" / "I'd rather not say" option, presented with equal visual weight to other options.
- **R-C3** Two content tiers, 5–8 and 9–12, differing in vocabulary, illustration style, and number of response options.
- **R-C4** No timers, no scores, no failure states, no leaderboards.
- **R-C5** Acquiescence mitigation: response option order is randomised where order is not semantically meaningful; no item is phrased leadingly; consecutive identical response patterns are flagged in the summary as low-confidence.
- **R-C6** A visible, always-available pause. Sessions resume for 30 minutes.
- **R-C7** Explicit turn-taking. A full-screen handoff card separates the child's segment from the parent's, so neither is unclear about whose turn it is.

### 4.4 Language and accessibility

- **R-A1** Launch languages: English, Arabic, Simplified Chinese, Vietnamese, Hindi. All content is human-translated and paediatrician-reviewed per language, not machine-translated at runtime.
- **R-A2** WCAG 2.2 AA. Minimum 44px touch targets, high-contrast mode, dyslexia-friendly typeface option.
- **R-A3** Parent-assisted mode for children who cannot interact directly — the parent operates the device while the child indicates. Responses captured this way are **flagged as proxy-reported** in the summary. This flag is non-optional and clinically significant.
- **R-A4** Where the parent's language differs from the child's, each segment renders in its own language.

### 4.5 Summary generation (Feature D)

On completion, the app produces a structured summary. This is a **template render of captured values, not a generated narrative** — a fixed layout populated with the recorded responses.

The summary contains:

- Structured values for all standard items, in clinical terms (the child saw a faces scale; the clinician sees FPS-R 6/10)
- Visual artefacts reproduced directly — body map with the child's taps, Bristol selection
- Parent free text verbatim, unsummarised and unparaphrased
- Provenance flags on every item: child-reported, parent-reported, or proxy-reported
- Confidence flags: rapid completion, uniform response pattern, high "don't know" rate
- Timestamp, duration, language, and content tier

> **Design decision:** the model does not write the summary. An LLM paraphrasing a child's symptom report is an uncontrolled information-loss step with no upside — the underlying data is already structured. Determinism here is what keeps the capture pathway free of model influence end to end.

### 4.6 AI follow-up suggestion (Feature E)

This is the **only** generative component.

**Input:** structured standard-set responses, parent free text, the clinician's context note, age band.
**Output:** up to five candidate follow-up questions, each with a one-line rationale referencing the specific response that prompted it.
**Constraint:** every suggestion must be drawn from, or mapped to, the paediatrician-approved supplementary library. The model performs selection and prioritisation within a bounded set — not open generation.

The clinician sees suggestions in a review panel and can:

- **Approve** — the question is sent to the device for the child or parent to answer
- **Dismiss** — with a one-tap reason (not clinically relevant / already known / poorly worded)
- **Ask directly** — mark as something they'll raise in person instead

Requirements:

- **R-E1** No suggestion is ever shown to a patient without explicit clinician approval. No exceptions, no "auto-approve" setting, no batching shortcut.
- **R-E2** Every suggestion carries a visible "AI-suggested" label in the clinician UI.
- **R-E3** Dismissal reasons are logged. This is the primary quality signal for the feature.
- **R-E4** The suggestion panel is skippable. A clinician who ignores it entirely still gets full value from the product.
- **R-E5** Suggestions are advisory only and must never be phrased as findings, impressions, or recommendations.

### 4.7 EMR integration

Summary writes to the patient record as a structured note. Prototype scope: FHIR `QuestionnaireResponse` resource plus a rendered PDF attachment for human reading. Real-world integration is EMR-specific and out of scope for the competition build; the demo targets a FHIR sandbox.

---

## 5. Shared device requirements

- **R-D1** Kiosk mode under hospital MDM. No exit to OS, no browser, no app switching.
- **R-D2** Hard session termination on completion or 30-minute timeout: full state clear, no residual data on device, no autofill or predictive-text retention of clinical input.
- **R-D3** No patient data persists locally beyond the active session.
- **R-D4** Device lock requires clinician credential; the handover state is patient-facing only.
- **R-D5** Wipeable case rated for hospital-grade disinfectant.
- **R-D6** Offline capture with sync on reconnect — ward wifi is unreliable and a session lost at question eight will not be repeated.

---

## 6. Data and privacy

- Australian data residency; hosting in an Australian region under a health-sector-appropriate cloud agreement.
- Encryption in transit (TLS 1.3) and at rest (AES-256).
- Patient data is **never** used for model training or improvement, under any circumstance. This is a contractual requirement on any model provider, not a configuration setting.
- Parent free text is the highest-risk field. It is transmitted to the model for follow-up generation; this must be disclosed in consent, and the flow must be the first thing reviewed by a privacy office in any real deployment.
- Retention follows the hosting health service's medical record policy; the app itself retains nothing after EMR write and sync confirmation.
- Full audit log: who initiated, who approved which follow-ups, what was written where and when.

---

## 7. Success metrics

**Primary**
- Session completion rate ≥85%
- Median duration ≤8 minutes
- Child-direct response rate ≥70% of standard items
- Clinician usefulness rating ≥80% "changed or accelerated my questioning"

**Secondary**
- AI follow-up approval rate (target 30–60%; below 30% suggests noise, above 80% suggests rubber-stamping — the latter is the more concerning failure)
- Child comfort score, single item, post-session
- Time-to-summary-availability relative to ward round arrival

**Guardrail metrics**
- Rate of proxy-reported flags (rising = the child interaction is failing)
- Abandonment point distribution (identifies the item where attention breaks)
- Uniform-response-pattern rate (rising = acquiescence bias)

---

## 8. Scope

**In (v1)**
Clinician setup, standard nine, parent segment, five languages, two age tiers, deterministic summary, AI follow-up suggestion with approval gate, FHIR sandbox write, kiosk mode, offline capture.

**Out (v1)**
Private child input, safeguarding detection, longitudinal tracking across admissions, free-form child–AI conversation, clinician free-text questions to the child, outpatient/pre-admission variants, BYOD, diagnosis or triage of any kind.

---

## 9. Known limitations and open risks

These are stated openly rather than designed around, because the prototype does not resolve them.

**Parental presence.** The parent observes every child response. For GI symptoms specifically — soiling, toileting, eating — this will suppress disclosure in some children. The product accepts this trade-off and does not claim to capture what a child would say privately. Any real deployment would need to revisit this.

**Safeguarding.** Deliberately out of scope. A tool that collects symptom information from children in a clinical setting will occasionally surface concerning information, and this prototype has no escalation pathway. This is a genuine gap, not an oversight, and it is disqualifying for real-world use until addressed.

**Regulatory position.** By keeping capture deterministic and gating all AI output behind clinician approval, the design sits as close to "structured questionnaire" as possible. Whether the TGA would agree is untested and has not been assessed.

**Developmental range.** Two content tiers across 5–12 is a compromise. The 5–6 cohort in particular may need parent-assisted mode as the default rather than the fallback.

**Acquiescence bias.** Mitigated but not eliminated. Children answer yes. Item 5 in §4.3 reduces this; it does not solve it, and any data from this tool should be read with that caveat.

**Adoption.** The most likely real failure is not technical. Shared ward tablets end up in drawers. The product's success depends far more on whether initiating a session becomes part of the nursing admission routine than on anything in this document.
