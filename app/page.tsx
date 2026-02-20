"use client";

import { Plus, Search } from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FeedItemCard } from "./components/FeedItemCard";
import { CompactSearchBar } from "./components/CompactSearchBar";
import { BottomBar } from "./components/BottomBar";
import { TopBar } from "./components/TopBar";

type FeedCategory =
  | "explore"
  | "creating"
  | "learning"
  | "earning"
  | "banking"
  | "investing"
  | "shopping"
  | "betting"
  | "playing"
  | "watching";

type FeedItemCategory = Exclude<FeedCategory, "explore">;

type FeedItem = {
  id: number;
  title: string;
  subtitle: string;
  action: string;
  category: FeedItemCategory;
};

const feedCategoryTabs: Array<{ key: FeedCategory; label: string }> = [
  { key: "explore", label: "Explore" },
  { key: "creating", label: "Creating" },
  { key: "learning", label: "Learning" },
  { key: "earning", label: "Earning" },
  { key: "banking", label: "Banking" },
  { key: "investing", label: "Investing" },
  { key: "shopping", label: "Shopping" },
  { key: "betting", label: "Betting" },
  { key: "playing", label: "Playing" },
  { key: "watching", label: "Watching" },
];

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
    category: "playing",
  },
  {
    id: 24,
    title: "New Documentary Releases",
    subtitle: "Critically acclaimed picks",
    action: "Watch Now",
    category: "watching",
  },
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
  const [isVisible, setIsVisible] = useState(false);
  const [showCompactSearch, setShowCompactSearch] = useState(false);
  const [isSuggestionsHovered, setIsSuggestionsHovered] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "trending" | "suggested" | "popular"
  >("suggested");
  const [selectedFeedCategory, setSelectedFeedCategory] =
    useState<FeedCategory>("explore");
  const [mainScrollOffset, setMainScrollOffset] = useState(0);
  const sliderInViewRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");

  const visibleFeedItems = useMemo(() => {
    if (selectedFeedCategory === "explore") return feedItems;
    return feedItems.filter((item) => item.category === selectedFeedCategory);
  }, [selectedFeedCategory]);

  useEffect(() => {
    const sliderNode = sliderRef.current;
    const searchNode = mainSearchRef.current;

    // 1) Compact search bar: appears only when the main search fully leaves view.
    // Also collapses the ad display only when user returns to the main search at the top
    // *and* the slider is no longer in view (to avoid fighting with the slider observer).
    const searchObserver = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        // Compact bar only when main search is fully out of view
        setShowCompactSearch(!isIntersecting);

        // Collapse ad display only when user scrolls back to main search
        // and the slider is not currently visible.
        if (isIntersecting && !sliderInViewRef.current) {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 1],
        rootMargin: "20px 0px",
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

      {/* Compact Search Bar (appears when main search leaves view) */}
      <div
        className={`fixed left-1/2 top-[14px] z-[1001] w-[640px] -translate-x-1/2 transition-all duration-300 ease-out ${
          showCompactSearch
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <CompactSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={() => goToSearch(searchQuery)}
          suggestions={filteredSuggestions}
          showNoResultsState
          onSelectSuggestion={goToSearch}
          onFeelingLucky={() => goToSearch(searchQuery || "I'm Feeling Lucky")}
        />
      </div>

      {/* Bottom Bar */}
      <BottomBar />

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-center gap-0">
        {/* Search Container */}
        <div className="inline-flex h-screen w-screen flex-col items-center justify-center gap-2.5 pb-[17.5vh]">
          <div className="flex flex-col items-center justify-start gap-8">
            {/* Logo */}
            <div className="justify-start text-center font-['Neue_Montreal'] text-4xl font-normal text-black">
              WEB&nbsp;&nbsp;&nbsp;–––&nbsp;&nbsp;&nbsp;MKT
            </div>

            {/* Search Container */}
            <div className="relative flex flex-col items-center justify-start">
              {/* Main Search Bar */}
              <div
                ref={mainSearchRef}
                className="relative z-20 inline-flex h-11 w-[640px] items-center justify-between overflow-hidden rounded-[5px] bg-white px-2 py-1 shadow-[0px_2px_20px_-8px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-2xl">
                  <Plus className="h-5 stroke-black/40" />
                </div>
                <input
                  type="text"
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
                  className="h-full w-full flex-1 border-none bg-transparent px-2 text-center font-['Neue_Montreal'] text-base font-normal text-black/100 outline-none placeholder:text-black/30 focus:outline-none"
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
                className={`absolute left-1/2 top-full z-10 -mt-1 inline-flex w-[640px] -translate-x-1/2 flex-col items-center justify-start overflow-hidden rounded-bl-[10px] rounded-br-[10px] bg-black/[0.5%] pt-1 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/10 backdrop-blur-[100px] transition-all duration-300 ease-out ${
                  isSuggestionsHovered && mainScrollOffset === 0
                    ? "max-h-[280px] min-h-[280px] max-w-[620px] pb-0 shadow-[0px_20px_160px_-60px_rgba(0,0,0,0.1)]"
                    : "max-h-[32px] max-w-[420px] pb-0"
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
              className="mt-10 inline-flex h-7 w-44 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-md bg-black/[2.5%] px-3 py-2 backdrop-blur-xl transition-all duration-100 hover:bg-black/[5%]"
            >
              <div className="justify-start text-center font-['Neue_Montreal'] text-xs font-medium text-black/60">
                I&apos;m Feeling Lucky
              </div>
            </button>
          </div>
        </div>

        {/* Feed Slider Row */}
        <div
          ref={sliderRef}
          className="sticky top-0 -mt-72 mb-[7.5vh] flex min-h-[60vh] w-full flex-col items-center justify-end gap-8 bg-black/0 pb-[3.5%] pt-[6.5%]"
          // Another option is without: sticky top-0 mb-[7.5vh]
        >
          {/* Ad Display */}
          <div
            className={`w-[55%] rounded-sm border-2 border-white bg-black/0 shadow-[0px_-4px_30px_0px_rgba(0,0,0,0.015)] backdrop-blur-[50px] transition-all duration-500 ease-out ${
              isVisible ? "h-[45vh]" : "h-[40px]"
            }`}
          />

          {/* Ad Categories Items */}
          {/* <div className="w-[55%] flex justify-center transition-all duration-500 ease-out">
            <div className="w-full px-0 py-0 border-t-[0.0px] flex justify-between items-center overflow-x-auto no-scrollbar">
              <div className="w-20 h-11 bg-black/0 rounded-sm shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] border-2 border-white backdrop-blur-[50px]" />
              <div className="w-20 h-11 bg-black/0 rounded-sm shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] border-2 border-white backdrop-blur-[50px]" />
              <div className="w-20 h-11 bg-black/0 rounded-sm shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] border-2 border-white backdrop-blur-[50px]" />
              <div className="w-20 h-11 bg-black/0 rounded-sm shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] border-2 border-white backdrop-blur-[50px]" />
              <div className="w-20 h-11 bg-black/0 rounded-sm shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] border-2 border-white backdrop-blur-[50px]" />
              <div className="w-20 h-11 bg-black/0 rounded-sm shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] border-2 border-white backdrop-blur-[50px]" />
              <div className="w-20 h-11 bg-black/0 rounded-sm shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] border-2 border-white backdrop-blur-[50px]" />
            </div>
          </div> */}
        </div>

        {/* For You Feed */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center border-t-[0.50px] border-black/15 bg-[#F6F6F6]">
          {/* Ad Categories Items */}
          <div className="absolute -top-[50px] left-1/2 flex max-w-[55%] -translate-x-1/2 justify-center transition-all duration-500 ease-out">
            <div className="no-scrollbar flex w-auto items-center justify-between gap-5 overflow-x-auto border-t-[0.0px] px-0 py-0">
              <div className="h-8 w-14 rounded-sm border-2 border-white bg-black/0 shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 rounded-sm border-2 border-white bg-black/0 shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 rounded-sm border-2 border-white bg-black/0 shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 rounded-sm border-2 border-white bg-black/0 shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 rounded-sm border-2 border-white bg-black/0 shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 rounded-sm border-2 border-white bg-black/0 shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] backdrop-blur-[50px]" />
              <div className="h-8 w-14 rounded-sm border-2 border-white bg-black/0 shadow-[0px_14px_20px_0px_rgba(0,0,0,0.025)] backdrop-blur-[50px]" />
            </div>
          </div>

          {/* Categories */}
          <div className="inline-flex w-full flex-col items-center justify-center gap-2.5 border-b-[0.50px] border-black/15 px-2.5 py-2.5">
            <div className="inline-flex items-center justify-start gap-1">
              {feedCategoryTabs.map((tab) => {
                const isSelected = selectedFeedCategory === tab.key;
                return (
                  <div
                    key={tab.key}
                    onClick={() => setSelectedFeedCategory(tab.key)}
                    className={`flex h-auto w-20 cursor-pointer items-center justify-center gap-2.5 rounded-lg px-4 py-[6px] transition-colors ${
                      isSelected
                        ? "text-black"
                        : "text-black/30 hover:bg-black/[2%] hover:text-black/60"
                    }`}
                  >
                    <div className="justify-start text-right font-['Neue_Montreal'] text-xs font-normal">
                      {tab.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feed Items */}
          <div className="feed-border-vertical inline-flex min-h-[85vh] w-[65%] flex-wrap content-start items-start justify-center gap-6 border-l-[0.50px] border-r-[0.50px] border-black/20 p-12 pb-36">
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
        </div>
      </div>
    </main>
  );
}
