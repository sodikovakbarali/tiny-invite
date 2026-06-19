export const questionCopy = {
  heading: "Will you go out with me?",
  yes: "Yes",
  no: "No",
  noFinal: "Okay fine 😭",
  noClickThreshold: 10,
  dodgeMessages: [
    "Nice try 😄",
    "Still nope",
    "Almost got it",
    "So close",
    "Getting warmer",
    "Not quite",
    "Keep trying",
    "Still running",
    "One more chase",
    "Last chance",
  ],
};

export const yayCopy = {
  emoji: "🥹",
  heading: "Wait, really?",
  subheading: "Give me one second to calm down.",
  cta: "Okay — let's plan it",
};

export const dateCopy = {
  emoji: "🗓️",
  heading: "When works for you?",
  subheading: "Pick a day that feels right.",
  cta: "Next",
};

export const activityCopy = {
  emoji: "🕌✨",
  heading: "What's the vibe?",
  subheading: "Pick something fun in Bukhara.",
  cta: "Next",
};

export const messageCopy = {
  emoji: "💬",
  heading: "Last little note?",
  subheading: "Only if you want to.",
  placeholder: "Anything I should know…",
  cta: "Almost done",
};

export function getConfirmCopy(
  date: string,
  activity: string,
  message?: string,
) {
  return {
    badge: "Your date ticket",
    heading: "Does this look right?",
    whenLabel: "When",
    planLabel: "The plan",
    noteLabel: "Your note",
    date,
    activity,
    message: message?.trim() || null,
    cta: "Send it my way 💌",
    retryCta: "Try sending again",
    fallbackCta: "Just count me in anyway",
    backLabel: "← Change something",
  };
}

export const successCopy = {
  yes: {
    emoji: "💕",
    title: "It's official!",
    body: "Saved. I'll be in touch soon — get ready for me to be slightly nervous.",
  },
  yesOffline: {
    emoji: "💕",
    title: "It's a yes from me!",
    body: "My server glitched, but I got the message. I'll text you to confirm the details 💕",
  },
  no: {
    emoji: "😌",
    title: "Fair enough",
    body: "You finally caught the button. No hard feelings — I'll delete this from my brain immediately.",
  },
};

const submitErrorMessages: Record<string, string> = {
  "Failed to save response.":
    "Couldn't save this yet — give it one more try.",
  "Server not configured.":
    "Saving isn't set up on the live site yet. Tap below to continue anyway.",
  "Invalid request body.":
    "That didn't go through. Mind giving it another shot?",
};

export function getSubmitErrorMessage(raw?: string) {
  if (!raw) {
    return "Something went wrong. Try again?";
  }
  return submitErrorMessages[raw] ?? "Oops — try that one more time?";
}
