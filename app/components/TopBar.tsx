"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

type TopBarMode = "home" | "search";

type TopBarProps = {
  mode: TopBarMode;
  /** For home: when true, hide the center buttons (map/agent/categories) to make space for the compact search overlay */
  showCenterCollapsed?: boolean;
  /** For search results: compact search bar node to render in the center */
  compactSearchNode?: ReactNode;
};

export function TopBar({
  mode,
  showCenterCollapsed = false,
  compactSearchNode,
}: TopBarProps) {
  const router = useRouter();
  const [isAgentHovered, setIsAgentHovered] = useState(false);
  const [selectedAgentFeed, setSelectedAgentFeed] = useState<
    "today" | "nearYou" | "forYou" | "explore" | "following"
  >("forYou");

  const agentExpanded =
    isAgentHovered || (mode === "home" && showCenterCollapsed);

  return (
    <div className="fixed left-0 right-0 top-0 z-[1000] inline-flex w-screen items-center justify-between p-3.5">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="h-7 w-7 rounded-[10px] border-[0.50px] border-black/20 transition-colors hover:bg-black/[1%]"
      />

      {mode === "home" ? (
        <div className="flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 ease-out">
          {/* Map */}
          {/* <div className="flex h-7 w-7 items-center justify-center rounded-xl p-1 outline outline-[0.50px] outline-offset-[-0.50px] outline-black/15 backdrop-blur-none hover:bg-black/[1%]">
            <Map className="h-3.5 stroke-black/30" />
          </div> */}

          {/* Agent – And current feed displayed: Today, Near You, For You, Explore, Following */}
          <div
            onMouseEnter={() => setIsAgentHovered(true)}
            onMouseLeave={() => setIsAgentHovered(false)}
            className="relative flex h-7 items-center justify-center gap-0.5 overflow-hidden rounded-xl p-1 outline outline-[0.50px] outline-offset-[-0.50px] outline-black/15 transition-all duration-300 ease-out hover:bg-black/[1%]"
          >
            {!agentExpanded ? (
              <div className="flex h-5 w-14 items-center justify-center gap-1.5 rounded-md px-4 py-[3px]">
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

          {/* Categories */}
          {/* <div className="flex h-7 w-7 items-center justify-center rounded-xl p-1 outline outline-[0.50px] outline-offset-[-0.50px] outline-black/15 backdrop-blur-none hover:bg-black/[1%]">
            <Rows3 className="h-3.5 stroke-black/30" />
          </div> */}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 overflow-visible">
          <div className="w-[640px]">{compactSearchNode}</div>
        </div>
      )}

      <div className="h-7 w-7 rounded-[10px] border-[0.50px] border-black/20" />
    </div>
  );
}
