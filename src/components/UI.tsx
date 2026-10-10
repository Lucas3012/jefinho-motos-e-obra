import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
  action,
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { href: string; label: string };
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "text-center sm:flex-col sm:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {badge && <p className="badge mb-3">{badge}</p>}
        <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-steel-200">{description}</p>
        )}
      </div>

      {action && (
        <Link href={action.href} className="btn-ghost shrink-0">
          {action.label}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

