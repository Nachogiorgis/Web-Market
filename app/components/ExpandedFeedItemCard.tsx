import { ArrowRight } from "lucide-react";

import type { FeedItemCardProps } from "./FeedItemCard";

export type ExpandedFeedItemCardProps = FeedItemCardProps;

export function ExpandedFeedItemCard({
  title,
  subtitle,
  action,
  onClick,
}: ExpandedFeedItemCardProps) {
  return (
    <div
      onClick={onClick}
      className="group inline-flex w-[560px] cursor-pointer flex-col items-start justify-start overflow-hidden rounded-md bg-white/90 shadow-[0px_24px_34px_-10px_rgba(0,0,0,0.025)] backdrop-blur-[50px]"
    >
      <div className="h-60 self-stretch bg-white/0 px-2.5 py-2" />

      <div className="relative inline-flex h-[60px] w-full items-center justify-between gap-4 self-stretch border-t-[0.5px] border-black/10 p-4">
        <div className="inline-flex items-center justify-start gap-4">
          <div className="h-5 w-8 rounded-sm bg-white shadow-[0px_1px_32px_-4px_rgba(0,0,0,0.10)]" />
          <div className="flex flex-col items-start justify-start -space-y-0.5">
            <div className="justify-start font-['Neue_Montreal'] text-xs font-medium text-black/80">
              {title}
            </div>
            {subtitle && (
              <div className="pointer-events-none mt-0.5 h-0 overflow-hidden font-['Neue_Montreal'] text-[11px] font-normal text-black/45 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:h-auto group-hover:opacity-100">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {action && (
          <button className="pointer-events-none inline-flex h-7 min-w-7 items-center justify-center gap-1 rounded-md bg-black/[2.5%] px-2.5 py-2 opacity-0 transition-all duration-200 hover:bg-white/80 group-hover:pointer-events-auto group-hover:opacity-100">
            <p className="font-['Neue_Montreal'] text-xs font-normal text-black/60">
              {action}
            </p>
            <ArrowRight className="w-4 stroke-black/30" />
          </button>
        )}
      </div>
    </div>
  );
}
