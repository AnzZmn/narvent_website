"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type FormData = {
  fullName: string;
  phone: string;

  whatsappSame: "yes" | "no" | "";
  whatsappNumber: string;

  isStudent: "yes" | "no" | "";
  college: string;

  dob: string;
  gender: "Male" | "Female" | "Other" | "";

  district: string;
  currentLocation: string;
  pincode: string;

  qualification: string;
  skills: string;

  vehicle: "Yes - Bike" | "Yes - Car" | "Yes - Other" | "No" | "";

  availableDays: string[];
};

const districts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WorkerRegistrationForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const phoneFromURL = searchParams.get("contact") || "";

  const initialForm: FormData = {
    fullName: "",
    phone: phoneFromURL,

    whatsappSame: "",
    whatsappNumber: "",

    isStudent: "",
    college: "",

    dob: "",
    gender: "",

    district: "",
    currentLocation: "",
    pincode: "",

    qualification: "",
    skills: "",

    vehicle: "",

    availableDays: [],
  };
  const [form, setForm] = useState<FormData>(initialForm);

  /*
   * Sections dynamically change depending on the answers.
   *
   * Section 2:
   * WhatsApp number is only required when whatsappSame === "no"
   *
   * Section 4:
   * College is only required when isStudent === "yes"
   */

  const sections = useMemo(() => {
    const result = [
      {
        id: 1,
        title: "Basic Details",
        description: "Let's start with your contact details.",
      },
    ];

    if (form.whatsappSame === "no") {
      result.push({
        id: 2,
        title: "WhatsApp Number",
        description: "Enter the WhatsApp number we can contact you on.",
      });
    }

    result.push({
      id: result.length + 1,
      title: "Student Details",
      description: "Tell us about your current education status.",
    });

    if (form.isStudent === "yes") {
      result.push({
        id: result.length + 1,
        title: "Education",
        description: "Tell us where you are studying.",
      });
    }

    result.push({
      id: result.length + 1,
      title: "Personal Details",
      description: "A few more details to help us match you with work.",
    });

    return result;
  }, [form.whatsappSame, form.isStudent]);

  const currentSection = sections[step - 1];

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const toggleDay = (day: string) => {
    setForm((prev) => {
      const exists = prev.availableDays.includes(day);

      return {
        ...prev,
        availableDays: exists
          ? prev.availableDays.filter((d) => d !== day)
          : [...prev.availableDays, day],
      };
    });

    setErrors((prev) => ({
      ...prev,
      availableDays: "",
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentSection.title === "Basic Details") {
      if (!form.fullName.trim()) {
        newErrors.fullName = "Please enter your full name.";
      }

      if (!/^[0-9]{10}$/.test(form.phone)) {
        newErrors.phone = "Enter a valid 10-digit mobile number.";
      }

      if (!form.whatsappSame) {
        newErrors.whatsappSame =
          "Please select whether your WhatsApp number is the same.";
      }
    }

    if (currentSection.title === "WhatsApp Number") {
      if (!/^[0-9]{10}$/.test(form.whatsappNumber)) {
        newErrors.whatsappNumber = "Enter a valid 10-digit WhatsApp number.";
      }
    }

    if (currentSection.title === "Student Details") {
      if (!form.isStudent) {
        newErrors.isStudent = "Please select an option.";
      }
    }

    if (currentSection.title === "Education") {
      if (!form.college.trim()) {
        newErrors.college = "Please enter your college or institute.";
      }
    }

    if (currentSection.title === "Personal Details") {
      if (!form.dob) {
        newErrors.dob = "Please enter your date of birth.";
      }

      if (!form.gender) {
        newErrors.gender = "Please select your gender.";
      }

      if (!form.district) {
        newErrors.district = "Please select your district.";
      }

      if (!form.currentLocation.trim()) {
        newErrors.currentLocation = "Please enter your current location.";
      }

      if (!/^[0-9]{6}$/.test(form.pincode)) {
        newErrors.pincode = "Enter a valid 6-digit PIN code.";
      }

      if (!form.qualification.trim()) {
        newErrors.qualification = "Please enter your qualification.";
      }

      if (!form.skills.trim()) {
        newErrors.skills = "Please enter your skills.";
      }

      if (!form.vehicle) {
        newErrors.vehicle = "Please select an option.";
      }

      if (form.availableDays.length === 0) {
        newErrors.availableDays = "Select at least one available day.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;

    if (step < sections.length) {
      setStep((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const back = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const submit = () => {
    if (!validateStep()) return;

    console.log("Worker registration:", form);

    /*
     * Replace this with your API call:
     *
     * await fetch("/api/workers/register", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify(form),
     * });
     */

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7f5ff] px-4 py-8">
        <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#6d56ff]/10">
              <svg
                className="h-10 w-10 text-[#6d56ff]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Registration Complete!
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Thank you for registering with Narvent. We&apos;ll contact you
              when a suitable opportunity becomes available.
            </p>

            <button
              onClick={() => {
                setForm(initialForm);
                setStep(1);
                setSubmitted(false);
              }}
              className="mt-7 w-full rounded-2xl bg-[#6d56ff] px-5 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98]"
            >
              Register Another Worker
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] w-full max-w-md items-center justify-between px-5">
          <div className="flex items-center gap-3">
            {/* Replace with your Narvent logo */}

            <Image
              src="/NarventSVG.svg"
              alt="logo"
              className="object-contain"
              width={20}
              height={20}
            />

            <div>
              <p className="text-sm font-bold leading-none">Narvent</p>
              <p className="mt-1 text-[11px] text-gray-500">
                Worker Registration
              </p>
            </div>
          </div>

          <span className="text-xs font-medium text-gray-400">
            {step}/{sections.length}
          </span>
        </div>

        {/* Progress */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-[#6d56ff] transition-all duration-500"
            style={{
              width: `${(step / sections.length) * 100}%`,
            }}
          />
        </div>
      </header>

      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-6">
        {/* Section heading */}
        <div className="mb-6 px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6d56ff]">
            Step {step}
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950">
            {currentSection.title}
          </h1>

          <p className="mt-1.5 text-sm leading-5 text-gray-500">
            {currentSection.description}
          </p>
        </div>

        {/* FORM SECTIONS */}

        {currentSection.title === "Basic Details" && (
          <div className="space-y-4">
            <InputCard
              label="Full Name"
              required
              description="Enter your full name"
              error={errors.fullName}
            >
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                className={inputClass}
              />
            </InputCard>

            <InputCard
              label="Phone Number"
              required
              description="Enter your 10-digit mobile number"
              error={errors.phone}
            >
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                readOnly={!!phoneFromURL}
                onChange={(e) =>
                  update(
                    "phone",
                    e.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                placeholder="10-digit mobile number"
                autoComplete="tel"
                className={cn(
                  `${phoneFromURL ? "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-[15px] text-gray-900 outline-none transition placeholder:text-gray-400 cursor-not-allowed pointer-events-none " : inputClass}`,
                )}
              />
            </InputCard>

            <RadioCard
              label="Is your WhatsApp number the same as your phone number?"
              required
              options={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
              value={form.whatsappSame}
              onChange={(value) =>
                update("whatsappSame", value as "yes" | "no")
              }
              error={errors.whatsappSame}
            />
          </div>
        )}

        {currentSection.title === "WhatsApp Number" && (
          <div className="space-y-4">
            <InputCard
              label="WhatsApp Number"
              required
              description="Enter your 10-digit WhatsApp number"
              error={errors.whatsappNumber}
            >
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.whatsappNumber}
                onChange={(e) =>
                  update(
                    "whatsappNumber",
                    e.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                placeholder="10-digit WhatsApp number"
                className={inputClass}
              />
            </InputCard>
          </div>
        )}

        {currentSection.title === "Student Details" && (
          <div className="space-y-4">
            <RadioCard
              label="Are you a Student?"
              required
              options={[
                ["yes", "Yes"],
                ["no", "No"],
              ]}
              value={form.isStudent}
              onChange={(value) => update("isStudent", value as "yes" | "no")}
              error={errors.isStudent}
            />
          </div>
        )}

        {currentSection.title === "Education" && (
          <div className="space-y-4">
            <InputCard
              label="College / Institute"
              required
              description="Enter your college or institute name"
              error={errors.college}
            >
              <input
                type="text"
                value={form.college}
                onChange={(e) => update("college", e.target.value)}
                placeholder="College / institute name"
                className={inputClass}
              />
            </InputCard>
          </div>
        )}

        {currentSection.title === "Personal Details" && (
          <div className="space-y-4">
            {/* DOB */}
            <InputCard label="Date of Birth" required error={errors.dob}>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
                className={inputClass}
              />
            </InputCard>

            {/* Gender */}
            <RadioCard
              label="Gender"
              required
              options={[
                ["Male", "Male"],
                ["Female", "Female"],
                ["Other", "Other"],
              ]}
              value={form.gender}
              onChange={(value) =>
                update("gender", value as "Male" | "Female" | "Other")
              }
              error={errors.gender}
            />

            {/* District */}
            <InputCard label="District" required error={errors.district}>
              <select
                value={form.district}
                onChange={(e) => update("district", e.target.value)}
                className={inputClass}
              >
                <option value="">Select your district</option>

                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </InputCard>

            {/* Current Location */}
            <InputCard
              label="Current Location"
              required
              description="Where are you currently staying?"
              error={errors.currentLocation}
            >
              <input
                type="text"
                value={form.currentLocation}
                onChange={(e) => update("currentLocation", e.target.value)}
                placeholder="Area / locality"
                className={inputClass}
              />
            </InputCard>

            {/* PIN */}
            <InputCard label="PIN Code" required error={errors.pincode}>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={6}
                value={form.pincode}
                onChange={(e) =>
                  update(
                    "pincode",
                    e.target.value.replace(/\D/g, "").slice(0, 6),
                  )
                }
                placeholder="6-digit PIN code"
                className={inputClass}
              />
            </InputCard>

            {/* Qualification */}
            <InputCard
              label="Qualification"
              required
              description="Example: Plus Two, B.Com, B.Tech Mechanical Engineering"
              error={errors.qualification}
            >
              <input
                type="text"
                value={form.qualification}
                onChange={(e) => update("qualification", e.target.value)}
                placeholder="Your highest qualification"
                className={inputClass}
              />
            </InputCard>

            {/* Skills */}
            <InputCard
              label="Skills"
              required
              description="Example: Catering, Driving, Photography, MS Office"
              error={errors.skills}
            >
              <textarea
                value={form.skills}
                onChange={(e) => update("skills", e.target.value)}
                placeholder="Enter your skills"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </InputCard>

            {/* Vehicle */}
            <RadioCard
              label="Do you have your own vehicle?"
              required
              options={[
                ["Yes - Bike", "Yes - Bike"],
                ["Yes - Car", "Yes - Car"],
                ["Yes - Other", "Yes - Other"],
                ["No", "No"],
              ]}
              value={form.vehicle}
              onChange={(value) =>
                update(
                  "vehicle",
                  value as "Yes - Bike" | "Yes - Car" | "Yes - Other" | "No",
                )
              }
              error={errors.vehicle}
            />

            {/* Available days */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="px-5 pb-2 pt-5">
                <label className="text-[15px] font-semibold text-gray-900">
                  Which days are you usually available?
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Select all days when you are generally available.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {/* Any day */}
                <label className="flex min-h-[54px] cursor-pointer items-center gap-3 px-5 active:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={form.availableDays.length === days.length}
                    onChange={(e) => {
                      update(
                        "availableDays",
                        e.target.checked ? [...days] : [],
                      );
                    }}
                    className="h-5 w-5 rounded border-gray-300 accent-[#6d56ff]"
                  />

                  <span className="text-sm font-medium">Any day</span>
                </label>

                {days.map((day) => (
                  <label
                    key={day}
                    className="flex min-h-[54px] cursor-pointer items-center gap-3 px-5 active:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={form.availableDays.includes(day)}
                      onChange={() => toggleDay(day)}
                      className="h-5 w-5 rounded border-gray-300 accent-[#6d56ff]"
                    />

                    <span className="text-sm text-gray-800">{day}</span>
                  </label>
                ))}
              </div>

              {errors.availableDays && (
                <p className="px-5 py-3 text-xs font-medium text-red-500">
                  {errors.availableDays}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bottom navigation */}
        <div className="mt-7 flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 shadow-sm transition active:scale-[0.98]"
            >
              Back
            </button>
          )}

          {step < sections.length ? (
            <button
              type="button"
              onClick={next}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#6d56ff] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(109,86,255,0.25)] transition active:scale-[0.98]"
            >
              Continue
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#6d56ff] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(109,86,255,0.25)] transition active:scale-[0.98]"
            >
              Complete Registration
            </button>
          )}
        </div>

        <p className="mt-5 text-center text-[11px] leading-5 text-gray-400">
          Your information will only be used for worker registration and job
          opportunities through Narvent.
        </p>
      </div>
    </main>
  );
}

/* -------------------------------------------------------
   Reusable Components
------------------------------------------------------- */

const inputClass =
  "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-[15px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#6d56ff] focus:bg-white focus:ring-4 focus:ring-[#6d56ff]/10";

function InputCard({
  label,
  description,
  required,
  error,
  children,
}: {
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <label className="block text-[15px] font-semibold text-gray-900">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {description && (
        <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
      )}

      {children}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}

function RadioCard({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: [string, string][];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="px-5 pb-2 pt-5">
        <label className="text-[15px] font-semibold leading-6 text-gray-900">
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>

      <div className="divide-y divide-gray-100">
        {options.map(([optionValue, optionLabel]) => (
          <label
            key={optionValue}
            className="flex min-h-[58px] cursor-pointer items-center gap-3 px-5 active:bg-gray-50"
          >
            <input
              type="radio"
              name={label}
              value={optionValue}
              checked={value === optionValue}
              onChange={(e) => onChange(e.target.value)}
              className="h-5 w-5 border-gray-300 accent-[#6d56ff]"
            />

            <span className="text-sm text-gray-800">{optionLabel}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="px-5 py-3 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
