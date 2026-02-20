import { useQuery } from "@tanstack/react-query";

// Example hook - replace with your actual API calls
export function useExample() {
  return useQuery({
    queryKey: ["example"],
    queryFn: async () => {
      // Replace with your actual API call
      const response = await fetch("/api/example");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    },
  });
}
