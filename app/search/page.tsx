"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FeedItemCard } from "../components/FeedItemCard";
import { CompactSearchBar } from "../components/CompactSearchBar";
import { BottomBar } from "../components/BottomBar";
import { TopBar } from "../components/TopBar";
import {
  getSearchResults,
  getResultsByCategory,
  getAllEntities,
  type SearchResultCategory,
  type SearchResult,
} from "../data/searchResults";

type SearchFeedCategory =
  | "bestMatch"
  | "objects"
  | "offerings"
  | "entities"
  | "opportunities"
  | "related";

const searchCategoryTabs: Array<{ key: SearchFeedCategory; label: string }> = [
  { key: "bestMatch", label: "Best Match" },
  { key: "objects", label: "Objects" },
  { key: "offerings", label: "Offerings" },
  { key: "opportunities", label: "Opportunities" },
  { key: "entities", label: "Entities" },
  { key: "related", label: "Related" },
];

export default function SearchResultsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q")?.trim() ?? "";
  const [searchQuery, setSearchQuery] = useState(q);
  const [selectedCategory, setSelectedCategory] =
    useState<SearchFeedCategory>("bestMatch");

  useEffect(() => {
    setSearchQuery(q);
  }, [q]);

  const goToSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  // Get search results based on query
  const results = useMemo<SearchResult[]>(() => {
    if (!q) {
      // If no query, return a mix of all categories
      return [
        ...getResultsByCategory("objects").slice(0, 5),
        ...getResultsByCategory("offerings").slice(0, 5),
        ...getResultsByCategory("opportunities").slice(0, 5),
        ...getResultsByCategory("entities").slice(0, 5),
      ];
    }
    return getSearchResults(q);
  }, [q]);

  // Filter results by selected category
  const categoryFilteredResults = useMemo(() => {
    if (selectedCategory === "bestMatch") {
      return results;
    }

    // Map SearchFeedCategory to SearchResultCategory
    const categoryMap: Record<SearchFeedCategory, SearchResultCategory | null> =
      {
        bestMatch: null,
        objects: "objects",
        offerings: "offerings",
        opportunities: "opportunities",
        entities: "entities",
        related: "related",
      };

    const mappedCategory = categoryMap[selectedCategory];
    if (!mappedCategory) return results;

    if (mappedCategory === "related") {
      // For "related", return a mix of items from different categories
      return getResultsByCategory("related");
    }

    // Filter by category
    return results.filter((item) => item.category === mappedCategory);
  }, [results, selectedCategory]);

  // Get suggestions for compact search bar (all titles from entities, offerings, opportunities, objects)
  const compactSuggestions = useMemo(() => {
    const allEntities = getAllEntities();
    const allObjects = getResultsByCategory("objects");
    const allOfferings = getResultsByCategory("offerings");
    const allOpportunities = getResultsByCategory("opportunities");

    return [
      ...allEntities.map((e) => e.name),
      ...allObjects.map((o) => o.title),
      ...allOfferings.map((o) => o.title),
      ...allOpportunities.map((o) => o.title),
    ];
  }, []);

  return (
    <main className="no-scrollbar relative h-screen w-screen overflow-y-auto scroll-smooth bg-[#F6F6F6] outline-none">
      {/* Top Bar */}
      <TopBar
        mode="search"
        compactSearchNode={
          <CompactSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={() => goToSearch(searchQuery)}
            suggestions={compactSuggestions}
            showNoResultsState
            onSelectSuggestion={goToSearch}
            onFeelingLucky={() =>
              goToSearch(searchQuery || "I'm Feeling Lucky")
            }
          />
        }
      />

      {/* Bottom Bar */}
      <BottomBar />

      <div className="relative flex flex-col items-center justify-center gap-0">
        {/* Top spacer to account for fixed bars */}
        {/* <div className="pt-[50px]" /> */}

        {/* Category Filter (same style as main feed) */}
        <div className="inline-flex w-full flex-col items-center justify-center gap-2.5 border-b-[0.50px] border-black/15 px-2.5 py-2.5 pt-[60px]">
          <div className="inline-flex w-[75%] items-center justify-center gap-1">
            {searchCategoryTabs.map((tab, index) => {
              const isSelected = selectedCategory === tab.key;
              const lastIndex = searchCategoryTabs.length - 1;
              const showLeadingDivider = index === 1 || index === lastIndex;

              return (
                <div key={tab.key} className="inline-flex items-center gap-1">
                  {showLeadingDivider && (
                    <div className="h-3 w-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/5" />
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`flex w-auto cursor-pointer items-center justify-center gap-2.5 rounded-lg px-4 py-[6px] transition-colors ${
                      isSelected
                        ? "text-black"
                        : "text-black/30 hover:bg-black/[2%] hover:text-black/60"
                    }`}
                  >
                    <div className="justify-start text-right font-['Neue_Montreal'] text-xs font-normal">
                      {tab.label}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results list – same card layout as feed */}
        <div className="z-10 flex w-full flex-col items-center justify-center border-t-[0.50px] border-black/0 bg-[#F6F6F6]">
          <div className="feed-border-vertical inline-flex min-h-[85vh] w-[75%] flex-wrap content-start items-start justify-center gap-6 border-l-[0.50px] border-r-[0.50px] border-black/20 p-12 pb-36">
            {categoryFilteredResults.map((item) => (
              <FeedItemCard
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                action={item.action}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
