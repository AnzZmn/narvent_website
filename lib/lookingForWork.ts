export type Role = {
  id: string;
  title: string;
  desc: string;
  photo: string; // replace with a real src once photography lands
};

export const ROLES: Role[] = [
  {
    id: "01",
    title: "Survey & data collection agent",
    desc: "Walk assigned routes, capture photos and readings on the app. Day rates from ₹700.",
    photo: "photo — agent on a survey route",
  },
  {
    id: "02",
    title: "Annotation & data entry",
    desc: "Label images, audio and text from a Narvent pod or from home. Training provided.",
    photo: "photo — annotation pod desk",
  },
  {
    id: "03",
    title: "Retail promoter",
    desc: "In-store demos, sampling and customer engagement for brand launches.",
    photo: "photo — promoter in a store aisle",
  },
  {
    id: "04",
    title: "Site & asset auditor",
    desc: "QR-scan assets, verify stock and file inspection reports across nearby sites.",
    photo: "photo — QR asset audit",
  },
  {
    id: "05",
    title: "Warehouse & logistics crew",
    desc: "Sorting, loading and dispatch shifts with fixed hours and same-week payouts.",
    photo: "photo — warehouse shift crew",
  },
  {
    id: "06",
    title: "Telecaller",
    desc: "Inbound and outbound calling in your language, from a centre or from home.",
    photo: "photo — telecaller headset",
  },
  {
    id: "07",
    title: "Merchant onboarding executive",
    desc: "Sign up local sellers, verify documents and set up their accounts on the ground.",
    photo: "photo — executive with a shopkeeper",
  },
  {
    id: "08",
    title: "Field technician support",
    desc: "On-site installs, checks and validation runs for enterprise and AI teams.",
    photo: "photo — technician on site",
  },
];

/** Interleaved so a repeated card never sits opposite itself across the gutter. */
export const COL_A = ROLES.filter((_, i) => i % 2 === 0);
export const COL_B = ROLES.filter((_, i) => i % 2 === 1);

export type Voice = {
  name: string;
  meta: string;
  accent: string;
  quote: string;
};

export const VOICES: Voice[] = [
  {
    name: "Name here",
    meta: "Survey agent · Kochi · 14 months",
    accent: "#c9f24d",
    quote:
      "I used to find work by asking around. Now the jobs come to my phone every morning and I pick what is close to home.",
  },
  {
    name: "Name here",
    meta: "Annotation pod · Coimbatore · 2 years",
    accent: "#5694ff",
    quote:
      "I started on data entry and moved to quality checks after training. Same pod, better pay.",
  },
  {
    name: "Name here",
    meta: "Warehouse crew · Hyderabad · 8 months",
    accent: "#8b7cff",
    quote:
      "Attendance is marked on the app, so there is no argument at the end of the month. Payment comes the same week.",
  },
];
