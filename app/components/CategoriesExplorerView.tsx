import { ChevronDown, ChevronUp, LayoutGrid } from "lucide-react";
import { useState } from "react";

type ExplorerTab =
  | "assets"
  | "products"
  | "services"
  | "opportunities"
  | "programs"
  | "entities";

const explorerTabs: Array<{ key: ExplorerTab; label: string }> = [
  { key: "assets", label: "Objects" },
  { key: "products", label: "Products" },
  { key: "services", label: "Services" },
  { key: "programs", label: "Programs" },
  { key: "opportunities", label: "Opportunities" },
  { key: "entities", label: "Entities" },
];

const allCategories: string[] = [
  "Income & Work",
  "Investing & Markets",
  "Shopping & Deals",
  "Learning & Education",
  "Health & Longevity",
  "Housing & Real Estate",
  "Travel & Experiences",
  "Tools & Software",
  "Side Hustles",
  "Betting & Games",
  "Communities",
  "Finance & Banking",
  "Media & Content",
  "Wellness & Fitness",
  "Food & Nutrition",
  "Productivity",
  "Automation",
  "Hiring & Talent",
  "Legal & Compliance",
  "Analytics & Data",
].sort((a, b) => a.localeCompare(b));

const explorerData: Record<ExplorerTab, string[]> = {
  products: [
    "All‑in‑One Budgeting App",
    "AI Writing Assistant",
    "Creator Landing Page Kit",
    "Sports Odds Dashboard",
    "Portfolio Tracker Pro",
    "No‑Code Automation Library",
    "Email Sequence Templates",
    "Brand Design Starter Pack",
    "Habit Tracking Journal",
    "Freelancer CRM",
    "Remote Interview Toolkit",
    "Paid Newsletter Engine",
    "Podcast Launch System",
    "Micro‑SaaS Billing Stack",
    "Community OS",
    "Fundraising Data Room Kit",
    "Course Creation Framework",
    "Influencer Brief Templates",
    "SEO Content Planner",
    "Webinar Funnel Kit",
  ],
  services: [
    "Fractional CMO",
    "Performance Marketing Studio",
    "Executive Coaching",
    "Technical Due Diligence",
    "Custom ML Model Builds",
    "Paid Social Playbooks",
    "Funnel Diagnostics",
    "Brand Positioning Sprint",
    "Product Analytics Audit",
    "Conversion Rate Optimization",
    "Lifecycle Email Setup",
    "Community Management",
    "Influencer Program Design",
    "Creator Partnerships Desk",
    "Podcast Growth Service",
    "Landing Page Copy Clinic",
    "Founders Finance Desk",
    "Outsourced Ops Team",
    "Recruiting Pod",
    "White‑Glove Onboarding",
  ],
  assets: [
    "Notion Workspace Templates",
    "Figma Component Library",
    "Pitch Deck Templates",
    "Email Swipe Files",
    "Ad Creative Packs",
    "Logo & Brand Kits",
    "UI Icon Sets",
    "Landing Page Sections",
    "Invoice & Contract Templates",
    "CRM Pipeline Templates",
    "Design System Tokens",
    "Video Hook Scripts",
    "Short‑Form Content Prompts",
    "Podcast Episode Outlines",
    "Course Slide Decks",
    "Research Report Layouts",
    "Investment Memos",
    "Due Diligence Checklists",
    "Hiring Scorecards",
    "Internal Playbooks",
  ],
  programs: [
    "Cohort‑Based Course: Build Your First SaaS",
    "4‑Week Audience Sprint",
    "Indie Founder Accountability Group",
    "Betting Markets Masterclass",
    "Creator Incubator",
    "Remote Income Bootcamp",
    "Professional Rebrand Intensive",
    "Operator to Founder Track",
    "Community Launch Lab",
    "AI Builder Residency",
    "Climate Venture Fellowship",
    "Latam Founders Camp",
    "Zero‑to‑One Writing Track",
    "Tiny Product Studio",
    "Investor Readiness Program",
    "Side Hustle in 30 Days",
    "Agency Systems Workshop",
    "Micro‑Private Equity Lab",
    "Makers Weekend",
    "Earn Online in 90 Days",
  ],
  opportunities: [
    "Angel Syndicate Spots",
    "Revenue‑Share Deals",
    "Creator Collab Slots",
    "Beta Tester Cohorts",
    "Whitelisted Product Launches",
    "Sponsored Content Briefs",
    "Affiliate Launch Windows",
    "Founding Customer Programs",
    "Referral Partner Openings",
    "Grant & Non‑Dilutive Capital Calls",
    "Climate Pilot Programs",
    "Design Partner Slots",
    "Scholarships & Fellowships",
    "B2B Pilot Deals",
    "Micro‑acquisition Listings",
    "Operator in Residence Roles",
    "Ad Inventory Packages",
    "Whitelist for New Funds",
    "Waitlists for Private Communities",
    "Limited‑Run Product Drops",
  ],
  entities: [
    "Acme Capital",
    "Remote Works Inc.",
    "Atlas Labs",
    "Northwind Trading",
    "Pioneer Studio",
    "Summit Ventures",
    "Creator Collective",
    "Omni Retail Group",
    "Delta Research",
    "Signal Analytics",
    "Horizon Travel Co.",
    "Founders Circle LATAM",
    "Prime Health Partners",
    "Climatetech Guild",
    "Open Learning Alliance",
    "Beacon Media Network",
    "Indie SaaS Studio",
    "Vector Sports Syndicate",
    "Vertex Legal",
    "Main Street Bank",
  ],
};

type CategoriesExplorerViewProps = {
  filterQuery?: string;
};

export function CategoriesExplorerView({
  filterQuery = "",
}: CategoriesExplorerViewProps) {
  const [activeTab, setActiveTab] = useState<ExplorerTab>("assets");
  const [, setIsAllCategoriesSelected] = useState(false);
  const [showAllCategoriesList, setShowAllCategoriesList] = useState(false);

  const baseItems = showAllCategoriesList
    ? allCategories
    : explorerData[activeTab];
  const normalizedFilter = filterQuery.trim().toLowerCase();
  const items =
    normalizedFilter.length > 0
      ? baseItems.filter((title) =>
          title.toLowerCase().includes(normalizedFilter)
        )
      : baseItems;

  return (
    <div
      data-categories-explorer-root
      className="no-scrollbar relative flex h-full w-full items-start justify-center overflow-y-auto bg-[#F6F6F6]"
    >
      <div className="relative inline-flex w-full flex-col items-start justify-start">
        <div className="z-10 mb-8 mt-16 inline-flex w-full items-center justify-start gap-4 px-[10vw]">
          {/* All Categories pill */}
          <button
            type="button"
            onClick={() => {
              // Toggle between showing the all-categories list and normal mode
              if (!showAllCategoriesList) {
                setIsAllCategoriesSelected(true);
                setShowAllCategoriesList(true);
              } else {
                setIsAllCategoriesSelected(false);
                setShowAllCategoriesList(false);
              }
            }}
            className={`relative flex items-center justify-start gap-2.5 rounded-md border-[0.50px] p-3.5 transition-colors ${
              showAllCategoriesList
                ? "w-full border-black/10 text-black/80 hover:bg-black/[1.5%]"
                : "w-full min-w-32 border-black/10 bg-black/0 text-black/45 hover:bg-black/[2%]"
            }`}
          >
            <LayoutGrid className="h-5 stroke-black/30" />
            <span className="font-['Neue_Montreal'] text-[13px] font-normal">
              {showAllCategoriesList ? "All Categories" : "All Categories"}
            </span>
            {showAllCategoriesList ? (
              <ChevronUp className="absolute right-3.5 h-5 stroke-black/30" />
            ) : (
              <ChevronDown className="absolute right-3.5 h-5 stroke-black/30" />
            )}
          </button>

          {/* Individual category chips (sampled from allCategories) */}
          {/* {!showAllCategoriesList && (
            <div className="flex w-full items-center gap-4">
              {allCategories.slice(0, 6).map((category) => (
                <div
                  key={category}
                  className="flex h-9 w-full items-center justify-center rounded-md border-[0.50px] border-black/10 bg-black/0 px-3 text-[11px] font-normal font-['Neue_Montreal'] text-black/45"
                >
                  {category}
                </div>
              ))}
            </div>
          )} */}
        </div>

        {!showAllCategoriesList && (
          <div className="sticky top-0 -mt-10 inline-flex items-center justify-start self-stretch border-b-[0.50px] border-black/10 bg-white/[1%] px-[10vw] pt-10 backdrop-blur-[50px]">
            {explorerTabs.map((tab, index) => {
              const isActive = tab.key === activeTab;
              return (
                <div
                  key={tab.key}
                  className={`group flex flex-1 items-center justify-center gap-0 border-b-[0.50px] ${
                    isActive ? "border-black/100" : "border-black/0"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);
                      setIsAllCategoriesSelected(false);
                      setShowAllCategoriesList(false);
                    }}
                    className="flex w-full items-center justify-center py-2 hover:bg-black/[0%]"
                  >
                    <span
                      className={`whitespace-nowrap font-['Neue_Montreal'] text-xs font-normal ${
                        isActive
                          ? "text-black/80"
                          : "text-black/30 group-hover:text-black/50"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                  {index < explorerTabs.length - 1 && (
                    <div className="h-3 w-0 outline outline-[0.5px] outline-black/5" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showAllCategoriesList ? (
          <div className="self-stretch px-[10vw]">
            <div
              className={`mt-1 flex flex-col gap-4 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                showAllCategoriesList
                  ? "max-h-auto translate-y-0 opacity-100"
                  : "max-h-0 -translate-y-2 opacity-0"
              }`}
            >
              {items.map((title, idx) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="flex h-auto items-center justify-start gap-3 rounded-md border-[0.50px] border-black/10 bg-black/0 px-3.5 py-3.5 font-['Neue_Montreal'] text-[13px] font-normal text-black/55 shadow-[0px_0px_0px_rgba(0,0,0,0)] transition-colors duration-200 ease-out hover:bg-black/[1.5%]"
                >
                  <div className="h-5 w-5 rounded bg-black/[5%]" />
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start self-stretch">
            {items.map((title, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className="inline-flex items-center justify-start gap-3 self-stretch border-t-[0.50px] px-[10vw] py-3.5 hover:bg-black/[1.5%]"
              >
                <div className="h-4 w-4 rounded bg-black/5" />
                <div
                  className={`justify-start font-['Neue_Montreal'] text-xs font-normal ${
                    idx === 0 ? "text-black/60" : "text-black/40"
                  }`}
                >
                  {title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
