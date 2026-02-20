// Comprehensive mock search results data
// Each result is categorized as: objects, offerings, opportunities, or entities

export type SearchResultCategory =
  | "objects"
  | "offerings"
  | "opportunities"
  | "entities"
  | "related";

export type SearchResult = {
  id: number;
  title: string;
  subtitle: string;
  action: string;
  category: SearchResultCategory;
  entityId?: number; // Reference to the entity that owns/publishes this
};

export type Entity = {
  id: number;
  name: string;
  subtitle: string;
  action: string;
  category: "entities";
};

// Entities (companies, platforms, organizations)
const entities: Entity[] = [
  {
    id: 1001,
    name: "Chase Bank",
    subtitle: "Financial services provider",
    action: "Visit Site",
    category: "entities",
  },
  {
    id: 1002,
    name: "Coursera",
    subtitle: "Online learning platform",
    action: "Browse Courses",
    category: "entities",
  },
  {
    id: 1003,
    name: "Upwork",
    subtitle: "Freelance marketplace",
    action: "Join Platform",
    category: "entities",
  },
  {
    id: 1004,
    name: "Robinhood",
    subtitle: "Investment platform",
    action: "Sign Up",
    category: "entities",
  },
  {
    id: 1005,
    name: "Ally Bank",
    subtitle: "Online banking services",
    action: "Open Account",
    category: "entities",
  },
  {
    id: 1006,
    name: "Udemy",
    subtitle: "Online course marketplace",
    action: "Explore",
    category: "entities",
  },
  {
    id: 1007,
    name: "Fiverr",
    subtitle: "Freelance services platform",
    action: "Get Started",
    category: "entities",
  },
  {
    id: 1008,
    name: "Vanguard",
    subtitle: "Investment management company",
    action: "Learn More",
    category: "entities",
  },
  {
    id: 1009,
    name: "Shopify",
    subtitle: "E-commerce platform",
    action: "Start Store",
    category: "entities",
  },
  {
    id: 1010,
    name: "Coinbase",
    subtitle: "Cryptocurrency exchange",
    action: "Trade Now",
    category: "entities",
  },
  {
    id: 1011,
    name: "Khan Academy",
    subtitle: "Free online education",
    action: "Start Learning",
    category: "entities",
  },
  {
    id: 1012,
    name: "Etsy",
    subtitle: "Handmade & vintage marketplace",
    action: "Shop Now",
    category: "entities",
  },
  {
    id: 1013,
    name: "Betterment",
    subtitle: "Robo-advisor platform",
    action: "Invest",
    category: "entities",
  },
  {
    id: 1014,
    name: "MasterClass",
    subtitle: "Online classes from experts",
    action: "Subscribe",
    category: "entities",
  },
  {
    id: 1015,
    name: "Wealthfront",
    subtitle: "Automated investment service",
    action: "Get Started",
    category: "entities",
  },
];

// Objects (physical or digital products, tools, apps)
const objects: SearchResult[] = [
  {
    id: 2001,
    title: "Chase Sapphire Preferred Card",
    subtitle: "Premium travel rewards credit card",
    action: "Apply Now",
    category: "objects",
    entityId: 1001,
  },
  {
    id: 2002,
    title: "TradingView Pro Subscription",
    subtitle: "Advanced charting and analysis tools",
    action: "Subscribe",
    category: "objects",
  },
  {
    id: 2003,
    title: "MetaTrader 5 Platform",
    subtitle: "Professional trading software",
    action: "Download",
    category: "objects",
  },
  {
    id: 2004,
    title: "QuickBooks Accounting Software",
    subtitle: "Small business financial management",
    action: "Try Free",
    category: "objects",
  },
  {
    id: 2005,
    title: "Mint Budgeting App",
    subtitle: "Personal finance tracker",
    action: "Download",
    category: "objects",
  },
  {
    id: 2006,
    title: "YNAB (You Need A Budget)",
    subtitle: "Zero-based budgeting system",
    action: "Start Trial",
    category: "objects",
  },
  {
    id: 2007,
    title: "Bloomberg Terminal",
    subtitle: "Financial data and analytics platform",
    action: "Request Demo",
    category: "objects",
  },
  {
    id: 2008,
    title: "TurboTax Software",
    subtitle: "Tax preparation and filing",
    action: "File Now",
    category: "objects",
  },
  {
    id: 2009,
    title: "Plaid API Integration",
    subtitle: "Bank account connection service",
    action: "Integrate",
    category: "objects",
  },
  {
    id: 2010,
    title: "Stripe Payment Gateway",
    subtitle: "Online payment processing",
    action: "Get Started",
    category: "objects",
  },
  {
    id: 2011,
    title: "Canva Pro Design Tool",
    subtitle: "Graphic design platform",
    action: "Upgrade",
    category: "objects",
  },
  {
    id: 2012,
    title: "Adobe Creative Cloud",
    subtitle: "Creative software suite",
    action: "Subscribe",
    category: "objects",
  },
  {
    id: 2013,
    title: "Figma Design Tool",
    subtitle: "Collaborative interface design",
    action: "Try Free",
    category: "objects",
  },
  {
    id: 2014,
    title: "Notion Workspace",
    subtitle: "All-in-one productivity tool",
    action: "Sign Up",
    category: "objects",
  },
  {
    id: 2015,
    title: "Grammarly Premium",
    subtitle: "Writing assistant and grammar checker",
    action: "Upgrade",
    category: "objects",
  },
];

// Offerings (services, courses, subscriptions, memberships)
const offerings: SearchResult[] = [
  {
    id: 3001,
    title: "High-Yield Savings Account",
    subtitle: "APY up to 5.25% - No minimum balance",
    action: "Open Account",
    category: "offerings",
    entityId: 1005,
  },
  {
    id: 3002,
    title: "Cryptocurrency Trading Course",
    subtitle: "Beginner to advanced - 40+ hours",
    action: "Enroll Now",
    category: "offerings",
    entityId: 1002,
  },
  {
    id: 3003,
    title: "Online MBA Program",
    subtitle: "Accredited & flexible schedule",
    action: "Request Info",
    category: "offerings",
    entityId: 1006,
  },
  {
    id: 3004,
    title: "Financial Planning Consultation",
    subtitle: "Free 30-minute session",
    action: "Book Now",
    category: "offerings",
    entityId: 1013,
  },
  {
    id: 3005,
    title: "Stock Market Analysis Course",
    subtitle: "Learn technical analysis",
    action: "Start Course",
    category: "offerings",
    entityId: 1006,
  },
  {
    id: 3006,
    title: "Credit Score Monitoring Service",
    subtitle: "Track your credit daily",
    action: "Sign Up",
    category: "offerings",
    entityId: 1001,
  },
  {
    id: 3007,
    title: "Investment Portfolio Review",
    subtitle: "Professional assessment",
    action: "Schedule",
    category: "offerings",
    entityId: 1008,
  },
  {
    id: 3008,
    title: "Tax Filing Service",
    subtitle: "Expert help for freelancers",
    action: "File Now",
    category: "offerings",
  },
  {
    id: 3009,
    title: "Forex Trading Signals",
    subtitle: "Daily market analysis & alerts",
    action: "Subscribe",
    category: "offerings",
  },
  {
    id: 3010,
    title: "Options Trading Masterclass",
    subtitle: "Risk management strategies",
    action: "Enroll",
    category: "offerings",
    entityId: 1002,
  },
  {
    id: 3011,
    title: "E-commerce Business Setup",
    subtitle: "Complete store creation service",
    action: "Get Started",
    category: "offerings",
    entityId: 1009,
  },
  {
    id: 3012,
    title: "Creator Toolkit Subscription",
    subtitle: "Templates, fonts, and assets",
    action: "Subscribe",
    category: "offerings",
  },
  {
    id: 3013,
    title: "Retirement Planning Service",
    subtitle: "401k and IRA guidance",
    action: "Learn More",
    category: "offerings",
    entityId: 1015,
  },
  {
    id: 3014,
    title: "Business Credit Card Application",
    subtitle: "0% APR for 18 months",
    action: "Apply",
    category: "offerings",
    entityId: 1001,
  },
  {
    id: 3015,
    title: "Real Estate Investment Course",
    subtitle: "REITs and crowdfunding guide",
    action: "Enroll Now",
    category: "offerings",
    entityId: 1006,
  },
];

// Opportunities (jobs, gigs, investments, side hustles)
const opportunities: SearchResult[] = [
  {
    id: 4001,
    title: "Remote Data Analyst Position",
    subtitle: "Starting at $65k - Full-time",
    action: "Apply Now",
    category: "opportunities",
  },
  {
    id: 4002,
    title: "Freelance Writing Gig",
    subtitle: "$50-$200 per article",
    action: "Browse Jobs",
    category: "opportunities",
    entityId: 1003,
  },
  {
    id: 4003,
    title: "Investment Banking Internship",
    subtitle: "Summer 2026 - Paid position",
    action: "Apply",
    category: "opportunities",
  },
  {
    id: 4004,
    title: "Side Hustle: Label Images",
    subtitle: "$120 for 500 images",
    action: "Get Started",
    category: "opportunities",
    entityId: 1007,
  },
  {
    id: 4005,
    title: "Remote Design Job",
    subtitle: "$75k - UI/UX Designer",
    action: "Apply Now",
    category: "opportunities",
    entityId: 1003,
  },
  {
    id: 4006,
    title: "Peer-to-Peer Lending Investment",
    subtitle: "Returns up to 12% APY",
    action: "Invest Now",
    category: "opportunities",
  },
  {
    id: 4007,
    title: "Real Estate Crowdfunding",
    subtitle: "Minimum $500 investment",
    action: "Explore",
    category: "opportunities",
  },
  {
    id: 4008,
    title: "Dividend Stock Portfolio",
    subtitle: "Monthly income focus",
    action: "View Picks",
    category: "opportunities",
    entityId: 1008,
  },
  {
    id: 4009,
    title: "Index Fund Investment",
    subtitle: "S&P 500 tracking fund",
    action: "Invest",
    category: "opportunities",
    entityId: 1008,
  },
  {
    id: 4010,
    title: "Crypto Staking Rewards",
    subtitle: "8% APY on staked assets",
    action: "Stake Now",
    category: "opportunities",
    entityId: 1010,
  },
  {
    id: 4011,
    title: "AI-Powered Trading Bot",
    subtitle: "15% ROI potential",
    action: "Get Started",
    category: "opportunities",
  },
  {
    id: 4012,
    title: "DeFi Yield Farming",
    subtitle: "High-yield liquidity provision",
    action: "Farm Now",
    category: "opportunities",
  },
  {
    id: 4013,
    title: "Passive Income Streams Guide",
    subtitle: "Make $500+/month",
    action: "Discover",
    category: "opportunities",
  },
  {
    id: 4014,
    title: "NFT Marketplace Launch",
    subtitle: "Early access opportunity",
    action: "Join Waitlist",
    category: "opportunities",
  },
  {
    id: 4015,
    title: "Metaverse Real Estate",
    subtitle: "Virtual land investment",
    action: "Explore",
    category: "opportunities",
  },
];

// Helper function to convert Entity to SearchResult
function entityToSearchResult(entity: Entity): SearchResult {
  return {
    id: entity.id,
    title: entity.name,
    subtitle: entity.subtitle,
    action: entity.action,
    category: "entities",
  };
}

// Query-to-results mapping
// Maps search queries to relevant results across all categories
export const searchResultsMap: Record<string, SearchResult[]> = {
  // High-Yield Savings related
  "high-yield savings": [
    ...offerings.filter(
      (o) =>
        o.title.toLowerCase().includes("savings") ||
        o.title.toLowerCase().includes("apy")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("ally") ||
          e.name.toLowerCase().includes("chase")
      )
      .map(entityToSearchResult),
  ],
  "savings account": [
    ...offerings.filter((o) => o.title.toLowerCase().includes("savings")),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("ally") ||
          e.name.toLowerCase().includes("chase")
      )
      .map(entityToSearchResult),
  ],
  "4.8% apy": [
    ...offerings.filter(
      (o) =>
        o.subtitle.toLowerCase().includes("apy") ||
        o.subtitle.toLowerCase().includes("5.25")
    ),
    ...opportunities.filter(
      (o) =>
        o.subtitle.toLowerCase().includes("apy") ||
        o.subtitle.toLowerCase().includes("8%")
    ),
  ],

  // Chase Sapphire related
  "chase sapphire": [
    ...objects.filter(
      (o) =>
        o.title.toLowerCase().includes("sapphire") ||
        o.title.toLowerCase().includes("chase")
    ),
    ...entities
      .filter((e) => e.name.toLowerCase().includes("chase"))
      .map(entityToSearchResult),
    ...offerings.filter((o) => o.entityId === 1001),
  ],
  "$200 cashback": [
    ...objects.filter(
      (o) =>
        o.title.toLowerCase().includes("sapphire") ||
        o.title.toLowerCase().includes("cashback")
    ),
    ...entities
      .filter((e) => e.name.toLowerCase().includes("chase"))
      .map(entityToSearchResult),
  ],

  // Trading/Investing related
  trading: [
    ...objects.filter(
      (o) =>
        o.title.toLowerCase().includes("trading") ||
        o.title.toLowerCase().includes("chart")
    ),
    ...offerings.filter((o) => o.title.toLowerCase().includes("trading")),
    ...opportunities.filter((o) => o.title.toLowerCase().includes("trading")),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("robinhood") ||
          e.name.toLowerCase().includes("coinbase")
      )
      .map(entityToSearchResult),
  ],
  "stock market": [
    ...objects.filter(
      (o) =>
        o.title.toLowerCase().includes("stock") ||
        o.title.toLowerCase().includes("bloomberg")
    ),
    ...offerings.filter(
      (o) =>
        o.title.toLowerCase().includes("stock") ||
        o.title.toLowerCase().includes("analysis")
    ),
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("stock") ||
        o.title.toLowerCase().includes("index")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("vanguard") ||
          e.name.toLowerCase().includes("robinhood")
      )
      .map(entityToSearchResult),
  ],
  crypto: [
    ...objects.filter((o) => o.title.toLowerCase().includes("crypto")),
    ...offerings.filter((o) => o.title.toLowerCase().includes("crypto")),
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("crypto") ||
        o.title.toLowerCase().includes("staking")
    ),
    ...entities
      .filter((e) => e.name.toLowerCase().includes("coinbase"))
      .map(entityToSearchResult),
  ],
  "ai-powered trading": [
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("trading bot") ||
        o.title.toLowerCase().includes("ai")
    ),
    ...objects.filter((o) => o.title.toLowerCase().includes("trading")),
  ],

  // Learning/Education related
  course: [
    ...offerings.filter(
      (o) =>
        o.title.toLowerCase().includes("course") ||
        o.title.toLowerCase().includes("program") ||
        o.title.toLowerCase().includes("class")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("coursera") ||
          e.name.toLowerCase().includes("udemy") ||
          e.name.toLowerCase().includes("khan")
      )
      .map(entityToSearchResult),
  ],
  mba: [
    ...offerings.filter((o) => o.title.toLowerCase().includes("mba")),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("coursera") ||
          e.name.toLowerCase().includes("udemy")
      )
      .map(entityToSearchResult),
  ],
  learning: [
    ...offerings.filter(
      (o) =>
        o.title.toLowerCase().includes("course") ||
        o.title.toLowerCase().includes("learn")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("coursera") ||
          e.name.toLowerCase().includes("udemy") ||
          e.name.toLowerCase().includes("khan")
      )
      .map(entityToSearchResult),
  ],

  // Freelance/Jobs related
  freelance: [
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("freelance") ||
        o.title.toLowerCase().includes("gig")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("upwork") ||
          e.name.toLowerCase().includes("fiverr")
      )
      .map(entityToSearchResult),
  ],
  "remote job": [
    ...opportunities.filter((o) => o.title.toLowerCase().includes("remote")),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("upwork") ||
          e.name.toLowerCase().includes("fiverr")
      )
      .map(entityToSearchResult),
  ],
  "data analyst": [
    ...opportunities.filter((o) =>
      o.title.toLowerCase().includes("data analyst")
    ),
  ],
  $75k: [
    ...opportunities.filter((o) => o.subtitle.toLowerCase().includes("75k")),
  ],
  $65k: [
    ...opportunities.filter((o) => o.subtitle.toLowerCase().includes("65k")),
  ],

  // Investment related
  investment: [
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("investment") ||
        o.title.toLowerCase().includes("invest")
    ),
    ...offerings.filter(
      (o) =>
        o.title.toLowerCase().includes("investment") ||
        o.title.toLowerCase().includes("portfolio")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("vanguard") ||
          e.name.toLowerCase().includes("betterment") ||
          e.name.toLowerCase().includes("wealthfront")
      )
      .map(entityToSearchResult),
  ],
  portfolio: [
    ...opportunities.filter((o) => o.title.toLowerCase().includes("portfolio")),
    ...offerings.filter((o) => o.title.toLowerCase().includes("portfolio")),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("vanguard") ||
          e.name.toLowerCase().includes("betterment")
      )
      .map(entityToSearchResult),
  ],
  reit: [
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("real estate") ||
        o.title.toLowerCase().includes("reit")
    ),
    ...offerings.filter((o) => o.title.toLowerCase().includes("real estate")),
  ],
  dividend: [
    ...opportunities.filter((o) => o.title.toLowerCase().includes("dividend")),
  ],

  // Credit/Banking related
  "credit card": [
    ...objects.filter((o) => o.title.toLowerCase().includes("card")),
    ...offerings.filter((o) => o.title.toLowerCase().includes("card")),
    ...entities
      .filter((e) => e.name.toLowerCase().includes("chase"))
      .map(entityToSearchResult),
  ],
  "credit score": [
    ...offerings.filter((o) => o.title.toLowerCase().includes("credit")),
    ...entities
      .filter((e) => e.name.toLowerCase().includes("chase"))
      .map(entityToSearchResult),
  ],
  banking: [
    ...offerings.filter(
      (o) =>
        o.title.toLowerCase().includes("banking") ||
        o.title.toLowerCase().includes("account")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("chase") ||
          e.name.toLowerCase().includes("ally")
      )
      .map(entityToSearchResult),
  ],

  // Business/E-commerce related
  business: [
    ...objects.filter(
      (o) =>
        o.title.toLowerCase().includes("business") ||
        o.title.toLowerCase().includes("quickbooks")
    ),
    ...offerings.filter((o) => o.title.toLowerCase().includes("business")),
    ...entities
      .filter((e) => e.name.toLowerCase().includes("shopify"))
      .map(entityToSearchResult),
  ],
  "e-commerce": [
    ...offerings.filter(
      (o) =>
        o.title.toLowerCase().includes("e-commerce") ||
        o.title.toLowerCase().includes("store")
    ),
    ...entities
      .filter(
        (e) =>
          e.name.toLowerCase().includes("shopify") ||
          e.name.toLowerCase().includes("etsy")
      )
      .map(entityToSearchResult),
  ],
  shopify: [
    ...offerings.filter((o) => o.entityId === 1009),
    ...entities.filter((e) => e.id === 1009).map(entityToSearchResult),
  ],

  // Tax related
  tax: [
    ...objects.filter((o) => o.title.toLowerCase().includes("tax")),
    ...offerings.filter((o) => o.title.toLowerCase().includes("tax")),
  ],
  "tax filing": [
    ...offerings.filter((o) => o.title.toLowerCase().includes("tax")),
  ],

  // Side hustle/Passive income
  "side hustle": [
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("side hustle") ||
        o.title.toLowerCase().includes("passive")
    ),
  ],
  "passive income": [
    ...opportunities.filter((o) => o.title.toLowerCase().includes("passive")),
  ],
  $500: [
    ...opportunities.filter((o) => o.subtitle.toLowerCase().includes("500")),
  ],

  // Options/Forex
  options: [
    ...offerings.filter((o) => o.title.toLowerCase().includes("options")),
    ...objects.filter((o) => o.title.toLowerCase().includes("options")),
  ],
  forex: [
    ...offerings.filter((o) => o.title.toLowerCase().includes("forex")),
    ...opportunities.filter((o) => o.title.toLowerCase().includes("forex")),
  ],

  // Web3/DeFi
  defi: [
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("defi") ||
        o.title.toLowerCase().includes("yield")
    ),
  ],
  nft: [...opportunities.filter((o) => o.title.toLowerCase().includes("nft"))],
  web3: [
    ...opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes("web3") ||
        o.title.toLowerCase().includes("metaverse")
    ),
  ],
  blockchain: [
    ...offerings.filter((o) => o.title.toLowerCase().includes("blockchain")),
    ...opportunities.filter((o) =>
      o.title.toLowerCase().includes("blockchain")
    ),
  ],
};

// Helper function to get search results for a query
export function getSearchResults(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();

  // Direct match
  if (searchResultsMap[normalizedQuery]) {
    return searchResultsMap[normalizedQuery];
  }

  // Partial match - check if query contains any key
  const matchedResults: SearchResult[] = [];
  const seenIds = new Set<number>();

  for (const [key, results] of Object.entries(searchResultsMap)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      for (const result of results) {
        if (!seenIds.has(result.id)) {
          matchedResults.push(result);
          seenIds.add(result.id);
        }
      }
    }
  }

  // If we found matches, return them
  if (matchedResults.length > 0) {
    return matchedResults;
  }

  // Fallback: search across all data
  const allResults: SearchResult[] = [
    ...objects,
    ...offerings,
    ...opportunities,
  ];
  return allResults.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subtitle.toLowerCase().includes(normalizedQuery)
  );
}

// Export all entities for use in search results
export function getAllEntities(): Entity[] {
  return entities;
}

// Export all results by category
export function getResultsByCategory(
  category: SearchResultCategory
): SearchResult[] {
  switch (category) {
    case "objects":
      return objects;
    case "offerings":
      return offerings;
    case "opportunities":
      return opportunities;
    case "entities":
      return entities.map((e) => ({
        id: e.id,
        title: e.name,
        subtitle: e.subtitle,
        action: e.action,
        category: "entities" as const,
      }));
    case "related":
      // Return a mix of related items
      return [
        ...objects.slice(0, 5),
        ...offerings.slice(0, 5),
        ...opportunities.slice(0, 5),
      ];
    default:
      return [];
  }
}
