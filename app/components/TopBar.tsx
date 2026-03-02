"use client";

import { ReactNode, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type TopBarMode = "home" | "search";

type TopBarProps = {
  mode: TopBarMode;
  /** For home: when true, hide the center buttons (map/agent/categories) to make space for the compact search overlay */
  showCenterCollapsed?: boolean;
  /** For search results: compact search bar node to render in the center */
  compactSearchNode?: ReactNode;
  /** Optional: ad tabs configuration so the ad category strip can be rendered around the agent/feed picker */
  adTabsCount?: number;
  selectedAdIndex?: number;
  onSelectAdIndex?: (idx: number) => void;
};

export function TopBar({
  mode,
  showCenterCollapsed = false,
  compactSearchNode,
  adTabsCount,
  selectedAdIndex,
  onSelectAdIndex,
}: TopBarProps) {
  const router = useRouter();
  const [isAgentHovered, setIsAgentHovered] = useState(false);
  const [selectedAgentFeed, setSelectedAgentFeed] = useState<
    "today" | "nearYou" | "forYou" | "explore" | "following"
  >("forYou");

  const agentHoverTimeoutRef = useRef<number | null>(null);

  const agentExpanded =
    isAgentHovered || (mode === "home" && showCenterCollapsed);

  const hasAdTabs =
    typeof adTabsCount === "number" &&
    adTabsCount > 0 &&
    typeof selectedAdIndex === "number" &&
    !!onSelectAdIndex;

  const renderAgentFeedSwitcher = () => (
    <div
      onMouseEnter={() => {
        if (agentHoverTimeoutRef.current !== null) {
          window.clearTimeout(agentHoverTimeoutRef.current);
        }
        agentHoverTimeoutRef.current = window.setTimeout(() => {
          setIsAgentHovered(true);
        }, 500);
      }}
      onMouseLeave={() => {
        if (agentHoverTimeoutRef.current !== null) {
          window.clearTimeout(agentHoverTimeoutRef.current);
          agentHoverTimeoutRef.current = null;
        }
        setIsAgentHovered(false);
      }}
      className="relative mx-0.5 flex min-h-7 flex-shrink-0 items-center justify-center gap-0.5 overflow-hidden rounded-b-xl border-x-[0.50px] border-b-[0.50px] border-black/10 bg-white/[1%] px-1 py-1.5 backdrop-blur-lg transition-all duration-300 ease-out"
    >
      {!agentExpanded ? (
        <div className="flex h-5 w-10 items-center justify-center gap-1.5 rounded-md px-2 py-[3px]">
          <div className="h-3.5 w-3.5 rounded-[100px] bg-white" />
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-black/0">
          <div
            onClick={() => setSelectedAgentFeed("today")}
            className={`flex cursor-pointer items-center justify-center rounded-md px-4 py-1 transition-colors ${
              selectedAgentFeed === "today"
                ? "bg-black/0 text-black"
                : "text-black/40 hover:text-black/60"
            }`}
          >
            <div className="whitespace-nowrap font-['Neue_Montreal'] text-xs font-normal">
              Today
            </div>
          </div>
          <div className="h-3 w-0 outline outline-[0.50px] outline-black/5"></div>
          <div
            onClick={() => setSelectedAgentFeed("nearYou")}
            className={`flex cursor-pointer items-center justify-center rounded-md px-4 py-1 transition-colors ${
              selectedAgentFeed === "nearYou"
                ? "bg-black/0 text-black"
                : "text-black/40 hover:text-black/60"
            }`}
          >
            <div className="whitespace-nowrap font-['Neue_Montreal'] text-xs font-normal">
              Near You
            </div>
          </div>
          <div className="h-3 w-0 outline outline-[0.50px] outline-black/5"></div>
          <div
            onClick={() => setSelectedAgentFeed("forYou")}
            className={`flex cursor-pointer items-center justify-center rounded-md px-4 py-1 transition-colors ${
              selectedAgentFeed === "forYou"
                ? "bg-black/0 text-black"
                : "text-black/40 hover:text-black/60"
            }`}
          >
            <div className="whitespace-nowrap font-['Neue_Montreal'] text-xs font-normal">
              For You
            </div>
          </div>
          <div className="h-3 w-0 outline outline-[0.50px] outline-black/5"></div>
          <div
            onClick={() => setSelectedAgentFeed("explore")}
            className={`flex cursor-pointer items-center justify-center rounded-md px-4 py-1 transition-colors ${
              selectedAgentFeed === "explore"
                ? "bg-black/0 text-black"
                : "text-black/40 hover:text-black/60"
            }`}
          >
            <div className="whitespace-nowrap font-['Neue_Montreal'] text-xs font-normal">
              Explore
            </div>
          </div>
          <div className="h-3 w-0 outline outline-[0.50px] outline-black/5"></div>
          <div
            onClick={() => setSelectedAgentFeed("following")}
            className={`flex cursor-pointer items-center justify-center rounded-md px-4 py-1 transition-colors ${
              selectedAgentFeed === "following"
                ? "bg-black/0 text-black"
                : "text-black/40 hover:text-black/60"
            }`}
          >
            <div className="whitespace-nowrap font-['Neue_Montreal'] text-xs font-normal">
              Following
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAdButton = (idx: number) => {
    if (
      !hasAdTabs ||
      adTabsCount === undefined ||
      selectedAdIndex === undefined
    ) {
      return null;
    }
    const isSelected = idx === selectedAdIndex;
    return (
      <button
        type="button"
        key={idx}
        onClick={() => onSelectAdIndex && onSelectAdIndex(idx)}
        className={`h-3 w-5 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px] transition-all duration-300 ease-out group-hover:h-5 group-hover:w-8 group-hover:rounded-[4px] ${
          isSelected ? "bg-white/80" : "bg-white/10 hover:bg-white/60"
        }`}
      />
    );
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-[1000] inline-flex w-screen items-center justify-between p-3.5">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="flex h-7 w-7 items-center justify-center rounded-[10px] border-[0.50px] border-black/0 transition-colors hover:bg-black/[1%]"
      >
        {/* <Sparkle className="h-4 stroke-black/30" /> */}
      </button>

      {mode === "home" ? (
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center justify-center gap-3 overflow-hidden transition-all duration-300 ease-out">
          {hasAdTabs ? (
            <>
              {/* Medium screens: keep only the agent/feed picker */}
              <div className="hidden sm:flex lg:hidden">
                {renderAgentFeedSwitcher()}
              </div>

              {/* Extra-small + large screens: ad category strip with agent/feed picker centered */}
              <div className="no-scrollbar w-full items-center justify-center overflow-x-auto overflow-y-hidden px-5 sm:hidden lg:flex">
                {adTabsCount && adTabsCount > 0 ? (
                  <div className="no-scrollbar group flex min-w-max items-center gap-2.5 hover:gap-2">
                    {Array.from({ length: adTabsCount }, (_, idx) => idx)
                      .slice(0, Math.floor(adTabsCount / 2))
                      .map((idx) => renderAdButton(idx))}

                    {renderAgentFeedSwitcher()}

                    {Array.from({ length: adTabsCount }, (_, idx) => idx)
                      .slice(Math.floor(adTabsCount / 2))
                      .map((idx) => renderAdButton(idx))}
                  </div>
                ) : (
                  renderAgentFeedSwitcher()
                )}
              </div>
            </>
          ) : (
            renderAgentFeedSwitcher()
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 overflow-visible">
          <div className="w-[640px]">{compactSearchNode}</div>
        </div>
      )}

      <button
        type="button"
        className="flex h-7 w-7 items-center justify-center rounded-[10px] border-[0.50px] border-black/0 transition-colors hover:bg-black/[1%]"
      >
        {/* <TextAlignJustify className="h-4 stroke-black/30" /> */}
      </button>
    </div>
  );
}
