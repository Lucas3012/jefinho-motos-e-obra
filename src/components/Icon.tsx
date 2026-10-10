import type { SVGProps } from "react";

type IconName =
  | "wrench"
  | "oil"
  | "chain"
  | "brake"
  | "bolt"
  | "wheel"
  | "spring"
  | "bike"
  | "cement"
  | "steel"
  | "sand"
  | "paint"
  | "pipe"
  | "wood"
  | "phone"
  | "whatsapp"
  | "map"
  | "clock"
  | "check"
  | "search"
  | "menu"
  | "close"
  | "star"
  | "shield"
  | "truck"
  | "tag"
  | "user"
  | "plus"
  | "trash"
  | "edit"
  | "arrow"
  | "chevron"
  | "hammer"
  | "mail"
  | "calendar"
  | "box";

const PATHS: Record<IconName, string> = {
  wrench:
    "M14.7 6.3a4 4 0 0 0 5 5l-8.6 8.6a2.1 2.1 0 0 1-3-3l8.6-8.6a4 4 0 0 0-5-5l3 3-2.1 2.1-3-3z",
  oil: "M12 2.7c2.6 3.2 6 6.9 6 10.4a6 6 0 1 1-12 0c0-3.5 3.4-7.2 6-10.4z",
  chain:
    "M9 7h2a4 4 0 0 1 0 8H9a4 4 0 0 1 0-8zm4 0h2a4 4 0 0 1 0 8h-2M7 11h10",
  brake:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6l1-8z",
  wheel:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21",
  spring: "M4 6h16M4 6l16 3M4 9l16 3M4 12l16 3M4 15l16 3M4 18h16",
  bike: "M5.5 18.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm13 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5.5 15 9 8h5l3 7M9 8h6",
  cement:
    "M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7zM4 8.5l8 4.5m0 0 8-4.5m-8 4.5V20",
  steel: "M6 20V6m4 14V4m4 16V8m4 12V5M3 20h18",
  sand: "M2 20h20L14.5 7.5 10.5 13 8 10z",
  paint:
    "M5 4h11a2 2 0 0 1 2 2v4H5V4zm8.5 8v3.5a2 2 0 0 1-2 2H9v3.5",
  pipe: "M4 9h16v6H4zM4 9V7m16 2V7M4 15v2m16-2v2",
  wood: "M3 7h18v4H3zm0 6h18v4H3zM7 7v4m5-4v4m5-4v4M9 13v4m6-4v4",
  phone:
    "M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 13 11 21 19.4 21A1.5 1.5 0 0 0 21 19.5v-2a1 1 0 0 0-.8-1l-3.5-.7a1 1 0 0 0-1 .4l-1 1.4a13.6 13.6 0 0 1-6.3-6.3l1.4-1a1 1 0 0 0 .4-1l-.7-3.5a1 1 0 0 0-1-.8z",
  whatsapp:
    "M12 2.6a9.4 9.4 0 0 0-8.1 14L2.6 21.4l5-1.3A9.4 9.4 0 1 0 12 2.6zm4.6 13c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-3.2-.7a11 11 0 0 1-4.4-4.4c-.8-1.4-.7-2.3-.4-2.6.2-.3.6-.5.9-.5h.6c.2 0 .4-.1.6.5l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a8.6 8.6 0 0 0 3.7 3.2c.3.1.4.1.6-.1l.7-.9c.2-.2.3-.2.5-.1l1.9.9c.2.1.4.2.4.3z",
  map: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v5.2l3.4 2",
  check: "M4.5 12.5 9 17 19.5 6.5",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm5.5 12L21 20.5",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  star: "m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z",
  shield: "M12 3 5 6v6c0 4.4 3 8.1 7 9 4-.9 7-4.6 7-9V6z",
  truck: "M3 7h11v9H3zm11 3h4l3 3v3h-7zM7 19.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zm11 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z",
  tag: "M3 12.5V4h8.5L21 13.5 13.5 21zM7.5 7.5h.01",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 8.5a8 8 0 0 1 16 0",
  plus: "M12 5v14M5 12h14",
  trash: "M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13",
  edit: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z",
  arrow: "M4 12h15m0 0-6-6m6 6-6 6",
  chevron: "m6 9 6 6 6-6",
  hammer:
    "M13 4.5 9.5 8l2 2 3.5-3.5a4.5 4.5 0 0 1-6 6L4 17.5a2.1 2.1 0 0 0 3 3l6.5-4.5a4.5 4.5 0 0 0 6-6z",
  mail: "M3 6h18v12H3zm0 0 9 7 9-7",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4m8-4v4",
  box: "M4 8l8-4 8 4v8l-8 4-8-4zm0 0 8 4m0 0 8-4m-8 4v8",
};

const ALIASES: Record<string, IconName> = {
  freios: "brake",
  eletrica: "bolt",
  suspensao: "wheel",
  rolamentos: "wheel",
  transmissao: "chain",
  filtros: "oil",
  oleo: "oil",
  argamassa: "cement",
  aco: "steel",
  areia: "sand",
  tintas: "paint",
  hidraulica: "pipe",
  madeira: "wood",
};

export function getIconName(name?: string | null): IconName {
  if (!name) return "wrench";
  const key = name.toLowerCase();
  if (key in PATHS) return key as IconName;
  return ALIASES[key] ?? "wrench";
}

type Props = Omit<SVGProps<SVGSVGElement>, "name"> & { name?: string | null };

export function Icon({ name, className, ...rest }: Props) {
  const d = PATHS[getIconName(name)];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-6 w-6"}
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className ?? "h-5 w-5"}>
      <path d={PATHS.whatsapp} />
    </svg>
  );
}
