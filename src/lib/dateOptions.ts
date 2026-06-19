export const DATE_OPTIONS = [
  { id: "friday-evening", label: "Friday evening" },
  { id: "saturday-afternoon", label: "Saturday afternoon" },
  { id: "sunday-evening", label: "Sunday evening" },
  { id: "custom", label: "Custom date" },
] as const;

export type DateOptionId = (typeof DATE_OPTIONS)[number]["id"];
