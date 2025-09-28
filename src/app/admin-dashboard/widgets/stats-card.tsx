import React from 'react';

type StatCard = {
  label: string;
  value: number | string;
};

type StatsCardsProps = {
  stats: StatCard[];
};

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid  md:grid-cols-3 gap-4  ">
      <div className="flex flex-wrap gap-x-5 gap-y-4 md:grid md:grid-cols-3 md:col-span-3 space-x-4 md:space-x-0 md:gap-4 overflow-x-auto md:overflow-visible py-2 md:py-0 no-scrollbar">
        {stats.map((card, i) => (
          <div
            key={i}
            className="w-full md:min-w-0 bg-transparent shadow-sm rounded-lg p-4 text-center border border-gray-200 flex-shrink-0"
          >
            <p className="text-sm text-[#706C6C] font-semibold">{card.label}</p>
            <h2 className="text-2xl font-semibold text-[#171616] py-2">{card.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
