import WorkerRegistrationForm from "@/components/Register";
import { Suspense } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Narvent",

  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkerRegistrationForm />
    </Suspense>
  );
}
