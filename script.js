/**
 * ============================================================
 * Legal Advice Expert System — Philippine Labor Law
 * Academic Project | Rule-Based Inference Engine
 * ============================================================
 * Coverage:
 *   - Illegal/Constructive Dismissal        (Art. 294, 297–299)
 *   - 13th Month Pay                        (P.D. 851)
 *   - Overtime Pay                          (Art. 87)
 *   - Night Shift Differential              (Art. 86)
 *   - Service Incentive Leave               (Art. 95)
 * ============================================================
 */


// ═══════════════════════════════════════════════════════════════
// KNOWLEDGE BASE
// Each rule:
//   id          — unique identifier (e.g. "R001")
//   category    — internal rule category (see CATEGORY_MAP)
//   name        — short human-readable label
//   conditions  — all must match the facts object for the rule to fire
//                 supports exact match OR range: { gte: N } / { lte: N }
//   result      — object returned to the UI when this rule fires
//     .verdict    — one-line legal conclusion
//     .tone       — "positive" | "negative" | "neutral" (for UI styling)
//     .advice     — plain-language explanation
//     .legalBasis — specific article / law citation
//     .action     — what the user should do next
// ═══════════════════════════════════════════════════════════════

const KNOWLEDGE_BASE = [

  // ── DISMISSAL (Art. 294, 297–299) ──────────────────────────

  {
    id: "R001",
    category: "Dismissal",
    name: "Just Cause — Serious Misconduct",
    conditions: {
      isTerminated: true,
      reason: "Serious Misconduct",
      hasProofOfMisconduct: true,
      isWorkRelated: true
    },
    result: {
      verdict: "Dismissal may be LEGAL (Substantive Validity Present)",
      tone: "neutral",
      advice:
        "Your termination may be legally valid on substantive grounds. Serious Misconduct " +
        "under Art. 297 is a recognized just cause. No separation pay is required if the " +
        "offense is proven.",
      legalBasis: "Art. 297(a), Labor Code of the Philippines",
      action:
        "Verify that the employer strictly followed the Two-Notice Rule: (1) a written " +
        "notice specifying the grounds and opportunity to explain, and (2) a written notice " +
        "of termination. Failure to observe due process entitles you to nominal damages " +
        "(Agabon doctrine) even if the dismissal is substantively valid."
    }
  },

  {
    id: "R002",
    category: "Dismissal",
    name: "Just Cause — Willful Disobedience",
    conditions: {
      isTerminated: true,
      reason: "Willful Disobedience",
      hasProofOfMisconduct: true,
      isWorkRelated: true
    },
    result: {
      verdict: "Dismissal may be LEGAL (Just Cause — Willful Disobedience)",
      tone: "neutral",
      advice:
        "Termination for willful disobedience is a recognized just cause under Art. 297, " +
        "provided the order disobeyed was lawful, reasonable, and the employee was aware of it.",
      legalBasis: "Art. 297(b), Labor Code of the Philippines",
      action:
        "Check that the employer's order was (1) lawful, (2) reasonable, and (3) related to " +
        "the employee's duties. Also confirm that the Two-Notice Rule was strictly followed."
    }
  },

  {
    id: "R003",
    category: "Dismissal",
    name: "Authorized Cause — Redundancy",
    conditions: {
      isTerminated: true,
      reason: "Redundancy",
      received30DayNotice: true,
      receivedSeparationPay: true
    },
    result: {
      verdict: "Dismissal is likely VALID (Authorized Cause — Redundancy)",
      tone: "neutral",
      advice:
        "Redundancy is a valid authorized cause under Art. 298. The employer is required to " +
        "pay separation pay of at least one (1) month pay per year of service and give written " +
        "notice to both the employee and DOLE 30 days before effectivity.",
      legalBasis: "Art. 298, Labor Code of the Philippines",
      action:
        "Verify: (1) DOLE was notified 30 days in advance, (2) separation pay equals at least " +
        "1 month per year of service, and (3) the employer acted in good faith and used fair " +
        "criteria (seniority, efficiency) in selecting who to retrench."
    }
  },

  {
    id: "R004",
    category: "Dismissal",
    name: "Authorized Cause — Retrenchment",
    conditions: {
      isTerminated: true,
      reason: "Retrenchment",
      received30DayNotice: true,
      receivedSeparationPay: true
    },
    result: {
      verdict: "Dismissal may be VALID (Authorized Cause — Retrenchment)",
      tone: "neutral",
      advice:
        "Retrenchment to prevent losses is a valid authorized cause under Art. 298. The " +
        "employer must prove imminent substantial losses and that retrenchment is a last resort.",
      legalBasis: "Art. 298, Labor Code of the Philippines",
      action:
        "The employer must demonstrate: (1) serious and imminent business losses, " +
        "(2) written 30-day notice to both employee and DOLE, and (3) separation pay of " +
        "1/2 month per year of service. If losses are not proven, the dismissal is illegal."
    }
  },

  {
    id: "R005",
    category: "Dismissal",
    name: "Constructive Dismissal",
    conditions: {
      resignedVoluntarily: false,
      intolerableWorkConditions: true
    },
    result: {
      verdict: "This qualifies as CONSTRUCTIVE DISMISSAL (Illegal)",
      tone: "negative",
      advice:
        "Even without a formal termination, forcing an employee to resign through intolerable " +
        "conditions (e.g., harassment, unreasonable demotion, drastic pay cut, hostile " +
        "environment) is legally treated as illegal dismissal.",
      legalBasis: "Art. 294, Labor Code; Globe Telecom v. Florendo-Flores",
      action:
        "You may file a complaint for Illegal Dismissal before the NLRC. You are entitled to " +
        "reinstatement (or separation pay in lieu thereof) and full backwages from the time " +
        "of constructive dismissal up to finality of the decision."
    }
  },

  {
    id: "R006",
    category: "Dismissal",
    name: "Illegal Dismissal — No Due Process",
    conditions: {
      isTerminated: true,
      receivedFirstNotice: false
    },
    result: {
      verdict: "Dismissal is ILLEGAL (Procedural Due Process Violated)",
      tone: "negative",
      advice:
        "Your dismissal is procedurally infirm. Even if a just or authorized cause existed, " +
        "failure to observe the Two-Notice Rule renders the dismissal defective and entitles " +
        "you to damages.",
      legalBasis: "Art. 294, Labor Code; Agabon v. NLRC (G.R. No. 158693)",
      action:
        "File a complaint for illegal dismissal at the NLRC. Under the Agabon doctrine, if " +
        "cause exists but no due process was followed, you are entitled to nominal damages of " +
        "PHP 30,000. If NO just cause also exists, you are entitled to reinstatement and " +
        "full backwages."
    }
  },

  // ── 13TH MONTH PAY (P.D. 851) ──────────────────────────────

  {
    id: "R007",
    category: "13th Month Pay",
    name: "Regular Employee — Entitled to 13th Month Pay",
    conditions: {
      paymentMode: "Salary",
      monthsWorked: { gte: 1 },
      isGovernmentEmployee: false
    },
    result: {
      verdict: "You ARE ENTITLED to 13th Month Pay",
      tone: "positive",
      advice:
        "All rank-and-file employees in the private sector who have worked for at least one (1) " +
        "month during the calendar year are entitled to 13th month pay, regardless of employment " +
        "status (regular, probationary, contractual, or project-based).",
      legalBasis: "Presidential Decree No. 851; Revised Guidelines on the Implementation of PD 851",
      action:
        "13th Month Pay = Total Basic Salary Earned in the Year ÷ 12. 'Basic Salary' excludes " +
        "allowances, OT pay, holiday pay, NSD, and other monetary benefits. Payment must be " +
        "made on or before December 24 of each year."
    }
  },

  {
    id: "R008",
    category: "13th Month Pay",
    name: "Piece-Rate Worker — Entitled to 13th Month Pay",
    conditions: {
      paymentMode: "Piece-Rate",
      underEmployerControl: true,
      monthsWorked: { gte: 1 }
    },
    result: {
      verdict: "You ARE ENTITLED to 13th Month Pay (Piece-Rate Worker)",
      tone: "positive",
      advice:
        "Piece-rate workers under the control and supervision of the employer are covered by " +
        "P.D. 851. The employer-employee relationship is the determining factor, not the mode " +
        "of payment.",
      legalBasis: "P.D. 851; Revised IRR, Section 2(b)",
      action:
        "13th Month Pay = Total Piece-Rate Earnings for the Year ÷ 12. Keep a record of all " +
        "earnings. If your employer refuses, file a complaint with the DOLE Regional Office."
    }
  },

  {
    id: "R009",
    category: "13th Month Pay",
    name: "Task-Basis (Pakyaw) Worker — Possible Exemption",
    conditions: {
      paymentMode: "Task-Basis",
      isIndependent: true,
      irrespectiveOfTime: true
    },
    result: {
      verdict: "You may be EXEMPT from 13th Month Pay — Verify Employment Status",
      tone: "neutral",
      advice:
        "Workers paid on task/pakyaw basis who work without employer supervision and use their " +
        "own tools may be classified as independent contractors, not employees, and thus exempt " +
        "from P.D. 851.",
      legalBasis: "P.D. 851 IRR, Section 3(e); Four-Fold Test (Jurisprudence)",
      action:
        "Apply the Four-Fold Test: (1) selection and engagement, (2) payment of wages, " +
        "(3) power of dismissal, (4) power of control over work methods. If the employer " +
        "controls your methods, you are an employee and ARE entitled to 13th month pay."
    }
  },

  {
    id: "R010",
    category: "13th Month Pay",
    name: "NSD Excluded from 13th Month Computation",
    conditions: {
      calculating13thMonthPay: true,
      hasNSD: true
    },
    result: {
      verdict: "Night Shift Differential is NOT included in 13th Month Pay",
      tone: "neutral",
      advice:
        "NSD, overtime pay, holiday pay, and other premium payments are legally excluded from " +
        "the 13th month pay computation under P.D. 851. Only Basic Salary is used as the base.",
      legalBasis: "P.D. 851; Revised Guidelines, Section 5",
      action:
        "13th Month Pay = Sum of Basic Pay Only (12 months) ÷ 12. Verify payslips to isolate " +
        "basic salary from all premium pay. A lower-than-expected 13th month pay is legally correct."
    }
  },

  // ── OVERTIME PAY (Art. 87) ──────────────────────────────────

  {
    id: "R011",
    category: "Overtime Pay",
    name: "Managerial / Field Personnel — OT Exempt",
    conditions: {
      workedOver8Hours: true,
      isManagerial: true
    },
    result: {
      verdict: "You are generally NOT ENTITLED to Overtime Pay",
      tone: "negative",
      advice:
        "Managerial employees and field personnel are expressly exempt from overtime pay " +
        "provisions of the Labor Code. Their compensation is presumed to already account for " +
        "hours beyond eight (8) in a workday.",
      legalBasis: "Art. 82, Labor Code of the Philippines",
      action:
        "Review your job description. If you were misclassified as managerial but perform " +
        "rank-and-file tasks under close supervision, you may still be entitled to OT pay. " +
        "Check your contract for discretionary bonuses in lieu of OT pay."
    }
  },

  {
    id: "R012",
    category: "Overtime Pay",
    name: "Regular Workday Overtime",
    conditions: {
      workedOver8Hours: true,
      isRegularWorkday: true,
      isManagerial: false,
      receivedOTPremium: false
    },
    result: {
      verdict: "You ARE ENTITLED to Overtime Pay — Regular Workday (125%)",
      tone: "positive",
      advice:
        "Work performed beyond eight (8) hours on a regular workday must be compensated with " +
        "an additional 25% of the employee's hourly rate for every hour of overtime.",
      legalBasis: "Art. 87, Labor Code of the Philippines",
      action:
        "Computation: OT Pay = Hourly Rate × 1.25 × Number of OT Hours. If your employer " +
        "refuses to pay, file a money claim with the NLRC or DOLE Regional Office. Keep " +
        "timesheets as evidence."
    }
  },

  {
    id: "R013",
    category: "Overtime Pay",
    name: "Rest Day / Special Non-Working Day Overtime",
    conditions: {
      workedOver8Hours: true,
      isRestDayOrSpecialDay: true,
      isManagerial: false,
      isRegularHoliday: false
    },
    result: {
      verdict: "You ARE ENTITLED to Overtime Pay — Rest/Special Day (130%)",
      tone: "positive",
      advice:
        "Overtime on a rest day or special non-working day is compensated at 30% on top of " +
        "the rest day hourly rate — not merely the base hourly rate.",
      legalBasis: "Art. 87 and 93, Labor Code; DOLE Handbook on Workers' Statutory Monetary Benefits",
      action:
        "Computation: Rest Day Hourly Rate = Base Rate × 1.30. " +
        "OT Pay = Rest Day Hourly Rate × 1.30 × OT Hours. " +
        "Ensure your payslip reflects this layered premium correctly."
    }
  },

  {
    id: "R014",
    category: "Overtime Pay",
    name: "Regular Holiday Overtime",
    conditions: {
      workedOver8Hours: true,
      isRegularHoliday: true,
      isManagerial: false
    },
    result: {
      verdict: "You ARE ENTITLED to Overtime Pay — Regular Holiday (260%)",
      tone: "positive",
      advice:
        "Work beyond eight (8) hours on a regular holiday commands the highest premium. " +
        "The first eight hours are paid at 200% of the daily rate; OT hours are an additional " +
        "30% on top of that rate.",
      legalBasis: "Art. 87 & 94, Labor Code; R.A. 9492; DOLE Labor Advisory",
      action:
        "Computation: Holiday OT Hourly Rate = (Daily Rate × 2.00 ÷ 8) × 1.30. Secure " +
        "payslips and attendance records as evidence if your employer underpays."
    }
  },

  {
    id: "R015",
    category: "Overtime Pay",
    name: "Night Shift Overtime — Cumulative Premiums",
    conditions: {
      workedOver8Hours: true,
      workedBetween10PMand6AM: true,
      isManagerial: false,
      isRegularWorkday: true
    },
    result: {
      verdict: "You ARE ENTITLED to BOTH Overtime Pay AND Night Shift Differential",
      tone: "positive",
      advice:
        "NSD and Overtime Pay are not mutually exclusive. When overtime is rendered during " +
        "the night shift (10 PM–6 AM), both premiums apply cumulatively: 10% NSD plus the " +
        "25% OT premium on a regular workday.",
      legalBasis: "Art. 86 and 87, Labor Code of the Philippines",
      action:
        "Computation: OT+NSD Hourly Rate = Hourly Rate × 1.10 (NSD) × 1.25 (OT). " +
        "Verify that your payslip itemizes both 'NSD' and 'OT' separately. A flat combined " +
        "rate may constitute underpayment."
    }
  },

  // ── NIGHT SHIFT DIFFERENTIAL (Art. 86) ─────────────────────

  {
    id: "R016",
    category: "Night Shift Differential",
    name: "NSD Eligibility — Rank-and-File Night Worker",
    conditions: {
      workedBetween10PMand6AM: true,
      isManagerial: false,
      isFieldPersonnel: false
    },
    result: {
      verdict: "You ARE ENTITLED to Night Shift Differential (10%)",
      tone: "positive",
      advice:
        "Every rank-and-file employee who works between 10:00 PM and 6:00 AM is entitled to " +
        "an additional 10% of their regular wage for each hour worked during that period.",
      legalBasis: "Art. 86, Labor Code of the Philippines",
      action:
        "Computation: NSD Pay = Hourly Rate × 0.10 × Night Hours Worked. Check your payslip " +
        "for a separate 'NSD' line item. Absence of this item is a wage violation actionable " +
        "before DOLE."
    }
  },

  {
    id: "R017",
    category: "Night Shift Differential",
    name: "NSD During Regular Holiday",
    conditions: {
      workedBetween10PMand6AM: true,
      isRegularHoliday: true,
      isManagerial: false
    },
    result: {
      verdict: "You ARE ENTITLED to BOTH Holiday Pay AND Night Shift Differential",
      tone: "positive",
      advice:
        "NSD is a wage premium stacked on top of the applicable day rate. On a regular holiday, " +
        "NSD must be computed on the 200% holiday rate, not the standard base rate.",
      legalBasis: "Art. 86 and 94, Labor Code; DOLE Handbook on Workers' Statutory Monetary Benefits",
      action:
        "Computation: Holiday NSD = (Daily Rate × 2.00 ÷ 8) × 0.10 × Night Hours Worked. " +
        "The 10% NSD always rides on the applicable day rate — not just the base rate."
    }
  },

  // ── SERVICE INCENTIVE LEAVE (Art. 95) ──────────────────────

  {
    id: "R018",
    category: "Service Incentive Leave",
    name: "SIL Entitlement",
    conditions: {
      monthsWorked: { gte: 12 },
      isRankAndFile: true,
      hasOtherPaidLeaves: false,
      isFieldPersonnel: false
    },
    result: {
      verdict: "You ARE ENTITLED to 5 Days of Service Incentive Leave per year",
      tone: "positive",
      advice:
        "Art. 95 mandates that every rank-and-file employee who has rendered at least one (1) " +
        "year of service is entitled to 5 days of SIL with pay per year, unless the employer " +
        "already provides equivalent paid leaves.",
      legalBasis: "Art. 95, Labor Code of the Philippines",
      action:
        "These 5 days may be used for vacation, personal matters, or illness. Unused SIL at " +
        "year-end must be converted to cash: Daily Rate × Unused SIL Days. Confirm SIL is " +
        "tracked in your leave records."
    }
  },

  {
    id: "R019",
    category: "Service Incentive Leave",
    name: "SIL Exemption — Existing Paid Leaves",
    conditions: {
      hasOtherPaidLeaves: true,
      otherLeaveDays: { gte: 5 }
    },
    result: {
      verdict: "You are NOT entitled to additional SIL (Requirement Already Satisfied)",
      tone: "neutral",
      advice:
        "If your employer already provides at least five (5) days of paid vacation or sick " +
        "leave, the legal SIL requirement under Art. 95 is considered satisfied. No additional " +
        "SIL is owed on top of existing equivalent benefits.",
      legalBasis: "Art. 95, Labor Code; DOLE Rules Implementing Art. 95",
      action:
        "Check your employee handbook or HR for the exact number of paid leave days. If the " +
        "employer provides exactly 5 days, those directly substitute for SIL. Any days above " +
        "5 are a benefit beyond the legal minimum."
    }
  },

  {
    id: "R020",
    category: "Service Incentive Leave",
    name: "SIL Year-End Cash Conversion",
    conditions: {
      hasUnusedSIL: true,
      isEndOfYear: true
    },
    result: {
      verdict: "Your Unused SIL Must Be CONVERTED TO CASH",
      tone: "positive",
      advice:
        "A distinctive feature of SIL is its mandatory convertibility to cash at year-end if " +
        "unused. Unlike most leave benefits, SIL cannot be forfeited by the employer — it must " +
        "be used or paid out.",
      legalBasis: "Art. 95, Labor Code of the Philippines",
      action:
        "Computation: SIL Cash Value = Daily Rate × Number of Unused SIL Days. This payout " +
        "typically appears in the December or January payroll. If refused, this is a labor " +
        "standards violation actionable before the DOLE Regional Office."
    }
  }

];


// ═══════════════════════════════════════════════════════════════
// CATEGORY → RULE MAPPING
// Maps the four user-facing category keys to the internal
// rule categories used in the knowledge base.
// ═══════════════════════════════════════════════════════════════

const CATEGORY_MAP = {
  "Dismissal":            ["Dismissal"],
  "13th Month Pay":       ["13th Month Pay"],
  "Overtime Pay":         ["Overtime Pay"],
  "Night Shift & Leaves": ["Night Shift Differential", "Service Incentive Leave"]
};


// ═══════════════════════════════════════════════════════════════
// QUESTION FLOWS
// One ordered list of questions per category key.
// UI walks through these one at a time and stores each answer
// into the facts object under the given key.
//
// question fields:
//   key     — the fact key this answer will set
//   text    — the question to display to the user
//   type    — "yesno" | "select" | "number"
//   options — (select only) array of { label, value }
// ═══════════════════════════════════════════════════════════════

const QUESTION_FLOWS = {

  "Dismissal": [
    {
      key: "isTerminated",
      text: "Were you officially terminated or fired by your employer?",
      type: "yesno"
    },
    {
      key: "resignedVoluntarily",
      text: "Did you resign from your job voluntarily (without being pressured)?",
      type: "yesno"
    },
    {
      key: "intolerableWorkConditions",
      text: "Were your working conditions made intolerable — such as harassment, unjust demotion, drastic pay cuts, or a hostile environment?",
      type: "yesno"
    },
    {
      key: "reason",
      text: "What reason did your employer give for your termination?",
      type: "select",
      options: [
        { label: "Serious Misconduct",    value: "Serious Misconduct"   },
        { label: "Willful Disobedience",  value: "Willful Disobedience" },
        { label: "Redundancy",            value: "Redundancy"           },
        { label: "Retrenchment",          value: "Retrenchment"         },
        { label: "No reason given",       value: "None"                 }
      ]
    },
    {
      key: "hasProofOfMisconduct",
      text: "Does the employer have concrete proof of the act they cited as the reason for firing you?",
      type: "yesno"
    },
    {
      key: "isWorkRelated",
      text: "Was the act directly related to your work duties or the workplace?",
      type: "yesno"
    },
    {
      key: "receivedFirstNotice",
      text: "Did you receive a written first notice (show-cause memo) giving you a chance to explain your side before being fired?",
      type: "yesno"
    },
    {
      key: "received30DayNotice",
      text: "Did you receive a written 30-day advance notice of termination?",
      type: "yesno"
    },
    {
      key: "receivedSeparationPay",
      text: "Did you receive your full separation pay?",
      type: "yesno"
    }
  ],

  "13th Month Pay": [
    {
      key: "isGovernmentEmployee",
      text: "Are you a government employee (employed by a national or local government agency)?",
      type: "yesno"
    },
    {
      key: "paymentMode",
      text: "How does your employer pay you?",
      type: "select",
      options: [
        { label: "Fixed Monthly or Daily Salary",           value: "Salary"     },
        { label: "Piece-Rate (per unit, kilo, or item)",    value: "Piece-Rate" },
        { label: "Task-Basis / Pakyaw (fixed per project)", value: "Task-Basis" }
      ]
    },
    {
      key: "monthsWorked",
      text: "How many months have you worked for this employer in the current calendar year?",
      type: "number"
    },
    {
      key: "underEmployerControl",
      text: "Does your employer supervise and control the methods and means of your work?",
      type: "yesno"
    },
    {
      key: "isIndependent",
      text: "Do you work independently, using your own tools and methods without close supervision?",
      type: "yesno"
    },
    {
      key: "irrespectiveOfTime",
      text: "Are you paid purely for the completed result, regardless of how many hours it took?",
      type: "yesno"
    },
    {
      key: "calculating13thMonthPay",
      text: "Are you currently computing or questioning the amount of your 13th month pay?",
      type: "yesno"
    },
    {
      key: "hasNSD",
      text: "Do you regularly receive Night Shift Differential (NSD) in your payslip?",
      type: "yesno"
    }
  ],

  "Overtime Pay": [
    {
      key: "workedOver8Hours",
      text: "Did you work more than 8 hours in a single workday?",
      type: "yesno"
    },
    {
      key: "isManagerial",
      text: "Are you a managerial employee or field personnel (e.g., sales agents, delivery riders with no fixed hours)?",
      type: "yesno"
    },
    {
      key: "receivedOTPremium",
      text: "Did your employer already pay you an overtime premium for those extra hours?",
      type: "yesno"
    },
    {
      key: "isRegularWorkday",
      text: "Was the day you worked overtime a regular scheduled workday (not a rest day or holiday)?",
      type: "yesno"
    },
    {
      key: "isRestDayOrSpecialDay",
      text: "Was the day a rest day or a special non-working holiday?",
      type: "yesno"
    },
    {
      key: "isRegularHoliday",
      text: "Was the day a regular holiday (e.g., New Year's Day, Independence Day, Christmas Day)?",
      type: "yesno"
    },
    {
      key: "workedBetween10PMand6AM",
      text: "Did your overtime hours fall between 10:00 PM and 6:00 AM?",
      type: "yesno"
    }
  ],

  "Night Shift & Leaves": [
    {
      key: "workedBetween10PMand6AM",
      text: "Did you work any hours between 10:00 PM and 6:00 AM?",
      type: "yesno"
    },
    {
      key: "isManagerial",
      text: "Are you a managerial employee or field personnel?",
      type: "yesno"
    },
    {
      key: "isFieldPersonnel",
      text: "Are you considered field personnel (work performed away from the principal place of business with unsupervised hours)?",
      type: "yesno"
    },
    {
      key: "isRegularHoliday",
      text: "Did you work on a regular holiday (e.g., New Year's Day, Christmas, Independence Day)?",
      type: "yesno"
    },
    {
      key: "isRankAndFile",
      text: "Are you a rank-and-file employee (not a manager or supervisor)?",
      type: "yesno"
    },
    {
      key: "monthsWorked",
      text: "How many total months have you worked for this employer?",
      type: "number"
    },
    {
      key: "hasOtherPaidLeaves",
      text: "Does your employer already provide at least 5 days of paid vacation or sick leave per year?",
      type: "yesno"
    },
    {
      key: "otherLeaveDays",
      text: "How many paid leave days does your employer provide per year?",
      type: "number"
    },
    {
      key: "hasUnusedSIL",
      text: "Do you have unused Service Incentive Leave (SIL) days remaining?",
      type: "yesno"
    },
    {
      key: "isEndOfYear",
      text: "Is it currently the end of the calendar year (December or January)?",
      type: "yesno"
    }
  ]

};


// ═══════════════════════════════════════════════════════════════
// CONDITION MATCHER
// Supports:
//   • Exact match  — conditionValue === factValue
//   • Range match  — { gte: N } and/or { lte: N }
// ═══════════════════════════════════════════════════════════════

function conditionMatches(conditionValue, factValue) {
  if (typeof conditionValue === "object" && conditionValue !== null) {
    const n = Number(factValue);
    if (conditionValue.gte !== undefined && n < conditionValue.gte) return false;
    if (conditionValue.lte !== undefined && n > conditionValue.lte) return false;
    return true;
  }
  return conditionValue === factValue;
}


// ═══════════════════════════════════════════════════════════════
// INFERENCE ENGINE
// Filters rules to those whose category matches and whose every
// condition is satisfied by the provided facts.
//
// @param  facts       — flat object of user answers
// @param  categoryKey — one of the four valid category keys
// @returns Array of matched rule objects (may be empty)
// ═══════════════════════════════════════════════════════════════

function runInference(facts, categoryKey) {
  const allowedCategories = CATEGORY_MAP[categoryKey] || [];

  return KNOWLEDGE_BASE.filter(rule =>
    allowedCategories.includes(rule.category) &&
    Object.entries(rule.conditions).every(([key, conditionValue]) =>
      conditionMatches(conditionValue, facts[key])
    )
  );
}


// ═══════════════════════════════════════════════════════════════
// NEAREST MISS DIAGNOSTICS
// When runInference() returns an empty array, call this to find
// the rules with the fewest unmet conditions — useful for
// showing the user what they might have answered differently.
//
// @param  facts       — flat object of user answers
// @param  categoryKey — one of the four valid category keys
// @param  topN        — how many near-misses to return (default 3)
// @returns Array of { rule, unmetCount, unmetConditions[] }
// ═══════════════════════════════════════════════════════════════

function getNearestMisses(facts, categoryKey, topN = 3) {
  const allowedCategories = CATEGORY_MAP[categoryKey] || [];

  return KNOWLEDGE_BASE
    .filter(rule => allowedCategories.includes(rule.category))
    .map(rule => {
      const unmetConditions = Object.entries(rule.conditions)
        .filter(([key, conditionValue]) => !conditionMatches(conditionValue, facts[key]))
        .map(([key]) => key);

      return { rule, unmetCount: unmetConditions.length, unmetConditions };
    })
    .sort((a, b) => a.unmetCount - b.unmetCount)
    .slice(0, topN);
}


// ═══════════════════════════════════════════════════════════════
// APPLICATION STATE
// Tracks the current category, step index, collected facts,
// and the active question list for the session.
// ═══════════════════════════════════════════════════════════════

let currentCategory = null;
let currentStep     = 0;
let facts           = {};
let questions       = [];

// Human-readable labels for each category key (used in modal header)
const catLabels = {
  "Dismissal":            "Dismissal & Termination",
  "13th Month Pay":       "13th Month Pay",
  "Overtime Pay":         "Overtime Pay",
  "Night Shift & Leaves": "Night Shift & Leaves"
};


// ═══════════════════════════════════════════════════════════════
// MODAL CONTROLS
// Opens and closes the modal overlay, and binds close triggers:
//   - Close button (✕)
//   - Click outside the modal panel
//   - Escape key
// ═══════════════════════════════════════════════════════════════

const overlay       = document.getElementById('modalOverlay');
const modalBody     = document.getElementById('modalBody');
const progressFill  = document.getElementById('progressFill');
const modalProgress = document.getElementById('modalProgress');
const modalLabel    = document.getElementById('modalLabel');
const modalTitle    = document.getElementById('modalTitle');

function openModal() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('resetBtn').addEventListener('click', resetAll);

// Close when clicking the dark backdrop (not the modal panel itself)
overlay.addEventListener('click', function (e) {
  if (e.target === overlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});


// ═══════════════════════════════════════════════════════════════
// TOPIC CARD CLICK HANDLER
// Initialises state for the selected category and opens the
// modal to begin the question flow.
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('.topic-card').forEach(function (card) {
  card.addEventListener('click', function () {
    currentCategory = card.dataset.cat;
    questions       = QUESTION_FLOWS[currentCategory];
    currentStep     = 0;
    facts           = {};

    modalLabel.textContent = catLabels[currentCategory];
    openModal();
    renderStep();
  });
});


// ═══════════════════════════════════════════════════════════════
// RENDER STEP
// Renders the current question into the modal body.
// If all questions have been answered, calls showResults().
// Updates the progress bar and step counter on each render.
// ═══════════════════════════════════════════════════════════════

function renderStep() {
  if (currentStep >= questions.length) {
    showResults();
    return;
  }

  const q   = questions[currentStep];
  const pct = Math.round((currentStep / questions.length) * 100);

  progressFill.style.width        = pct + '%';
  modalProgress.textContent       = (currentStep + 1) + ' / ' + questions.length;
  modalTitle.textContent          = q.text;
  modalBody.innerHTML             = '';

  // ── Yes / No ──
  if (q.type === 'yesno') {
    modalBody.innerHTML = `
      <div class="btn-row">
        <button class="btn-yn yes" onclick="answer('${q.key}', true)">Yes</button>
        <button class="btn-yn no"  onclick="answer('${q.key}', false)">No</button>
      </div>`;

  // ── Select (multiple choice) ──
  } else if (q.type === 'select') {
    modalBody.innerHTML = q.options.map(function (opt) {
      return `<button class="select-opt" onclick="answer('${q.key}', '${opt.value}')">${opt.label}</button>`;
    }).join('');

  // ── Number input ──
  } else if (q.type === 'number') {
    modalBody.innerHTML = `
      <div class="number-row">
        <input type="number" class="num-input" id="numInput" min="0" placeholder="0" />
        <button class="btn-continue" onclick="submitNum('${q.key}')">Continue</button>
      </div>`;

    const ni = document.getElementById('numInput');
    ni.focus();
    ni.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submitNum(q.key);
    });
  }
}


// ═══════════════════════════════════════════════════════════════
// ANSWER HANDLERS
// answer()    — for yesno and select questions
// submitNum() — for number input questions
// Both advance the step counter and re-render.
// ═══════════════════════════════════════════════════════════════


function submitNum(key) {
  facts[key] = parseFloat(document.getElementById('numInput').value) || 0;
  currentStep++;
  renderStep();
}


// ═══════════════════════════════════════════════════════════════
// SHOW RESULTS
// Called after all questions are answered.
// Runs the inference engine and routes to the correct
// result builder based on how many rules matched.
// ═══════════════════════════════════════════════════════════════

function showResults() {
  progressFill.style.width  = '100%';
  modalProgress.textContent = 'Done';
  modalTitle.textContent    = 'Your Results';

  const matched = runInference(facts, currentCategory);

  if (matched.length === 0) {
    // No rule fired — show nearest-miss diagnostics
    const misses = getNearestMisses(facts, currentCategory);
    modalBody.innerHTML = buildNoMatch(misses);
  } else if (matched.length === 1) {
    // Exactly one rule fired
    modalBody.innerHTML = buildResult(matched[0].result);
  } else {
    // Multiple rules fired — show tabbed view
    modalBody.innerHTML = buildMultiResult(matched);
  }
}


// ═══════════════════════════════════════════════════════════════
// RESULT BUILDERS
// buildResult()      — renders a single matched rule result
// buildMultiResult() — renders tabbed view for multiple matches
// buildNoMatch()     — renders near-miss diagnostics
// ═══════════════════════════════════════════════════════════════

function buildResult(res) {
  return `
    <div class="verdict-card ${res.tone}">
      <div class="verdict-label-sm">Legal Finding</div>
      <div class="verdict-text">${res.verdict}</div>
    </div>
    <div class="result-section">
      <div class="result-section-label">Analysis</div>
      <p>${res.advice}</p>
      <div class="legal-cite">${res.legalBasis}</div>
    </div>
    <div class="result-section">
      <div class="result-section-label">What to do</div>
      <div class="action-block">${res.action}</div>
    </div>`;
}

function buildMultiResult(matched) {
  const tabs = matched.map(function (r, i) {
    return `<button class="result-tab ${i === 0 ? 'active' : ''}" onclick="switchTab(${i})">${r.name}</button>`;
  }).join('');

  const panels = matched.map(function (r, i) {
    return `<div id="rp-${i}" ${i !== 0 ? 'style="display:none"' : ''}>${buildResult(r.result)}</div>`;
  }).join('');

  return `
    <p style="font-size:12px;color:#9ca3af;margin-bottom:10px;">
      ${matched.length} applicable rules found based on your answers.
    </p>
    <div class="result-tabs">${tabs}</div>
    ${panels}`;
}

function buildNoMatch(misses) {
  const items = misses.map(function (m) {
    const tags = m.unmetConditions.map(function (c) {
      return `<span class="miss-tag">${c}</span>`;
    }).join('');

    return `
      <div class="miss-item">
        <div class="miss-name">
          ${m.rule.name}
          <span style="font-size:11px;font-weight:300;color:#9ca3af;">
            (${m.unmetCount} condition${m.unmetCount !== 1 ? 's' : ''} unmet)
          </span>
        </div>
        <div class="miss-tags">${tags}</div>
      </div>`;
  }).join('');

  return `
    <div class="no-match-box">
      <h3>No exact rule matched</h3>
      <p>
        Based on your answers, no rule in the knowledge base was fully triggered.
        The closest near-misses are shown below — review the unmet conditions to
        understand what would change your result.
      </p>
      ${items}
    </div>`;
}


// ═══════════════════════════════════════════════════════════════
// RESET
// Clears all state and closes the modal, returning the user
// to the topic selection screen.
// ═══════════════════════════════════════════════════════════════

function resetAll() {
  currentCategory       = null;
  currentStep           = 0;
  facts                 = {};
  questions             = [];

  progressFill.style.width  = '0%';
  modalProgress.textContent = '';
  modalLabel.textContent    = '';
  modalTitle.textContent    = '';
  modalBody.innerHTML       = '';

  closeModal();
}