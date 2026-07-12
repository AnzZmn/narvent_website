import { fontMono } from "@/lib/utils";
import Link from "next/link";
export default function SocialLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[11px] font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
      style={fontMono}
    >
      {label}
    </Link>
  );
}
