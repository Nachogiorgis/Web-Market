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
      className="group inline-flex w-full cursor-pointer flex-col items-start justify-start overflow-hidden rounded-sm bg-white/90 shadow-[0px_20px_28px_-10px_rgba(0,0,0,0.05)] backdrop-blur-[50px] sm:w-[70%]"
    >
      <div className="h-60 self-stretch bg-white/0 px-2.5 py-2 transition-all duration-300 ease-out" />

      <div className="relative inline-flex h-auto w-full items-center justify-between gap-4 self-stretch border-t-[0.5px] border-black/10 p-3">
        <div className="inline-flex items-center justify-start gap-3">
          <div className="h-5 w-8 rounded-sm bg-white shadow-[0px_1px_32px_-4px_rgba(0,0,0,0.10)]" />
          <div className="flex flex-col items-start justify-start -space-y-0.5">
            <div className="line-clamp-1 justify-start font-['Neue_Montreal'] text-xs font-medium capitalize text-black/80">
              {title}
            </div>
            {subtitle && (
              <div className="pointer-events-none mt-0.5 line-clamp-1 h-0 overflow-hidden font-['Neue_Montreal'] text-[11px] font-normal capitalize text-black/45 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:h-auto group-hover:opacity-100">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {action && (
          <button className="pointer-events-none inline-flex h-7 min-w-7 items-center justify-center gap-1 rounded-md bg-black/[2.5%] px-2.5 py-2 opacity-0 transition-all duration-200 hover:bg-white/80 group-hover:pointer-events-auto group-hover:opacity-100">
            <p className="whitespace-nowrap font-['Neue_Montreal'] text-xs font-medium capitalize text-black/60">
              {action}
            </p>
            <ArrowRight className="w-4 stroke-black/30" />
          </button>
        )}
      </div>
    </div>
  );
}
