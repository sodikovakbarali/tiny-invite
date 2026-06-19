export const questionCopy = {
  heading: "Will you go out with me?",
  yes: "Yes",
  no: "No",
  noFinal: "Okay fine 😭",
  dodgeMessages: [
    "Nice try 😄",
    "Still nope",
    "Almost got it",
    "So close",
    "Last chance",
  ],
};

export const yayCopy = {
  emoji: "💕✨💕",
  heading: "Yay!",
  subheading: "I'm so glad you said yes.",
  cta: "Press to continue",
};

export const dateCopy = {
  emoji: "📅💕",
  heading: "Pick a date",
  subheading: "Choose the day for our cute little plan.",
  cta: "Continue",
};

export const activityCopy = {
  emoji: "🍿🍝🌸",
  heading: "What would you like to do?",
  cta: "Continue",
};

export const messageCopy = {
  emoji: "💌",
  heading: "Anything else?",
  subheading: "Totally optional.",
  placeholder: "Tell me anything…",
  cta: "Continue",
};

export function getConfirmCopy(date: string, activity: string) {
  return {
    emoji: "✨",
    heading: "Ready?",
    summary: `${date} · ${activity}`,
    cta: "Lock it in",
  };
}

export const successCopy = {
  yes: {
    emoji: "💕",
    title: "Done!",
    body: "Got it. Can't wait 💕",
  },
  no: {
    emoji: "🙂",
    title: "All good",
    body: "No worries at all.",
  },
};
