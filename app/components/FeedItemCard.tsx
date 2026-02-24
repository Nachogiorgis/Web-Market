import { ArrowRight } from "lucide-react";

export type FeedItemCardProps = {
  title: string;
  subtitle?: string;
  action?: string;
  onClick?: () => void;
};

export function FeedItemCard({
  title,
  subtitle,
  action,
  onClick,
}: FeedItemCardProps) {
  return (
    <div
      onClick={onClick}
      className="group inline-flex w-full cursor-pointer flex-col items-start justify-start overflow-hidden rounded bg-white/30 shadow-[0px_4px_34px_-10px_rgba(0,0,0,0.035)] backdrop-blur-lg"
    >
      <div className="relative inline-flex items-center justify-start gap-4 self-stretch p-5">
        <div className="h-9 w-14 rounded-sm bg-white shadow-[0px_2px_20px_-8px_rgba(0,0,0,0.05)]" />
        <div className="flex flex-col items-start justify-start gap-0">
          <div className="justify-start font-['Neue_Montreal'] text-sm font-normal text-black/80">
            {title}
          </div>
          {subtitle && (
            <div className="pointer-events-none h-0 justify-start overflow-hidden font-['Neue_Montreal'] text-xs font-normal text-black/40 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:h-auto group-hover:opacity-100">
              {subtitle}
            </div>
          )}
        </div>
        {action && (
          <button className="pointer-events-none absolute right-5 top-1/2 flex h-7 min-w-7 -translate-y-1/2 items-center justify-center gap-1 rounded-md bg-black/[2.5%] px-2.5 py-2 opacity-0 transition-all duration-200 hover:bg-white/80 group-hover:pointer-events-auto group-hover:opacity-100">
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
