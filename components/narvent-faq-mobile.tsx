"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "What is Narvent?",
    a: "Narvent connects workers with flexible, paid work opportunities from businesses and AI companies. You can discover projects, complete tasks, and earn based on the work you take up.",
  },
  {
    q: "Who can join Narvent?",
    a: "Anyone who is eligible to work and meets the requirements of a particular project can register. Different projects may have different requirements such as location, skills, age, or availability.",
  },
  {
    q: "What kind of work is available?",
    a: "Work can include AI data collection, data annotation, asset audits, field surveys, verification, quality checks, and other on-ground or digital tasks.",
  },
  {
    q: "Do I need previous experience?",
    a: "Not always. Some projects are beginner-friendly and include instructions or training before you start. Projects that require specific skills or experience will mention those requirements.",
  },
  {
    q: "How do I get a project?",
    a: "After registering, you'll be considered for projects that match your profile, location, skills, and availability. When you're eligible for an opportunity, you'll receive the relevant project details and instructions.",
  },
  {
    q: "Is the work full-time or part-time?",
    a: "Most Narvent opportunities are flexible gig or project-based work. You can choose opportunities based on your availability, subject to each project's requirements.",
  },
  {
    q: "How much can I earn?",
    a: "Earnings depend on the project, task, location, and amount of work completed. Each opportunity will provide the applicable payment details before you begin.",
  },
  {
    q: "When will I get paid?",
    a: "Payments are processed according to the payment schedule and verification requirements of each project. You'll be informed of the payment terms when you join a project.",
  },
  {
    q: "Do I have to pay to register?",
    a: "No. You should not have to pay Narvent simply to register as a worker. Be cautious of anyone asking for money in exchange for guaranteed work or selection.",
  },
  {
    q: "What documents do I need?",
    a: "Requirements vary by project. You may be asked to provide basic identity, contact, payment, or eligibility information required to verify your participation and process payments.",
  },
  {
    q: "Can I work on multiple projects?",
    a: "This depends on the individual project rules. Some opportunities may allow you to participate in multiple projects, while others may require dedicated availability.",
  },
  {
    q: "What happens after I register?",
    a: "We'll review your information and match you with suitable opportunities. If you're selected for a project, you'll receive the details, requirements, instructions, and payment terms.",
  },
  {
    q: "How do I get help if I have a problem?",
    a: "You can contact the Narvent support team through the support channel provided for your project. For active projects, keep your project ID and relevant task details ready so we can resolve issues faster.",
  },
  {
    q: "Why should I join Narvent?",
    a: "Narvent gives you access to real project opportunities, flexible work, and a growing network of workers, so you can turn your skills and available time into income.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ease-out ${
        open ? "rotate-180" : "rotate-0"
      }`}
    >
      <path
        d="M4 6.5L9 11.5L14 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FAQRow({
  item,
  isLast,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={isLast ? "" : "border-b border-violet-200/10"}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`flex w-full items-start justify-between gap-3.5 px-1 py-4.5 text-left transition-colors ${
          isOpen ? "text-black/70" : "text-black/60"
        }`}
      >
        <span className="font-display text-[15.5px] font-medium leading-snug tracking-tight">
          {item.q}
        </span>
        <span
          className={`mt-0.5 transition-colors duration-200 ${
            isOpen ? "text-black/70" : "text-black/40"
          }`}
        >
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="m-0 px-1 pb-5 font-sans text-sm leading-relaxed text-black/60">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NarventFAQMobile() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-[#ffffff]">
      <div
        className="min-h-screen w-full max-w-[430px] px-5 pb-16 pt-12"
        style={{
          backgroundImage:
            "radial-gradient(120% 60% at 50% 0%, rgba(109,86,255,0.16) 0%, rgba(11,7,20,0) 55%)",
        }}
      >
        {/* Header */}
        <div className="mb-7">
          <h1 className="font-display text-[28px] font-semibold leading-tight tracking-tight text-black/70">
            Questions, answered
          </h1>
          <p className="mt-2.5 max-w-[34ch] font-sans text-[14.5px] leading-relaxed text-black/60">
            Everything you need to know before you start earning with Narvent.
          </p>
        </div>

        {/* FAQ card */}
        <div className="rounded-[18px] border border-[#6d56ff]/25 bg-white/[0.035] px-4 shadow-[0_20px_60px_-30px_rgba(109,86,255,0.35)] backdrop-blur-xl">
          {FAQ_DATA.map((item, index) => (
            <FAQRow
              key={item.q}
              item={item}
              isLast={index === FAQ_DATA.length - 1}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Support prompt */}
        <div className="mt-7 rounded-2xl border border-[#6d56ff]/20 bg-[#6d56ff]/[0.08] px-[18px] py-[18px]">
          <p className="m-0 font-sans text-[13.5px] leading-relaxed text-black/60">
            Still have a question? Reach your project's support channel
            directly.
          </p>
        </div>
      </div>
    </div>
  );
}
