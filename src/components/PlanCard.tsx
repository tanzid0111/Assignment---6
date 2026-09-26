import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IPlanCardProps {
  plan: IPlan;
}

const PlanCard = ({ plan }: IPlanCardProps) => {
  return (
    <Link href={`/plans/${plan.id}`}>
      <div
        key={plan.id}
        className="bg-[#15161b] rounded-xl overflow-hidden border border-[#25262c] hover:border-gray-600 transition duration-300 cursor-pointer"
      >
        <div className="h-[165px] overflow-hidden">
          <Image
            src={plan.image}
            alt={plan.name}
            width={80}
            height={600}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {plan.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="bg-[#b7ff00] text-black text-[9px] font-bold px-2 py-[3px] rounded-full uppercase"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h2 className="text-white text-sm font-bold uppercase tracking-wide">
            {plan.name}
          </h2>

          <p className="text-gray-500 text-[10px] mt-1">{plan.equipment}</p>

          <div className="border-t border-[#25262c] mt-4 pt-3">
            <div className="flex items-center gap-4 text-gray-400 text-[10px]">
              <span className="flex items-center gap-1">◷ {plan.duration} min</span>
              <span className="flex items-center gap-1">● {plan.caloriesBurned} kcal</span>
              <span className="flex items-center gap-1">☆ {plan.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlanCard;
