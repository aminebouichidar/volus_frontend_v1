"use client";

import { ReactNode } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LockedTileProps {
  unlocked: boolean;
  label?: string;
  description?: string;
  onUpgrade?: () => void;
  upgradeHref?: string;
  children: ReactNode;
  blurAmount?: string;
  compact?: boolean;
}

export function LockedTile({
  unlocked,
  label = "Unlock to view",
  description,
  onUpgrade,
  upgradeHref,
  children,
  blurAmount = "sm",
  compact = false,
}: LockedTileProps) {
  const blurClass = !unlocked
    ? blurAmount === "md"
      ? "blur-md"
      : blurAmount === "lg"
        ? "blur-lg"
        : "blur-sm"
    : "";

  return (
    <div className="relative">
      {!unlocked && (
        <div className={cn(
          "absolute inset-0 z-20 flex items-center rounded-2xl bg-black/70 backdrop-blur",
          compact ? "flex-row justify-between px-4" : "flex-col justify-center p-6 text-center"
        )}>
          <div className={cn("flex items-center", compact ? "gap-2" : "flex-col gap-3")}>
            <Lock className={cn("text-indigo-200", compact ? "h-4 w-4 shrink-0" : "h-6 w-6")} />
            <p className={cn("font-semibold text-white", compact ? "text-xs whitespace-nowrap" : "text-sm")}>{label}</p>
          </div>
          
          {description && !compact && <p className="mt-1 text-xs text-gray-200/80">{description}</p>}
          
          {onUpgrade && !upgradeHref && (
            <Button
              onClick={onUpgrade}
              className={cn(
                "rounded-full bg-white font-semibold text-black hover:bg-gray-200",
                compact ? "h-7 px-3 text-xs" : "mt-4 h-9 px-5 text-sm"
              )}
            >
              {compact ? "Upgrade" : "Upgrade plan"}
            </Button>
          )}
          {upgradeHref && (
            <Button asChild className={cn(
              "rounded-full bg-white font-semibold text-black hover:bg-gray-200",
              compact ? "h-7 px-3 text-xs" : "mt-4 h-9 px-5 text-sm"
            )}>
              <Link href={upgradeHref}>{compact ? "Upgrade" : "Upgrade plan"}</Link>
            </Button>
          )}
        </div>
      )}
      <div className={cn(!unlocked && "pointer-events-none select-none opacity-65", blurClass)}>
        {children}
      </div>
    </div>
  );
}
