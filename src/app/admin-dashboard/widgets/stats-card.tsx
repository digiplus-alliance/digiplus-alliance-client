import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type StatCard = {
  label: string;
  value: number | string;
};

type StatsCardsProps = {
  stats: StatCard[];
  isLoading?: boolean;
  error?: unknown;
};

// Simple shimmer skeleton for a stat card using shared Skeleton component
const StatSkeleton = () => (
  <div className="w-full md:min-w-0 bg-transparent shadow-sm rounded-lg p-4 text-center border border-gray-200 flex-shrink-0">
    <Skeleton className="h-4 w-3/4 mx-auto mb-3" />
    <Skeleton className="h-8 w-1/2 mx-auto" />
  </div>
);

const StatsCards: React.FC<StatsCardsProps> = ({ stats, isLoading, error }) => {
  // If error, show an error box
  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-3xl">
          <h3 className="text-red-800 font-semibold mb-1">
            Failed to load stats
          </h3>
          <p className="text-sm text-red-600">
            {typeof error === "string"
              ? error
              : error instanceof Error
              ? error.message
              : typeof error === "object"
              ? (() => {
                  try {
                    return JSON.stringify(error);
                  } catch {
                    return String(error);
                  }
                })()
              : String(error)}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid  md:grid-cols-3 gap-4  ">
      <div className="flex flex-wrap gap-x-5 gap-y-4 md:grid md:grid-cols-3 md:col-span-3 space-x-4 md:space-x-0 md:gap-4 overflow-x-auto md:overflow-visible py-2 md:py-0 no-scrollbar">
        {isLoading
          ? // stream 3 skeletons to mimic loading
            Array.from({ length: 3 }).map((_, i) => <StatSkeleton key={i} />)
          : stats.map((card, i) => (
              <div
                key={i}
                className="w-full md:min-w-0 bg-transparent shadow-sm rounded-lg p-4 text-center border border-gray-200 flex-shrink-0"
              >
                <p className="text-sm text-[#706C6C] font-semibold">
                  {card.label}
                </p>
                <h2 className="text-2xl font-semibold text-[#171616] py-2">
                  {card.value}
                </h2>
              </div>
            ))}
      </div>
    </div>
  );
};

export default StatsCards;
