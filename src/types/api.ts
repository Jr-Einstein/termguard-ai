export type RiskCategory = "data_privacy" | "financial" | "permissions" | "legal" | "other";
export type RiskLevel = "low" | "medium" | "high";
export type RiskScore = "low" | "medium" | "high";

export interface Risk {
  category: RiskCategory;
  level: RiskLevel;
  description: string;
  clause_excerpt?: string;
}

export interface AnalyzeResponse {
  summary: string[];
  risk_score: RiskScore;
  risks: Risk[];
  word_count: number;
  suggestions: string[];
}

export interface AnalyzeRequest {
  text: string;
}
