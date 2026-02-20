import { Plus, Search } from "lucide-react";
import { KeyboardEvent, useMemo, useState } from "react";

export type CompactSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  suggestions?: string[];
  showNoResultsState?: boolean;
  onSelectSuggestion?: (value: string) => void;
  onFeelingLucky?: () => void;
};

export function CompactSearchBar({
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  suggestions,
  showNoResultsState,
  onSelectSuggestion,
  onFeelingLucky,
}: CompactSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    onFocus?.();
  };

  const handleBlur = () => {
    // Small delay so onMouseDown handlers on list items can run first
    setTimeout(() => setIsOpen(false), 0);
    onBlur?.();
  };

  const filteredSuggestions = useMemo(() => {
    if (!suggestions || suggestions.length === 0) return [];
    const q = value.trim().toLowerCase();
    if (!q) return suggestions;
    return suggestions.filter((item) => item.toLowerCase().includes(q));
  }, [suggestions, value]);

  const shouldShowPanel =
    isOpen && (filteredSuggestions.length > 0 || showNoResultsState);

  return (
    <div className="relative w-full">
      {/* Search bar */}
      <div className="relative z-10 inline-flex h-8 w-full items-center justify-between self-stretch overflow-hidden rounded-[5px] bg-white px-0.5 py-1 shadow-[0px_2px_20px_-8px_rgba(0,0,0,0.05)]">
        <div className="flex h-7 w-7 items-center justify-center rounded-[10px] p-1">
          <Plus className="h-4 stroke-black/40" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="h-full w-full flex-1 border-none bg-transparent px-2 text-center font-['Neue_Montreal'] text-[13px] font-normal text-black/100 outline-none placeholder:text-black/30 focus:outline-none"
          placeholder="Search..."
        />
        <button
          type="button"
          onClick={() => value.trim() !== "" && onSubmit()}
          className="flex h-7 w-7 items-center justify-center rounded-[10px] p-1"
        >
          <Search className="h-4 stroke-black/40" />
        </button>
      </div>

      {/* Suggestions panel */}
      {suggestions && shouldShowPanel && (
        <div className="absolute left-1/2 top-full -mt-1 max-h-[260px] min-h-[200px] w-full max-w-[95%] -translate-x-1/2 overflow-hidden rounded-bl-[10px] rounded-br-[10px] bg-black/[0.5%] pt-1 outline outline-[0.50px] outline-offset-[-0.25px] outline-black/10 backdrop-blur-[60px] transition-all duration-300 ease-out">
          <div className="no-scrollbar max-h-[260px] overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelectSuggestion?.(suggestion);
                  }}
                  className="flex cursor-pointer flex-col items-start justify-start gap-2 self-stretch border-t-[0.0px] bg-black/0 p-3.5 text-black/80 backdrop-blur-xl hover:bg-black/[1.5%]"
                >
                  <div className="inline-flex items-center justify-start gap-2.5">
                    <div className="h-6 w-6 rounded-md bg-white" />
                    <div className="inline-flex flex-col items-start justify-center">
                      <div className="line-clamp-1 justify-start font-['Neue_Montreal'] text-[13px] font-normal">
                        {suggestion}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : showNoResultsState ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 self-stretch py-14">
                <div className="text-center font-['Neue_Montreal'] text-xs font-normal text-black/40">
                  No results found. Try a different search.
                </div>
                {onFeelingLucky && (
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onFeelingLucky();
                    }}
                    className="inline-flex h-7 w-44 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-md bg-black/[2.5%] px-3 py-2 backdrop-blur-xl transition-all duration-100 hover:bg-black/[5%]"
                  >
                    <div className="justify-start text-center font-['Neue_Montreal'] text-xs font-medium text-black/60">
                      I&apos;m Feeling Lucky
                    </div>
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
