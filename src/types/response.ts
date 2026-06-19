export type Answer = "yes" | "no";

export type InviteStep =
  | "question"
  | "yay"
  | "date"
  | "activity"
  | "message"
  | "confirm"
  | "success"
  | "no-respect";

export interface SubmitPayload {
  name?: string;
  answer: Answer;
  selected_date?: string;
  selected_activity?: string;
  message?: string;
}

export interface ResponseRecord {
  id: string;
  name: string | null;
  answer: string;
  selected_date: string | null;
  selected_activity: string | null;
  message: string | null;
  user_agent: string | null;
  created_at: string;
}
