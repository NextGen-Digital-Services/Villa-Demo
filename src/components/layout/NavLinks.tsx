"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  className?: string;
  itemClassName?: string;
  onItemClick?: () => void;
}

export function NavLinks({ className, itemClassName, onItemClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {siteConfig.nav.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "text-xs uppercase tracking-widest transition-colors font-medium relative py-1",
              isActive
                ? "text-cypress font-semibold"
                : "text-charcoal/80 hover:text-cypress",
              itemClassName
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
