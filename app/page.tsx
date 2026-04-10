"use client";

import { Plus, Search } from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExpandedFeedItemCard } from "./components/ExpandedFeedItemCard";
import { BottomBar } from "./components/BottomBar";
import { CategoriesExplorerView } from "./components/CategoriesExplorerView";
import { TopBar } from "./components/TopBar";

type FeedCategory =
  | "explore"
  | "monitoring"
  | "creating"
  | "learning"
  | "earning"
  | "saving"
  | "investing"
  | "betting"
  | "playing"
  | "watching"
  | "shopping";

type FeedItemCategory = Exclude<FeedCategory, "explore">;

type FeedItem = {
  id: number;
  title: string;
  subtitle: string;
  action: string;
  category: FeedItemCategory;
  segment: FeedSegment;
};

type FeedSegment = "all" | "objects" | "clusters";

type NewCategoryKey =
  | "media"
  | "creative"
  | "shopping"
  | "travel"
  | "experiences"
  | "health"
  | "education"
  | "vehicles"
  | "properties"
  | "services"
  | "work"
  | "banking"
  | "investing"
  | "betting"
  | "games";

/** New category strip (matches design); `iconStyle` alternates circle border vs outline treatment. */
const newCategoryList: Array<{
  key: NewCategoryKey;
  label: string;
  iconStyle: "border" | "outline";
}> = [
  { key: "media", label: "Media", iconStyle: "border" },
  { key: "creative", label: "Creative", iconStyle: "outline" },
  { key: "shopping", label: "Shopping", iconStyle: "outline" },
  { key: "travel", label: "Travel", iconStyle: "outline" },
  { key: "experiences", label: "Experiences", iconStyle: "outline" },
  { key: "health", label: "Health", iconStyle: "border" },
  { key: "education", label: "Education", iconStyle: "border" },
  { key: "vehicles", label: "Vehicles", iconStyle: "outline" },
  { key: "properties", label: "Properties", iconStyle: "outline" },
  { key: "services", label: "Services", iconStyle: "border" },
  { key: "work", label: "Work", iconStyle: "border" },
  { key: "banking", label: "Banking", iconStyle: "border" },
  { key: "investing", label: "Investing", iconStyle: "border" },
  { key: "betting", label: "Betting", iconStyle: "border" },
  { key: "games", label: "Games", iconStyle: "border" },
];

/** Optional feed filter when a new category maps to an existing feed item category. */
const newCategoryFeedFilter: Partial<Record<NewCategoryKey, FeedItemCategory>> =
  {
    creative: "creating",
    shopping: "shopping",
    education: "learning",
    work: "earning",
    banking: "saving",
    investing: "investing",
    betting: "betting",
    games: "playing",
  };

type Space = {
  name: string;
  type: string;
  description: string;
  actions: string[];
  widgets: Array<{
    id: string;
    title: string;
    subtitle: string;
    top: string;
    left: string;
  }>;
};

const spaces: Space[] = [
  {
    name: "AI Builders",
    type: "Professional",
    description: "AI tools, models, and talent.",
    actions: ["Hire", "Invest", "Buy APIs"],
    widgets: [
      {
        id: "ai-api",
        title: "Model APIs",
        subtitle: "GPT-style, vision & embeddings",
        top: "18%",
        left: "12%",
      },
      {
        id: "ai-talent",
        title: "ML Talent",
        subtitle: "Fractional teams & contractors",
        top: "22%",
        left: "66%",
      },
      {
        id: "ai-infra",
        title: "Inference Infra",
        subtitle: "Deploy and monitor workloads",
        top: "60%",
        left: "18%",
      },
      {
        id: "ai-invest",
        title: "Studio Deals",
        subtitle: "Back high‑leverage builders",
        top: "64%",
        left: "70%",
      },
    ],
  },
  {
    name: "Indie Hackers LATAM",
    type: "Community",
    description: "Bootstrapped & funded founders across LATAM.",
    actions: ["Fundraise", "Recruit"],
    widgets: [
      {
        id: "latam-feed",
        title: "Founder Feed",
        subtitle: "Early‑stage updates & wins",
        top: "18%",
        left: "14%",
      },
      {
        id: "latam-hiring",
        title: "Hiring Board",
        subtitle: "Design, eng, growth roles",
        top: "24%",
        left: "68%",
      },
      {
        id: "latam-capital",
        title: "Capital Intros",
        subtitle: "Angels & micro‑funds",
        top: "60%",
        left: "20%",
      },
      {
        id: "latam-events",
        title: "Meetups",
        subtitle: "City‑based founder circles",
        top: "68%",
        left: "72%",
      },
    ],
  },
  {
    name: "Remote Income",
    type: "Financial",
    description: "Freelance and online income streams.",
    actions: ["Find gigs", "Tools"],
    widgets: [
      {
        id: "remote-gigs",
        title: "Curated Gigs",
        subtitle: "Design, dev, ops, research",
        top: "16%",
        left: "16%",
      },
      {
        id: "remote-marketplaces",
        title: "Platforms",
        subtitle: "Top places to apply this week",
        top: "22%",
        left: "64%",
      },
      {
        id: "remote-stacks",
        title: "Income Stacks",
        subtitle: "Stackable side‑income playbooks",
        top: "58%",
        left: "14%",
      },
      {
        id: "remote-tools",
        title: "Back‑office",
        subtitle: "Invoicing, tax, compliance",
        top: "66%",
        left: "70%",
      },
    ],
  },
  {
    name: "Sports Alpha",
    type: "Betting / Investing",
    description: "Predictive markets and sports edges.",
    actions: ["Bet", "Analyze", "Syndicate"],
    widgets: [
      {
        id: "sports-models",
        title: "Model Feeds",
        subtitle: "Win‑probabilities & spreads",
        top: "18%",
        left: "10%",
      },
      {
        id: "sports-markets",
        title: "Live Markets",
        subtitle: "On‑chain & book prices",
        top: "24%",
        left: "68%",
      },
      {
        id: "sports-prop",
        title: "Prop Builders",
        subtitle: "Custom player and team props",
        top: "60%",
        left: "18%",
      },
      {
        id: "sports-syndicate",
        title: "Syndicates",
        subtitle: "Pool capital & spread risk",
        top: "68%",
        left: "72%",
      },
    ],
  },
  {
    name: "Digital Assets",
    type: "Commerce",
    description: "Templates, SaaS, code, and media.",
    actions: ["Buy", "Sell", "License"],
    widgets: [
      {
        id: "assets-market",
        title: "Asset Market",
        subtitle: "Starter kits & playbooks",
        top: "18%",
        left: "12%",
      },
      {
        id: "assets-saas",
        title: "Micro‑SaaS",
        subtitle: "Tiny products with MRR",
        top: "24%",
        left: "66%",
      },
      {
        id: "assets-licenses",
        title: "Licensing Desk",
        subtitle: "White‑label & OEM deals",
        top: "60%",
        left: "20%",
      },
      {
        id: "assets-bundles",
        title: "Creator Bundles",
        subtitle: "Design, copy & dev packs",
        top: "68%",
        left: "72%",
      },
    ],
  },
  {
    name: "Biohacking",
    type: "Learning",
    description: "Longevity, labs, and supplements.",
    actions: ["Courses", "Products"],
    widgets: [
      {
        id: "bio-courses",
        title: "Protocols",
        subtitle: "Sleep, focus, recovery",
        top: "18%",
        left: "16%",
      },
      {
        id: "bio-labs",
        title: "At‑home Labs",
        subtitle: "Bloodwork & biomarkers",
        top: "24%",
        left: "68%",
      },
      {
        id: "bio-stacks",
        title: "Stacks",
        subtitle: "Supplement & habit stacks",
        top: "60%",
        left: "14%",
      },
      {
        id: "bio-market",
        title: "Product Shelf",
        subtitle: "Trusted brands & tools",
        top: "68%",
        left: "70%",
      },
    ],
  },
  {
    name: "Climate Ventures",
    type: "Investing",
    description: "Green startups and climate tech.",
    actions: ["Invest", "Grants"],
    widgets: [
      {
        id: "climate-deals",
        title: "Dealflow",
        subtitle: "Seed to growth‑stage rounds",
        top: "16%",
        left: "14%",
      },
      {
        id: "climate-grants",
        title: "Grant Desk",
        subtitle: "Non‑dilutive climate capital",
        top: "22%",
        left: "66%",
      },
      {
        id: "climate-studios",
        title: "Studios",
        subtitle: "Co‑found with operators",
        top: "58%",
        left: "12%",
      },
      {
        id: "climate-partners",
        title: "Partners",
        subtitle: "Corporate and NGO partners",
        top: "66%",
        left: "70%",
      },
    ],
  },
  {
    name: "Startup Services",
    type: "B2B",
    description: "Legal, finance, and marketing providers.",
    actions: ["Compare", "Book"],
    widgets: [
      {
        id: "services-legal",
        title: "Legal Stack",
        subtitle: "Formation, equity, IP",
        top: "18%",
        left: "12%",
      },
      {
        id: "services-finance",
        title: "Finance Ops",
        subtitle: "Accounting & CFO‑as‑a‑service",
        top: "24%",
        left: "68%",
      },
      {
        id: "services-growth",
        title: "Growth Partners",
        subtitle: "Paid, CRO, brand",
        top: "60%",
        left: "20%",
      },
      {
        id: "services-vendors",
        title: "Vendor Desk",
        subtitle: "Compare retainers & scopes",
        top: "68%",
        left: "72%",
      },
    ],
  },
];

const AD_TABS_COUNT = spaces.length;

// Mock data for the feed (categorized)
const feedItems: FeedItem[] = [
  {
    id: 1,
    title: "Chase Sapphire Dining Flash Deal",
    subtitle: "Tonight‑only 10% cashback at partner restaurants near you.",
    action: "View Offer",
    category: "saving",
    segment: "objects",
  },
  {
    id: 2,
    title: "TikTok UGC Creator – Skincare Brand",
    subtitle: "Shoot 3 short‑form videos per week from home.",
    action: "View Brief",
    category: "earning",
    segment: "objects",
  },
  {
    id: 3,
    title: "NYC → Lisbon Roundtrip – Google Flights",
    subtitle: "Sample fall itinerary with 1 stop under $450.",
    action: "View Flight",
    category: "saving",
    segment: "objects",
  },
  {
    id: 4,
    title: "Crypto Trading Courses",
    subtitle: "Beginner‑friendly paths before deploying capital",
    action: "Browse Courses",
    category: "learning",
    segment: "clusters",
  },
  {
    id: 5,
    title: "Costco Rotisserie Chicken – $4.99",
    subtitle: "Classic budget dinner that still hasn’t gone up in price.",
    action: "View Item",
    category: "saving",
    segment: "objects",
  },
  {
    id: 6,
    title: "Weekend Dog‑Sitting on Rover",
    subtitle:
      "3‑night golden retriever stay in your neighborhood, $120 payout.",
    action: "View Gig",
    category: "earning",
    segment: "objects",
  },
  {
    id: 7,
    title: "Vanguard Total Stock Market ETF (VTI)",
    subtitle: "Single fund owning 4,000+ U.S. companies with low fees.",
    action: "View Fund",
    category: "investing",
    segment: "objects",
  },
  {
    id: 8,
    title: "Online MBA Programs for Operators",
    subtitle: "Accredited, flexible and remote‑friendly options",
    action: "View Programs",
    category: "learning",
    segment: "clusters",
  },
  {
    id: 9,
    title: "NBA Same‑Game Parlay – Lakers vs. Warriors",
    subtitle: "Preset bet slip built from tonight’s most popular props.",
    action: "Open Bet Slip",
    category: "betting",
    segment: "objects",
  },
  {
    id: 10,
    title: "side hustles that scale to $1k / month",
    subtitle: "Idea clusters and playbooks by time & skill",
    action: "Open cluster",
    category: "earning",
    segment: "clusters",
  },
  {
    id: 11,
    title: "cashback & rewards cards bundle",
    subtitle: "Optimized wallet for travel, points and perks",
    action: "Compare bundle",
    category: "saving",
    segment: "clusters",
  },
  {
    id: 12,
    title: "Options Hedging Basics",
    subtitle: "Foundational courses, primers and tooling",
    action: "Browse Resources",
    category: "investing",
    segment: "clusters",
  },
  {
    id: 13,
    title: "starter ecommerce stack",
    subtitle: "Storefront, payments, theme and email tools",
    action: "View stack",
    category: "creating",
    segment: "clusters",
  },
  {
    id: 14,
    title: "Notion Second‑Brain Template",
    subtitle: "Personal knowledge system for tasks, notes and reading.",
    action: "Get Template",
    category: "creating",
    segment: "objects",
  },
  {
    id: 15,
    title: "passive income ideas for knowledge workers",
    subtitle: "Kits, examples and playbooks",
    action: "Open cluster",
    category: "earning",
    segment: "clusters",
  },
  {
    id: 16,
    title: "Investment Banking Summer Internships",
    subtitle: "Roles grouped by geography and bank tier",
    action: "View Openings",
    category: "earning",
    segment: "clusters",
  },
  {
    id: 17,
    title: "Airbnb Treehouse in Oregon Forest",
    subtitle: "Two‑night stay with hot tub, fire pit and 4.9★ rating.",
    action: "View Stay",
    category: "shopping",
    segment: "objects",
  },
  {
    id: 18,
    title: "online certifications that move the needle",
    subtitle: "Programs that signal skill & experience",
    action: "Browse programs",
    category: "learning",
    segment: "clusters",
  },
  {
    id: 19,
    title: "dividend portfolio ideas",
    subtitle: "Baskets optimized for monthly income",
    action: "View picks",
    category: "investing",
    segment: "clusters",
  },
  {
    id: 20,
    title: "Nintendo Switch Cozy Games Bundle",
    subtitle: "Animal Crossing, Stardew Valley and Spiritfarer in one pack.",
    action: "View Bundle",
    category: "shopping",
    segment: "objects",
  },
  {
    id: 21,
    title: "creator toolkits bundle",
    subtitle: "Templates, fonts, assets and audiences",
    action: "Browse bundle",
    category: "creating",
    segment: "clusters",
  },
  {
    id: 22,
    title: "Budget Meal Prep Ideas",
    subtitle: "Cheap, healthy recipes and weekly plans",
    action: "See Ideas",
    category: "shopping",
    segment: "clusters",
  },
  {
    id: 23,
    title: "Peloton App 30‑Day Free Trial",
    subtitle: "On‑demand cycling, strength and yoga classes at home.",
    action: "Start Trial",
    category: "learning",
    segment: "objects",
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
  const [selectedNewCategory, setSelectedNewCategory] =
    useState<NewCategoryKey | null>(null);
  const [selectedAdIndex, setSelectedAdIndex] = useState(0);
  const [mainScrollOffset, setMainScrollOffset] = useState(0);
  const sliderInViewRef = useRef(false);
  const mainSearchOutOfViewRef = useRef(false);
  const adHoverTimeoutRef = useRef<number | null>(null);
  const [isAdHovered, setIsAdHovered] = useState(false);
  const [isAdLongHover, setIsAdLongHover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFloatingSuggestionsOpen, setIsFloatingSuggestionsOpen] =
    useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [selectedFeedSegment] = useState<FeedSegment>("all");
  const [logoDividerHovered, setLogoDividerHovered] = useState(false);
  const [logoDividerPulse, setLogoDividerPulse] = useState(false);
  const [logoDividerPinned, setLogoDividerPinned] = useState(false);
  const logoDividerRef = useRef<HTMLDivElement>(null);

  /** collapsed = hyphen · soft = small box (hover/pulse) · pinned = large fixed overlay */
  const logoDividerSoft =
    !logoDividerPinned && (logoDividerHovered || logoDividerPulse);
  const logoDividerPhase: "collapsed" | "soft" | "pinned" = logoDividerPinned
    ? "pinned"
    : logoDividerSoft
      ? "soft"
      : "collapsed";

  const visibleFeedItems = useMemo(() => {
    let items = feedItems;
    const feedCat =
      selectedNewCategory != null
        ? newCategoryFeedFilter[selectedNewCategory]
        : undefined;
    if (feedCat) {
      items = items.filter((item) => item.category === feedCat);
    }
    if (selectedFeedSegment !== "all") {
      items = items.filter((item) => item.segment === selectedFeedSegment);
    }
    return items;
  }, [selectedNewCategory, selectedFeedSegment]);

  const activeSpace = useMemo(
    () => spaces[selectedAdIndex % spaces.length],
    [selectedAdIndex]
  );

  useEffect(() => {
    if (isAdLongHover || logoDividerPinned) return;
    const expandDurationMs = 1600;
    let pulseEndTimeout: number | null = null;
    const tick = () => {
      setLogoDividerPulse(true);
      if (pulseEndTimeout !== null) window.clearTimeout(pulseEndTimeout);
      pulseEndTimeout = window.setTimeout(() => {
        setLogoDividerPulse(false);
        pulseEndTimeout = null;
      }, expandDurationMs);
    };
    const first = window.setTimeout(tick, 4500);
    const id = window.setInterval(tick, 9000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(first);
      if (pulseEndTimeout !== null) window.clearTimeout(pulseEndTimeout);
    };
  }, [isAdLongHover, logoDividerPinned]);

  useEffect(() => {
    if (!logoDividerPinned) return;
    const handlePointerDown = (e: PointerEvent) => {
      const node = logoDividerRef.current;
      if (node && !node.contains(e.target as Node)) {
        setLogoDividerPinned(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [logoDividerPinned]);

  // When the search query is non-empty, prevent or cancel the long-hover state
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      if (adHoverTimeoutRef.current !== null) {
        window.clearTimeout(adHoverTimeoutRef.current);
        adHoverTimeoutRef.current = null;
      }
      if (isAdLongHover) {
        setIsAdLongHover(false);
      }
    }
  }, [searchQuery, isAdLongHover]);

  // Allow collapsing the expanded ad view with Escape
  useEffect(() => {
    if (!isAdLongHover) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAdLongHover(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdLongHover]);

  useEffect(() => {
    if (!logoDividerPinned) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setLogoDividerPinned(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [logoDividerPinned]);

  // Auto-advance ad tab every 5 seconds
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSelectedAdIndex((prev) => (prev + 1) % AD_TABS_COUNT);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

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

  // Track main scroll position (use window scroll so scrolling works everywhere)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      setMainScrollOffset(scrollTop);
    };

    // Initialize on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Collapse suggestions if main view is scrolled
  useEffect(() => {
    if (mainScrollOffset > 0) {
      // Immediately collapse if scrolled, regardless of hover state
      setIsSuggestionsHovered(false);
      // Also collapse any active long-hover state on the ad display
      if (adHoverTimeoutRef.current !== null) {
        window.clearTimeout(adHoverTimeoutRef.current);
        adHoverTimeoutRef.current = null;
      }
      setIsAdHovered(false);
      setIsAdLongHover(false);
    }
  }, [mainScrollOffset]);

  // Prevent page scroll when hovering over the ad display
  useEffect(() => {
    const shouldBlockScroll = isAdHovered && isAdLongHover;
    const handleWheel = (e: WheelEvent) => {
      if (!shouldBlockScroll) return;
      const target = e.target as HTMLElement;
      const adRoot = target.closest("[data-ad-display-root]");
      if (adRoot) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!shouldBlockScroll) return;
      const target = e.target as HTMLElement;
      const adRoot = target.closest("[data-ad-display-root]");
      if (adRoot) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (shouldBlockScroll) {
      document.addEventListener("wheel", handleWheel, { passive: false });
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isAdHovered, isAdLongHover]);

  // Prevent main page scroll when interacting with the categories explorer;
  // only the explorer itself should scroll.
  useEffect(() => {
    if (!isExplorerOpen) return;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const explorer = target.closest(
        "[data-categories-explorer-root]"
      ) as HTMLElement | null;
      if (!explorer) return;
      e.preventDefault();
      e.stopPropagation();
      explorer.scrollTop += e.deltaY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const explorer = target.closest(
        "[data-categories-explorer-root]"
      ) as HTMLElement | null;
      if (!explorer) return;
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isExplorerOpen]);

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
    <main className="no-scrollbar relative min-h-screen w-screen overflow-x-hidden bg-[#F6F6F6] outline-none">
      {/* Top Bar */}
      <TopBar
        mode="home"
        showCenterCollapsed={showCompactSearch}
        adTabsCount={AD_TABS_COUNT}
        selectedAdIndex={selectedAdIndex}
        onSelectAdIndex={setSelectedAdIndex}
      />

      {/* Floating Main Search Bar (appears at bottom when main search leaves view, or when explorer is open) */}
      <div
        className={`fixed bottom-[72px] left-1/2 z-[999] flex -translate-x-1/2 justify-center transition-all duration-300 ease-out ${
          showCompactSearch || isExplorerOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <div className="group relative flex w-full justify-center">
          {/* Main Search Bar (floating variant) */}
          <div className="relative z-20 inline-flex h-2.5 w-[20vw] max-w-[530px] items-center justify-between overflow-hidden rounded-[5px] border-[0.5px] border-black/0 bg-black/[3.5%] px-2 py-1 shadow-[0px_6px_40px_-8px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 ease-out group-hover:h-11 group-hover:w-[55vw] group-hover:border-black/5">
            <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-2xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              <Plus className="h-5 stroke-black/40" />
            </div>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                if (!isExplorerOpen) {
                  setIsFloatingSuggestionsOpen(value.trim() !== "");
                }
              }}
              className="h-full w-full flex-1 border-none bg-transparent px-2 text-center font-['Neue_Montreal'] text-[15px] font-normal text-black/100 opacity-0 outline-none transition-opacity duration-300 ease-out placeholder:text-black/30 focus:outline-none group-hover:opacity-100"
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
                if (!isExplorerOpen && searchQuery.trim() !== "") {
                  setIsFloatingSuggestionsOpen(true);
                }
              }}
              onBlur={() => {
                // Delay so click events on suggestions can fire
                setTimeout(() => {
                  if (!isExplorerOpen) {
                    setIsFloatingSuggestionsOpen(false);
                  }
                }, 120);
              }}
            />
            <div className="flex h-7 w-7 items-center justify-center gap-2 rounded-2xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              <Search className="h-5 stroke-black/40" />
            </div>
          </div>

          {/* Suggestions List – opens upward from floating search */}
          <div
            className={`absolute bottom-full left-1/2 -mb-1 inline-flex w-[95%] max-w-[510px] -translate-x-1/2 flex-col items-center justify-start overflow-hidden rounded-b-[0px] rounded-t-[10px] bg-black/[0.5%] pb-1 pt-1 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/10 backdrop-blur-[100px] transition-all duration-300 ease-out ${
              isFloatingSuggestionsOpen && !isExplorerOpen
                ? "pointer-events-none max-h-[0px] min-h-[0px] pb-0 opacity-0 group-hover:pointer-events-auto group-hover:max-h-[280px] group-hover:min-h-[120px] group-hover:opacity-100 group-hover:shadow-[0px_20px_160px_-60px_rgba(0,0,0,0.1)]"
                : "pointer-events-none max-h-[0px] min-h-[0px] pb-0 opacity-0"
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
      <BottomBar
        isExplorerOpen={isExplorerOpen}
        onToggleExplorer={() => {
          setIsExplorerOpen((prev) => {
            const next = !prev;
            if (next) {
              // When opening the explorer, collapse any ad long-hover state
              setIsAdLongHover(false);
              setIsAdHovered(false);
            }
            return next;
          });
        }}
      />

      {/* Space name / query label (hidden while explorer is open) */}
      {/* {!isExplorerOpen && (
        <div className="absolute left-1/2 top-[44px] z-20 flex -translate-x-1/2 flex-col items-center justify-start gap-2.5">
          <div
            className="group inline-flex min-w-[180px] items-center justify-between gap-2 rounded-[10px] border-x-[0.50px] border-y-[0.50px] border-black/10 bg-black/[0.1%] px-1 py-1 shadow-[0px_12px_40px_-26px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 ease-out"
            onMouseEnter={() => {
              setIsAdHovered(true);
              if (!isAdLongHover && mainScrollOffset === 0) {
                setIsAdLongHover(true);
              }
            }}
          >
            <button
              type="button"
              onClick={() => {
                setIsAdLongHover(false);
                setIsAdHovered(false);
              }}
              className={`flex h-5 w-5 items-center justify-center rounded-[6px] border-[0.5px] border-black/0 hover:bg-black/[2.5%] text-black/30 hover:text-black/40 transition-all duration-200 ${
                isAdLongHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <X className="h-3 w-3" />
            </button>

            <div className="mx-1 flex-1 text-center font-['Neue_Montreal'] text-[11px] font-normal text-black/55">
              {searchQuery.trim() || activeSpace.name}
            </div>

            <button
              type="button"
              onClick={() => {
                if (!isAdLongHover && mainScrollOffset === 0) {
                  setIsAdLongHover(true);
                  setIsAdHovered(true);
                }
              }}
              className={`flex h-5 w-5 items-center justify-center rounded-[6px] border-[0.5px] border-black/0 hover:bg-black/[2.5%] text-black/30 hover:text-black/40 transition-all duration-200  ${
                isAdLongHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <Maximize2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      )} */}

      {/* Main Container */}
      <div className="no-scrollbar relative flex flex-col items-center justify-center gap-0">
        {/* Display Div / Explorer */}
        <div
          ref={sliderRef}
          className="fixed top-0 z-0 flex h-screen w-full flex-col items-center justify-center gap-6 bg-black/0"
          // Another option is without: sticky top-0 mb-[7.5vh]
        >
          {isExplorerOpen ? (
            <CategoriesExplorerView filterQuery={searchQuery} />
          ) : (
            /* Ad Display */
            <div
              data-ad-display-root
              className={`duration-250 relative mb-[54px] overflow-hidden rounded-none border-[0.50px] bg-white/5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.0)] backdrop-blur-[50px] transition-all ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isVisible ? "" : "h-[45vh]"
              } ${
                isAdHovered && isAdLongHover
                  ? "h-[80%] w-[92.5%] border-black/10 bg-black/[0.35%]"
                  : "h-[100vh] w-[100%] border-black/0"
              }`}
              onMouseEnter={() => {
                setIsAdHovered(true);
              }}
              onMouseLeave={() => {
                setIsAdHovered(false);
                setIsAdLongHover(false);
              }}
            >
              {/* Free‑form space canvas */}
              <div
                className={`relative flex h-full w-full items-center justify-center px-10 pb-10 pt-14 transition-opacity duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                  isAdLongHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative h-full w-full max-w-[640px]">
                  {activeSpace.widgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="group absolute flex w-[180px] cursor-pointer flex-col gap-0 rounded-[2px] border-[0.50px] border-black/10 shadow-[0px_4px_35px_-20px_rgba(0,0,0,0.0)] backdrop-blur-xl transition-transform duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-black/[1%]"
                      style={{ top: widget.top, left: widget.left }}
                    >
                      {/* Image placeholder */}
                      <div className="h-28 w-full bg-black/[0.0]" />

                      <div className="absolute bottom-0 left-0 flex h-0 w-full items-center justify-center -space-y-0.5 border-t-[0.50px] border-black/[0.05] bg-white/5 px-2.5 py-1.5 opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-auto group-hover:opacity-100">
                        <div className="font-['Neue_Montreal'] text-[11px] font-normal leading-snug text-black/55">
                          {widget.subtitle}
                        </div>
                      </div>

                      <div className="absolute -bottom-[28px] left-1/2 flex -translate-x-1/2 items-start justify-center gap-0.5 rounded-md bg-black/0 px-1.5 py-[2px]">
                        <div className="font-['Neue_Montreal'] text-[11px] text-black/40">
                          {widget.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Logo */}
          <div
            className={`duration-250 absolute left-1/2 top-[22.5vh] -translate-x-1/2 justify-start text-center font-['Neue_Montreal'] text-5xl font-normal leading-none text-black transition-opacity ease-[cubic-bezier(0.19,1,0.22,1)] lg:top-[26.5vh] ${
              isAdLongHover ? "hidden opacity-0" : "opacity-100"
            }`}
          >
            <div className="inline-flex items-center justify-center gap-6">
              <span className="select-none tracking-tight">WEB</span>
              <div className="relative flex h-12 w-20 shrink-0 items-center justify-center">
                <div
                  ref={logoDividerRef}
                  role="presentation"
                  aria-hidden
                  onMouseEnter={() => setLogoDividerHovered(true)}
                  onMouseLeave={() => setLogoDividerHovered(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (logoDividerPinned) return;
                    setLogoDividerPinned(true);
                    setLogoDividerHovered(false);
                    setLogoDividerPulse(false);
                  }}
                  className={`shrink-0 cursor-pointer ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    logoDividerPhase === "pinned"
                      ? "fixed left-1/2 top-1/2 z-[1100] h-[min(48vh,420px)] w-[min(80vw,1200px)] -translate-x-1/2 -translate-y-1/3 rounded-sm border-[3px] border-white bg-zinc-100 shadow-[0px_4px_30px_-6px_rgba(0,0,0,0.07)] transition-[width,height,box-shadow,background-color,border-width,border-color,border-radius] duration-500"
                      : logoDividerPhase === "soft"
                        ? "absolute left-1/2 top-1/2 z-[1] h-12 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border-[3px] border-white bg-zinc-100 shadow-[0px_4px_30px_-6px_rgba(0,0,0,0.07)] transition-[width,height,box-shadow,background-color,border-width,border-color,border-radius] duration-500"
                        : "absolute left-1/2 top-1/2 z-[1] h-[4.5px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-none border-0 bg-black shadow-none transition-[width,height,box-shadow,background-color,border-width,border-color,border-radius] duration-500"
                  }`}
                >
                  {logoDividerPinned && (
                    <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <div className="inline-flex w-40 flex-col items-center justify-center rounded-bl-xl rounded-br-xl border-b-[0.50px] border-l-[0.50px] border-r-[0.50px] border-black/10 px-2.5 py-2">
                        <div className="justify-start text-center font-['Neue_Montreal'] text-[10px] font-medium text-black/40">
                          WEB&nbsp;&nbsp;–––&nbsp;&nbsp;MKT
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <span className="select-none tracking-tight">MKT</span>
            </div>
          </div>
        </div>

        {/* Scrolling Div */}
        {/* mt controls offset from the ad display; it expands when hovering the ad space */}
        <div
          className={`relative z-10 flex w-full flex-col items-center justify-start border-t-[0.50px] border-black/10 bg-[#F6F6F6] pt-[60vh] shadow-[0px_-20px_120px_-60px_rgba(0,0,0,0.05)] transition-[margin-top] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isAdLongHover || isExplorerOpen ? "mt-[100vh]" : "mt-[40vh]"
          }`}
        >
          {/* Search Container */}
          <div className="absolute -top-6 z-20 flex flex-col items-center justify-start gap-8">
            <div className="relative z-30 flex flex-col items-center justify-start">
              {/* Main Search Bar */}
              <div
                ref={mainSearchRef}
                className="relative z-20 inline-flex h-11 w-[55vw] min-w-[380px] max-w-[640px] items-center justify-between overflow-hidden rounded-[16px] bg-white px-2 py-1 shadow-[0px_2px_20px_-8px_rgba(0,0,0,0.05)]"
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
                  // Check scroll position directly to ensure accuracy
                  const currentScrollOffset =
                    window.scrollY || document.documentElement.scrollTop || 0;
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
                className={`absolute left-1/2 top-full z-10 -mt-1 inline-flex -translate-x-1/2 flex-col items-center justify-start overflow-hidden rounded-bl-[10px] rounded-br-[10px] bg-black/[0.1%] pt-1 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/10 backdrop-blur-[100px] transition-all duration-300 ease-out ${
                  isSuggestionsHovered && mainScrollOffset === 0
                    ? "max-h-[280px] min-h-[280px] w-[95%] pb-0 shadow-[0px_20px_160px_-60px_rgba(0,0,0,0.1)]"
                    : "max-h-[32px] w-[65%] min-w-[280px] pb-0"
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
              className="z-20 mt-7 inline-flex h-8 w-44 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl border-[0.50px] border-black/10 bg-black/[0%] px-3 py-2 backdrop-blur-xl transition-all duration-100 hover:bg-black/[1.5%]"
            >
              <div className="justify-start text-center font-['Neue_Montreal'] text-xs font-medium text-black/80">
                I&apos;m Feeling Lucky
              </div>
            </button>
          </div>

          {/* Categories */}
          {/* -mt-[112px] is to compensate for the bottom bar height */}
          {/*
          <div className="inline-flex w-full flex-col items-center justify-center gap-2.5 border-b-[0.5px] border-black/10 px-3.5 py-3.5 opacity-100 lg:-mt-[112px]">
            <div className="inline-flex w-full max-w-[60%] items-center justify-center gap-3.5">
              {feedCategoryTabs.map((tab) => {
                const isSelected = selectedFeedCategory === tab.key;
                return (
                  <div
                    key={tab.key}
                    onClick={() =>
                      setSelectedFeedCategory(isSelected ? null : tab.key)
                    }
                    className={`flex h-auto w-full min-w-24 cursor-pointer items-center justify-center gap-2.5 rounded-lg border-[0.5px] border-black/10 px-4 py-[6px] transition-colors ${
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
          */}

          {/* New Category List */}
          <div className="flex w-full min-w-0 items-center justify-center overflow-y-hidden border-b-[0.50px] border-black/10 lg:-mt-[160px]">
            <div className="no-scrollbar flex w-auto max-w-full flex-nowrap items-center justify-center gap-[3px] self-stretch overflow-x-auto rounded-t-[14px] border-[0.50px] border-b-[0px] border-black/10 bg-black/0 px-2 py-2 shadow-[inset_0px_-2px_14px_-4px_rgba(0,0,0,0.04)] backdrop-blur-xl">
              {newCategoryList.map((row) => {
                const isSelected = selectedNewCategory === row.key;
                return (
                  <div
                    key={row.key}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setSelectedNewCategory(isSelected ? null : row.key)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedNewCategory(isSelected ? null : row.key);
                      }
                    }}
                    className={`inline-flex w-[88px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl py-3.5 outline outline-[0.50px] outline-offset-[-0.50px] transition-colors ${
                      isSelected
                        ? "bg-white/40 outline-black/15"
                        : "outline-black/0 hover:bg-black/[1%]"
                    }`}
                  >
                    <div
                      className={`h-9 w-9 rounded-[100px] bg-black/5 p-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-lg ${
                        row.iconStyle === "border"
                          ? "border-[2.50px] border-white"
                          : "flex flex-col items-center justify-center gap-2 outline outline-[2.50px] outline-offset-[-2.50px] outline-white"
                      }`}
                    />
                    <div
                      className={`line-clamp-1 justify-start text-center font-['Neue_Montreal'] text-xs font-normal ${
                        isSelected ? "text-black/50" : "text-black/25"
                      }`}
                    >
                      {row.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feed Container */}
          <div className="relative flex w-full flex-col items-center justify-start overflow-hidden">
            {/* Segmented Feed Tabs */}
            {/* <div className="absolute top-[1.75vw] z-20 flex w-auto justify-center">
              <div className="w-full inline-flex items-center justify-center p-1 gap-0 rounded-full border-[0.5px] border-black/10 bg-white/0 shadow-[0px_8px_30px_-18px_rgba(0,0,0,0.0)] backdrop-blur-[0px]">
              {([
                { key: "all" as FeedSegment, label: "All" },
                { key: "objects" as FeedSegment, label: "Objects" },
                { key: "clusters" as FeedSegment, label: "Clusters" },
              ] as const).map((segment) => {
                  const isActive = selectedFeedSegment === segment.key;
                  return (
                    <button
                      key={segment.key}
                      type="button"
                      onClick={() => setSelectedFeedSegment(segment.key)}
                      className={`w-[75px] flex items-center justify-center rounded-full px-3 py-0.5 text-[13px] font-normal font-['Neue_Montreal'] transition-colors duration-150 ${
                        isActive
                          ? "bg-white/100 text-black shadow-[0px_2px_12px_-4px_rgba(0,0,0,0.03)]"
                          : "text-black/35 hover:bg-black/[2%]"
                      }`}
                    >
                      {segment.label}
                    </button>
                  );
                })}
              </div>
            </div> */}

            {/* Feed Items */}
            <div className="feed-border-vertical inline-flex min-h-[87.5vh] w-full flex-wrap content-start items-start justify-center gap-[40px] px-10 pb-[20vh] pt-10 sm:w-[70%] sm:px-[5vw] sm:pb-[30vh] sm:pt-[7.5vw]">
              {visibleFeedItems.map((item) => (
                <ExpandedFeedItemCard
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  action={item.action}
                  onClick={() => goToSearch(item.title)}
                />
              ))}
            </div>

            {/* Background Grid */}
            {/* <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
              <div className="grid h-full w-full grid-cols-8">
                {Array.from({ length: 200 }).map((_, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="aspect-square border-[0.50px] border-black/[4%]"
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
