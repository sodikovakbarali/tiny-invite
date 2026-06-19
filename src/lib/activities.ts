import { Film, Coffee, Gift, Sun, UtensilsCrossed, LucideIcon } from "lucide-react";

export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const ACTIVITIES: ActivityOption[] = [
  {
    id: "picnic",
    title: "Picnic date",
    description:
      "Blanket, snacks, sunset, and pretending we are in a movie.",
    icon: Sun,
  },
  {
    id: "cinema",
    title: "Cinema date",
    description: "Movie first, then we judge it like professional critics.",
    icon: Film,
  },
  {
    id: "coffee",
    title: "Coffee date",
    description: "Low pressure, high caffeine.",
    icon: Coffee,
  },
  {
    id: "dinner",
    title: "Dinner date",
    description: "More serious. More dangerous. Better outfit required.",
    icon: UtensilsCrossed,
  },
  {
    id: "surprise",
    title: "Surprise me",
    description: "I plan everything. You just show up looking unfairly good.",
    icon: Gift,
  },
];
