export type NotificationEvent = {
  icon: IconKey;
  bg: string;
  title: string;
  time: string;
  body: string;
};

export type IconKey = "user" | "check" | "pin" | "wallet" | "camera" | "badge";

export const ICON_PATHS: Record<IconKey, string> = {
  user: "M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-4A3.5 3.5 0 0 0 5 17.5V19M10.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M18 8v5M15.5 10.5h5",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18m-3.5-9 2.5 2.5 4.5-5",
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11m0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  wallet:
    "M3 7h15a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm0 0V6a2 2 0 0 1 2-2h11m2 9h.01",
  camera:
    "M4 8h3l1.5-2h7L17 8h3v11H4zm8 8.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7",
  badge:
    "M12 3l2.2 4.5 5 .7-3.6 3.5.9 4.9L12 14.3l-4.5 2.3.9-4.9L4.8 8.2l5-.7zM8 19h8",
};

export const EVENTS: NotificationEvent[] = [
  {
    icon: "user",
    bg: "#ffcf2d",
    title: "User signed up",
    time: "10m ago",
    body: "Kozhikode, KL",
  },
  {
    icon: "check",
    bg: "#b6f36a",
    title: "Worker verified",
    time: "12m ago",
    body: "Aadhaar + role eligibility",
  },
  {
    icon: "pin",
    bg: "#8fd0ff",
    title: "Shift check-in",
    time: "14m ago",
    body: "Retail audit · 12 of 12",
  },
  {
    icon: "wallet",
    bg: "#c9b3ff",
    title: "Payout released",
    time: "18m ago",
    body: "84 gig talents",
  },
  {
    icon: "camera",
    bg: "#ffb0d8",
    title: "Task proof uploaded",
    time: "21m ago",
    body: "Field survey · Coimbatore",
  },
  {
    icon: "badge",
    bg: "#7ce8cf",
    title: "Certification passed",
    time: "26m ago",
    body: "Annotation QA level 2",
  },
];
