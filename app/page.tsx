"use client";

import {
  Compass,
  Dice5,
  Landmark,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FeedItemCard } from "./components/FeedItemCard";
import { BottomBar } from "./components/BottomBar";
import { TopBar } from "./components/TopBar";

type FeedCategory =
  | "explore"
  | "creating"
  | "learning"
  | "earning"
  | "banking"
  | "investing"
  | "betting"
  | "shopping";
// | "playing"
// | "watching";

type FeedItemCategory = Exclude<FeedCategory, "explore">;

type FeedItem = {
  id: number;
  title: string;
  subtitle: string;
  action: string;
  category: FeedItemCategory;
};

const feedCategoryTabs: Array<{ key: FeedCategory; label: string }> = [
  // { key: "explore", label: "Explore" },
  { key: "creating", label: "Creating" },
  { key: "learning", label: "Learning" },
  { key: "earning", label: "Earning" },
  { key: "banking", label: "Banking" },
  { key: "investing", label: "Investing" },
  { key: "betting", label: "Betting" },
  { key: "shopping", label: "Shopping" },

  // { key: "playing", label: "Playing" },
  // { key: "watching", label: "Watching" },
];

const feedCategoryIcons: Record<FeedCategory, JSX.Element> = {
  explore: <Compass className="h-3.5 w-3.5" />,
  creating: <Pencil className="h-3.5 w-3.5" />,
  learning: <Landmark className="h-3.5 w-3.5" />,
  earning: <Wallet className="h-3.5 w-3.5" />,
  banking: <Wallet className="h-3.5 w-3.5" />,
  investing: <TrendingUp className="h-3.5 w-3.5" />,
  shopping: <ShoppingBag className="h-3.5 w-3.5" />,
  betting: <Dice5 className="h-3.5 w-3.5" />,
  // playing: <Gamepad2 className="h-3.5 w-3.5" />,
  // watching: <Clapperboard className="h-3.5 w-3.5" />,
};

// Mock data for the feed (categorized)
const feedItems: FeedItem[] = [
  {
    id: 1,
    title: "High-Yield Savings Accounts",
    subtitle: "APY up to 5.25%",
    action: "Compare Rates",
    category: "banking",
  },
  {
    id: 2,
    title: "Remote Data Analyst Positions",
    subtitle: "Starting at $65k",
    action: "Apply Now",
    category: "earning",
  },
  {
    id: 3,
    title: "Stock Market Prediction Tools",
    subtitle: "AI-powered insights",
    action: "Try Free",
    category: "investing",
  },
  {
    id: 4,
    title: "Cryptocurrency Trading Courses",
    subtitle: "Beginner to advanced",
    action: "Enroll Now",
    category: "learning",
  },
  {
    id: 5,
    title: "Real Estate Investment Trusts",
    subtitle: "Dividend yield 8%",
    action: "View Details",
    category: "investing",
  },
  {
    id: 6,
    title: "Freelance Writing Opportunities",
    subtitle: "$50-$200 per article",
    action: "Browse Jobs",
    category: "earning",
  },
  {
    id: 7,
    title: "Peer-to-Peer Lending Platforms",
    subtitle: "Returns up to 12%",
    action: "Get Started",
    category: "investing",
  },
  {
    id: 8,
    title: "Online MBA Programs",
    subtitle: "Accredited & flexible",
    action: "Request Info",
    category: "learning",
  },
  {
    id: 9,
    title: "Forex Trading Signals",
    subtitle: "Daily market analysis",
    action: "Subscribe",
    category: "investing",
  },
  {
    id: 10,
    title: "Side Hustle Ideas 2026",
    subtitle: "Make $500+/month",
    action: "Explore",
    category: "earning",
  },
  {
    id: 11,
    title: "Credit Card Rewards Programs",
    subtitle: "Earn 2x points",
    action: "Compare Cards",
    category: "banking",
  },
  {
    id: 12,
    title: "Options Trading Strategies",
    subtitle: "Risk management guide",
    action: "Learn More",
    category: "investing",
  },
  {
    id: 13,
    title: "E-commerce Business Setup",
    subtitle: "Start selling today",
    action: "Get Started",
    category: "creating",
  },
  {
    id: 14,
    title: "Financial Planning Services",
    subtitle: "Free consultation",
    action: "Book Now",
    category: "banking",
  },
  {
    id: 15,
    title: "Passive Income Streams",
    subtitle: "Build wealth slowly",
    action: "Discover",
    category: "earning",
  },
  {
    id: 16,
    title: "Investment Banking Internships",
    subtitle: "Summer 2026",
    action: "Apply",
    category: "earning",
  },
  {
    id: 17,
    title: "Sports Betting Analytics",
    subtitle: "Data-driven picks",
    action: "View Stats",
    category: "betting",
  },
  {
    id: 18,
    title: "Online Certification Programs",
    subtitle: "Boost your resume",
    action: "Browse Courses",
    category: "learning",
  },
  {
    id: 19,
    title: "Dividend Stock Portfolio",
    subtitle: "Monthly income focus",
    action: "View Picks",
    category: "investing",
  },
  {
    id: 20,
    title: "Business Loan Options",
    subtitle: "Low interest rates",
    action: "Get Quote",
    category: "banking",
  },
  {
    id: 21,
    title: "Creator Toolkits",
    subtitle: "Templates, fonts, and assets",
    action: "Browse",
    category: "creating",
  },
  {
    id: 22,
    title: "Best Budget Meal Prep",
    subtitle: "Save time & money weekly",
    action: "See Recipes",
    category: "shopping",
  },
  {
    id: 23,
    title: "Indie Game Bundles",
    subtitle: "Top-rated games under $10",
    action: "Shop Deals",
    category: "shopping",
  },
  // {
  //   id: 24,
  //   title: "New Documentary Releases",
  //   subtitle: "Critically acclaimed picks",
  //   action: "Watch Now",
  //   category: "watching",
  // },
];

// Mock data for suggestions by category
const suggestionsData = {
  trending: [
    "AI-Powered Trading Bots – 15% ROI",
    "Crypto Staking Rewards – 8% APY",
    "NFT Marketplace Launch",
    "DeFi Yield Farming Guide",
    "Web3 Developer Bootcamp",
    "Metaverse Real Estate",
    "Blockchain Certification Course",
  ],
  suggested: [
    "Open High-Yield Savings – 4.8% APY",
    "$200 Cashback with Chase Sapphire",
    "Tax Filing for Freelancers",
    "Label 500 images – $120",
    "Remote Design Job – $75k",
    "Investment Portfolio Review",
    "Credit Score Boost Program",
  ],
  popular: [
    "Index Fund Investment – S&P 500",
    "Real Estate Crowdfunding",
    "Online MBA Program – Accredited",
    "Freelance Writing Platform",
    "Stock Market Analysis Tool",
    "Business Credit Card – 0% APR",
    "Retirement Planning Service",
  ],
};

export default function Home() {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const mainSearchRef = useRef<HTMLDivElement>(null);
  const mainSearchInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showCompactSearch, setShowCompactSearch] = useState(false);
  const [isSuggestionsHovered, setIsSuggestionsHovered] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "trending" | "suggested" | "popular"
  >("suggested");
  const [selectedFeedCategory, setSelectedFeedCategory] =
    useState<FeedCategory | null>(null);
  const [mainScrollOffset, setMainScrollOffset] = useState(0);
  const sliderInViewRef = useRef(false);
  const mainSearchOutOfViewRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFloatingSuggestionsOpen, setIsFloatingSuggestionsOpen] =
    useState(false);

  const visibleFeedItems = useMemo(() => {
    if (!selectedFeedCategory) return feedItems;
    return feedItems.filter((item) => item.category === selectedFeedCategory);
  }, [selectedFeedCategory]);

  useEffect(() => {
    const sliderNode = sliderRef.current;
    const searchNode = mainSearchRef.current;

    // 1) Compact search / floating bar:
    // Show ONLY after the user has scrolled PAST the main search bar
    // (i.e. the bar is above the viewport), not merely when it's off-screen below.
    const searchObserver = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const viewportHeight =
          window.innerHeight || document.documentElement.clientHeight;

        const isAboveViewport = rect.bottom <= 0;
        const isBelowViewport = rect.top >= viewportHeight;
        const isInViewport =
          !isAboveViewport && !isBelowViewport && entry.isIntersecting;

        // Floating search + expanded agent tab only when the main search
        // has been scrolled past (above the viewport).
        const shouldShowFloating = isAboveViewport;

        setShowCompactSearch(shouldShowFloating);

        // Manage focus: blur when scrolled past, refocus when scrolled back into view.
        if (shouldShowFloating && !mainSearchOutOfViewRef.current) {
          mainSearchOutOfViewRef.current = true;
          mainSearchInputRef.current?.blur();
        } else if (isInViewport && mainSearchOutOfViewRef.current) {
          mainSearchOutOfViewRef.current = false;
          mainSearchInputRef.current?.focus();
        }

        // Collapse ad display only when user scrolls back up towards the main search
        // and the slider is not currently visible.
        if (!shouldShowFloating && !sliderInViewRef.current) {
          setIsVisible(false);
        }
      },
      {
        threshold: [0],
        rootMargin: "0px",
      }
    );

    // 2) Ad expansion: should NOT trigger early. Require full visibility once,
    // then keep it expanded until the user scrolls back to the top.
    const sliderObserver = new IntersectionObserver(
      ([entry]) => {
        const fullyVisible =
          entry.isIntersecting && entry.intersectionRatio >= 1;
        // Track whether the slider is currently in view
        sliderInViewRef.current = entry.isIntersecting;

        // Once fully visible, expand and stay expanded until user returns to top
        if (fullyVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: [1],
        rootMargin: "0px",
      }
    );

    if (searchNode) searchObserver.observe(searchNode);
    if (sliderNode) sliderObserver.observe(sliderNode);

    return () => {
      if (searchNode) searchObserver.unobserve(searchNode);
      if (sliderNode) sliderObserver.unobserve(sliderNode);
    };
  }, []);

  // Track main scroll position
  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const handleScroll = () => {
      const scrollTop = mainElement.scrollTop;
      setMainScrollOffset(scrollTop);
    };

    mainElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, []);

  // Collapse suggestions if main view is scrolled
  useEffect(() => {
    if (mainScrollOffset > 0) {
      // Immediately collapse if scrolled, regardless of hover state
      setIsSuggestionsHovered(false);
    }
  }, [mainScrollOffset]);

  // Prevent main scroll when scrolling inside suggestions list
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isSuggestionsHovered && mainScrollOffset === 0) {
        const target = e.target as HTMLElement;
        const suggestionsList = target.closest("[data-suggestions-list]");
        if (suggestionsList) {
          // Always prevent main scroll when inside suggestions list
          e.preventDefault();
          e.stopPropagation();

          // Manually scroll the suggestions list items container
          const listContainer = suggestionsList.querySelector(
            "[data-suggestions-items]"
          ) as HTMLElement;
          if (listContainer) {
            listContainer.scrollTop += e.deltaY;
          }
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSuggestionsHovered && mainScrollOffset === 0) {
        const target = e.target as HTMLElement;
        const suggestionsList = target.closest("[data-suggestions-list]");
        if (suggestionsList) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    if (isSuggestionsHovered && mainScrollOffset === 0) {
      document.addEventListener("wheel", handleWheel, { passive: false });
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isSuggestionsHovered, mainScrollOffset]);

  const goToSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleMainSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToSearch(searchQuery);
    }
  };

  const filteredSuggestions = useMemo(() => {
    const base = suggestionsData[selectedTab];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;
    return base.filter((item) => item.toLowerCase().includes(q));
  }, [selectedTab, searchQuery]);

  return (
    <main className="no-scrollbar relative h-screen w-screen overflow-y-auto scroll-smooth bg-[#F6F6F6] outline-none">
      {/* Top Bar */}
      <TopBar mode="home" showCenterCollapsed={showCompactSearch} />

      {/* Floating Main Search Bar (appears at bottom when main search leaves view) */}
      <div
        className={`fixed inset-x-0 bottom-[75px] z-[999] flex justify-center transition-all duration-300 ease-out ${
          showCompactSearch
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <div className="relative flex w-full justify-center">
          {/* Main Search Bar (floating variant) */}
          <div className="relative z-20 inline-flex h-11 w-[55vw] max-w-[640px] items-center justify-between overflow-hidden rounded-[5px] bg-white px-2 py-1 shadow-[0px_2px_20px_-8px_rgba(0,0,0,0.15)]">
            <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-2xl">
              <Plus className="h-5 stroke-black/40" />
            </div>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                setIsFloatingSuggestionsOpen(value.trim() !== "");
              }}
              className="h-full w-full flex-1 border-none bg-transparent px-2 text-center font-['Neue_Montreal'] text-[15px] font-normal text-black/100 outline-none placeholder:text-black/30 focus:outline-none"
              style={{ boxShadow: "none" }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  goToSearch(searchQuery);
                  setIsFloatingSuggestionsOpen(false);
                }
              }}
              onFocus={() => {
                if (searchQuery.trim() !== "") {
                  setIsFloatingSuggestionsOpen(true);
                }
              }}
              onBlur={() => {
                // Delay so click events on suggestions can fire
                setTimeout(() => setIsFloatingSuggestionsOpen(false), 120);
              }}
            />
            <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-2xl">
              <Search className="h-5 stroke-black/40" />
            </div>
          </div>

          {/* Suggestions List – opens upward from floating search */}
          <div
            className={`absolute bottom-full left-1/2 -mb-1 inline-flex w-[95%] max-w-[620px] -translate-x-1/2 flex-col items-center justify-start overflow-hidden rounded-b-[0px] rounded-t-[10px] bg-black/[0.5%] pb-1 pt-1 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/10 backdrop-blur-[100px] transition-all duration-300 ease-out ${
              isFloatingSuggestionsOpen
                ? "max-h-[280px] min-h-[120px] pb-0 opacity-100 shadow-[0px_20px_160px_-60px_rgba(0,0,0,0.1)]"
                : "max-h-[0px] pb-0 opacity-0"
            }`}
          >
            {/* Suggestions List Tabs */}
            <div className="flex items-center justify-center gap-0 self-stretch border-b-[0.50px] border-black/10 bg-black/0 p-0 backdrop-blur-[50px]">
              <div
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setSelectedTab("trending")}
                className="group flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[0px] py-1.5 hover:bg-black/[0%]"
              >
                <div
                  className={`line-clamp-1 justify-start font-['Neue_Montreal'] text-xs font-normal transition-colors ${
                    selectedTab === "trending"
                      ? "text-black"
                      : "text-black/40 group-hover:text-black/60"
                  }`}
                >
                  Trending
                </div>
              </div>

              <div className="h-4 w-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/5"></div>

              <div
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setSelectedTab("suggested")}
                className="group flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[0px] py-1.5 hover:bg-black/[0%]"
              >
                <div
                  className={`line-clamp-1 justify-start font-['Neue_Montreal'] text-xs font-normal transition-colors ${
                    selectedTab === "suggested"
                      ? "text-black"
                      : "text-black/40 group-hover:text-black/60"
                  }`}
                >
                  Suggested
                </div>
              </div>

              <div className="h-4 w-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/5"></div>

              <div
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setSelectedTab("popular")}
                className="group flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[0px] py-1.5 hover:bg-black/[0%]"
              >
                <div
                  className={`line-clamp-1 justify-start font-['Neue_Montreal'] text-xs font-normal transition-colors ${
                    selectedTab === "popular"
                      ? "text-black"
                      : "text-black/40 group-hover:text-black/60"
                  }`}
                >
                  Popular
                </div>
              </div>
            </div>

            {/* Suggestions List Items */}
            <div
              className={`no-scrollbar flex max-h-[230px] flex-col items-start justify-start self-stretch overflow-y-auto transition-all duration-300 ease-out ${
                isFloatingSuggestionsOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      goToSearch(suggestion);
                      setIsFloatingSuggestionsOpen(false);
                    }}
                    className="flex cursor-pointer flex-col items-start justify-start gap-2 self-stretch border-t-[0.0px] bg-black/0 p-3.5 text-black/80 backdrop-blur-xl hover:bg-black/[1.5%]"
                  >
                    <div className="inline-flex items-center justify-start gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-white" />
                      <div className="inline-flex flex-col items-start justify-center">
                        <div className="line-clamp-1 justify-start font-['Neue_Montreal'] text-sm font-normal">
                          {suggestion}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 self-stretch py-10">
                  <div className="text-center font-['Neue_Montreal'] text-xs font-normal text-black/40">
                    No results found. Try a different search.
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      goToSearch(searchQuery || "I'm Feeling Lucky")
                    }
                    className="inline-flex h-7 w-44 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-md bg-black/[2.5%] px-3 py-2 backdrop-blur-xl transition-all duration-100 hover:bg-black/[5%]"
                  >
                    <div className="justify-start text-center font-['Neue_Montreal'] text-xs font-medium text-black/60">
                      I&apos;m Feeling Lucky
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-center gap-0">
        {/* Display Slider Row */}
        <div
          ref={sliderRef}
          className="fixed top-0 z-0 flex h-screen w-full flex-col items-center justify-start gap-6 bg-black/0 pt-[90px]"
          // Another option is without: sticky top-0 mb-[7.5vh]
        >
          {/* Ad Categories Items */}
          <div className="no-scrollbar flex w-full max-w-[70%] items-center justify-center overflow-x-auto overflow-y-hidden px-5">
            <div className="no-scrollbar flex min-w-max items-center gap-5">
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 flex-shrink-0 rounded-sm border-[0.5px] border-black/10 bg-white/10 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px]" />
            </div>
          </div>

          {/* Ad Display */}
          <div
            className={`w-[75%] rounded-sm border-[0.50px] border-black/10 bg-white/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.02)] backdrop-blur-[50px] transition-all duration-500 ease-out ${
              isVisible ? "h-[45vh]" : "h-[45vh]"
            }`}
          />

          {/* Logo */}
          <div className="absolute left-1/2 top-[28vh] -translate-x-1/2 justify-start text-center font-['Neue_Montreal'] text-[4vh] font-normal text-black">
            WEB&nbsp;&nbsp;&nbsp;–––&nbsp;&nbsp;&nbsp;MKT
          </div>
        </div>

        {/* For You Feed */}
        {/* mt-[40vh] is to give space for the ad display */}
        {/* pt-[60vh] is to push the feed out of the viewport, but keep the search container visible and above the ad display div */}
        <div className="relative z-10 mt-[40vh] flex w-full flex-col items-center justify-start border-t-[0.50px] border-black/15 bg-[#F6F6F6] pt-[60vh]">
          {/* Search Container */}
          <div className="absolute -top-6 z-20 flex flex-col items-center justify-start gap-8">
            <div className="relative z-30 flex flex-col items-center justify-start">
              {/* Main Search Bar */}
              <div
                ref={mainSearchRef}
                className="relative z-20 inline-flex h-11 w-[55vw] max-w-[640px] items-center justify-between overflow-hidden rounded-[5px] bg-white px-2 py-1 shadow-[0px_2px_20px_-8px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-2xl">
                  <Plus className="h-5 stroke-black/40" />
                </div>
                <input
                  type="text"
                  ref={mainSearchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    if (value.trim() !== "" && mainScrollOffset === 0) {
                      setIsSuggestionsHovered(true);
                    } else if (value.trim() === "") {
                      setIsSuggestionsHovered(false);
                    }
                  }}
                  autoFocus
                  className="h-full w-full flex-1 border-none bg-transparent px-2 text-center font-['Neue_Montreal'] text-[15px] font-normal text-black/100 outline-none placeholder:text-black/30 focus:outline-none"
                  style={{ boxShadow: "none" }}
                  tabIndex={0}
                  onKeyDown={handleMainSearchKeyDown}
                />
                <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-2xl">
                  <Search className="h-5 stroke-black/40" />
                </div>
              </div>

              {/* Suggestions List */}
              <div
                data-suggestions-list
                onMouseEnter={() => {
                  // Check scroll position directly from main element to ensure accuracy
                  const mainElement = document.querySelector("main");
                  const currentScrollOffset = mainElement?.scrollTop || 0;
                  if (currentScrollOffset === 0 && mainScrollOffset === 0) {
                    setIsSuggestionsHovered(true);
                  } else {
                    // Ensure it stays collapsed if scrolled
                    setIsSuggestionsHovered(false);
                  }
                }}
                onMouseLeave={() => setIsSuggestionsHovered(false)}
                onWheel={(e) => {
                  // Prevent main scroll when scrolling inside suggestions list
                  if (isSuggestionsHovered && mainScrollOffset === 0) {
                    e.stopPropagation();
                  }
                }}
                onTouchMove={(e) => {
                  // Prevent main scroll when scrolling inside suggestions list on mobile
                  if (isSuggestionsHovered && mainScrollOffset === 0) {
                    e.stopPropagation();
                  }
                }}
                className={`absolute left-1/2 top-full z-10 -mt-1 inline-flex w-[95%] -translate-x-1/2 flex-col items-center justify-start overflow-hidden rounded-bl-[10px] rounded-br-[10px] bg-black/[0.5%] pt-1 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/10 backdrop-blur-[100px] transition-all duration-300 ease-out ${
                  isSuggestionsHovered && mainScrollOffset === 0
                    ? "max-h-[280px] min-h-[280px] pb-0 shadow-[0px_20px_160px_-60px_rgba(0,0,0,0.1)]"
                    : "max-h-[32px] pb-0"
                }`}
              >
                {/* Suggestions List Tabs */}
                <div className="flex items-center justify-center gap-0 self-stretch border-b-[0.50px] border-black/10 bg-black/0 p-0 backdrop-blur-[50px]">
                  <div
                    onClick={() => setSelectedTab("trending")}
                    className="group flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[0px] py-1.5 hover:bg-black/[0%]"
                  >
                    <div
                      className={`line-clamp-1 justify-start font-['Neue_Montreal'] text-xs font-normal transition-colors ${
                        isSuggestionsHovered && selectedTab === "trending"
                          ? "text-black"
                          : "text-black/40 group-hover:text-black/60"
                      }`}
                    >
                      Trending
                    </div>
                  </div>

                  <div className="h-4 w-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/5"></div>

                  <div
                    onClick={() => setSelectedTab("suggested")}
                    className="group flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[0px] py-1.5 hover:bg-black/[0%]"
                  >
                    <div
                      className={`line-clamp-1 justify-start font-['Neue_Montreal'] text-xs font-normal transition-colors ${
                        isSuggestionsHovered && selectedTab === "suggested"
                          ? "text-black"
                          : "text-black/40 group-hover:text-black/60"
                      }`}
                    >
                      Suggested
                    </div>
                  </div>

                  <div className="h-4 w-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/5"></div>

                  <div
                    onClick={() => setSelectedTab("popular")}
                    className="group flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[0px] py-1.5 hover:bg-black/[0%]"
                  >
                    <div
                      className={`line-clamp-1 justify-start font-['Neue_Montreal'] text-xs font-normal transition-colors ${
                        isSuggestionsHovered && selectedTab === "popular"
                          ? "text-black"
                          : "text-black/40 group-hover:text-black/60"
                      }`}
                    >
                      Popular
                    </div>
                  </div>
                </div>

                {/* Suggestions List Items */}
                <div
                  data-suggestions-items
                  className={`no-scrollbar flex flex-col items-start justify-start self-stretch transition-all duration-300 ease-out ${
                    isSuggestionsHovered && mainScrollOffset === 0
                      ? "overflow-y-auto opacity-100"
                      : "pointer-events-none overflow-hidden opacity-0"
                  }`}
                >
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => goToSearch(suggestion)}
                        className="flex cursor-pointer flex-col items-start justify-start gap-2 self-stretch border-t-[0.0px] bg-black/0 p-3.5 text-black/80 backdrop-blur-xl hover:bg-black/[1.5%]"
                      >
                        <div className="inline-flex items-center justify-start gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-white" />
                          <div className="inline-flex flex-col items-start justify-center">
                            <div className="line-clamp-1 justify-start font-['Neue_Montreal'] text-sm font-normal">
                              {suggestion}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 self-stretch py-16">
                      <div className="text-center font-['Neue_Montreal'] text-xs font-normal text-black/40">
                        No results found. Try a different search.
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          goToSearch(searchQuery || "I'm Feeling Lucky")
                        }
                        className="inline-flex h-7 w-44 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-md bg-black/[2.5%] px-3 py-2 backdrop-blur-xl transition-all duration-100 hover:bg-black/[5%]"
                      >
                        <div className="justify-start text-center font-['Neue_Montreal'] text-xs font-medium text-black/60">
                          I&apos;m Feeling Lucky
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* I'm Feeling Lucky Button */}
            <button
              type="button"
              onClick={() => goToSearch(searchQuery || "I'm Feeling Lucky")}
              className="z-20 mt-10 inline-flex h-7 w-44 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-md border-[0.50px] border-black/10 bg-black/[0%] px-3 py-2 backdrop-blur-xl transition-all duration-100 hover:bg-black/[2.5%]"
            >
              <div className="justify-start text-center font-['Neue_Montreal'] text-xs font-medium text-black/60">
                I&apos;m Feeling Lucky
              </div>
            </button>
          </div>

          {/* Categories */}
          {/* -mt-[112px] is to compensate for the bottom bar height */}
          <div className="-mt-[112px] inline-flex w-full flex-col items-center justify-center gap-2.5 border-b-[0.25px] border-black/5 px-2.5 py-3.5">
            <div className="inline-flex items-center justify-start gap-3.5">
              {feedCategoryTabs.map((tab) => {
                const isSelected = selectedFeedCategory === tab.key;
                return (
                  <div
                    key={tab.key}
                    onClick={() =>
                      setSelectedFeedCategory(isSelected ? null : tab.key)
                    }
                    className={`flex h-auto w-24 cursor-pointer items-center justify-center gap-2.5 rounded-lg border-[0.5px] border-black/10 px-4 py-[6px] transition-colors ${
                      isSelected
                        ? "bg-white/40 text-black"
                        : "text-black/35 hover:bg-black/[2%] hover:text-black/60"
                    }`}
                  >
                    <div className="inline-flex items-center justify-center gap-2">
                      {feedCategoryIcons[tab.key]}
                      <div className="justify-start text-right font-['Neue_Montreal'] text-xs font-normal">
                        {tab.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex w-full flex-col items-center justify-start overflow-hidden">
            {/* Feed Items */}
            <div className="inline-flex min-h-[87.5vh] w-[65%] flex-wrap content-start items-start justify-center gap-[34px] px-0 pb-[35vh] pt-16">
              {visibleFeedItems.map((item) => (
                <FeedItemCard
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  action={item.action}
                  onClick={() => goToSearch(item.title)}
                />
              ))}
            </div>

            {/* Background Grid */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
              <div className="grid h-full w-full grid-cols-8">
                {Array.from({ length: 200 }).map((_, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="aspect-square border-[0.50px] border-black/[4%]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
