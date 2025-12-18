export const COOKIE_NAME = "scs_session";
export const ALERT_CATEGORIES = [
  "theft",
  "robbery", 
  "medical_emergency",
  "drug_use",
  "suspicious_individual",
  "poor_lighting"
] as const;
export const ALERT_STATUS = ["pending", "in_progress", "resolved", "false_alarm"] as const;
