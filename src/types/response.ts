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

export interface RequestMetadata {
  ip_address: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  language: string | null;
  referrer: string | null;
  user_agent: string | null;
}

export interface SubmitPayload {
  name?: string;
  answer: Answer;
  selected_date?: string;
  selected_activity?: string;
  message?: string;
}

export interface ResponseRecord extends RequestMetadata {
  id: string;
  name: string | null;
  answer: string;
  selected_date: string | null;
  selected_activity: string | null;
  message: string | null;
  created_at: string;
}

export interface PageViewRecord extends RequestMetadata {
  id: string;
  name: string | null;
  path: string;
  created_at: string;
}

export interface TrackPayload {
  name?: string;
  path?: string;
}
