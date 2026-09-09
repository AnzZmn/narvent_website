import type { SVGProps } from "react";

const PATHS = {
  robot: "M12 3v2M8 7h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2ZM9.5 11.5h.01M14.5 11.5h.01M9 20h6",
  doc: "M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7l-4-4ZM14 3v4h4M9.5 13h5M9.5 16.5h3",
  org: "M12 4.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM12 8.1V12M5 19.5v-2.2h14v2.2M5 12h14",
  flag: "M6 21V4M6 4h11l-2.2 3.4L17 11H6",
  clipboard: "M9 4h6v3H9zM7 6H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 18 6h-1",
  phone: "M6.5 4h3l1.4 3.6-1.9 1.4a12 12 0 0 0 5 5l1.4-1.9L19 13.5v3a1.6 1.6 0 0 1-1.8 1.6A14.5 14.5 0 0 1 4.9 5.8 1.6 1.6 0 0 1 6.5 4Z",
  list: "M4 6h11M4 11h11M4 16h7M18.5 13.5v6M18.5 13.5l2.5 2M18.5 13.5l-2.5 2",
  badge: "M5 4.5h14v15H5zM12 9.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM8.6 15.4a3.6 3.6 0 0 1 6.8 0",
  gift: "M4.5 9.5h15v3h-15zM6 12.5v7h12v-7M12 9.5v10M9 9.5a2 2 0 1 1 3-2.6 2 2 0 1 1 3 2.6",
  users: "M9 11.4a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM3.5 19.5a5.5 5.5 0 0 1 11 0M16 5.6a3.2 3.2 0 0 1 0 5.9M17.5 14.6a5.5 5.5 0 0 1 3 4.9",
  bag: "M6 8h12l-1 12H7L6 8ZM9 8V6.5a3 3 0 0 1 6 0V8M12 12v4M10 14h4",
  chart: "M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7l-4-4ZM14 3v4h4M9 16.5l2.4-3 1.9 1.7L16 11",
} as const;

export type IconName = keyof typeof PATHS;

export default function OfferingIcon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
