import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react'; 
import { IPlan } from "@/types/plans.type";

interface IPlanCardProps {
  plan: IPlan;
}

const PlanCard = ({ plan }: IPlanCardProps) => {
  return (
    <Link href={`/plans/${plan?.id || ''}`} className="block group">
      <div className="bg-[#15161b] rounded-xl overflow-hidden border border-[#25262c] group-hover:border-gray-600 transition duration-300 h-full flex flex-col justify-between">
        
        <div>
     
          <div className="h-[165px] relative overflow-hidden bg-[#181922]">
            <Image
              src={plan?.image || "https://img.freepik.com/free-photo/man-working-out-gym_1303-21300.jpg"}
              alt={plan?.name || "Workout Plan"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          
          <div className="p-4">
           
            <div className="flex flex-wrap gap-2 mb-3">
              {plan?.muscleGroups && plan.muscleGroups.length > 0 ? (
                plan.muscleGroups.map((muscle: string, index: number) => (
                  <span
                    key={`${muscle}-${index}`}
                    className="bg-[#b7ff00] text-black text-[9px] font-bold px-2 py-[3px] rounded-full uppercase"
                  >
                    {muscle}
                  </span>
                ))
              ) : (
                <span className="bg-gray-700 text-white text-[9px] font-bold px-2 py-[3px] rounded-full uppercase">
                  General
                </span>
              )}
            </div>

         
            <h2 className="text-white text-sm font-bold uppercase tracking-wide line-clamp-1">
              {plan?.name || "Untitled Plan"}
            </h2>
            <p className="text-gray-500 text-[10px] mt-1">
              {plan?.equipment || "No equipment needed"}
            </p>
          </div>
        </div>

   
        <div className="p-4 pt-0">
          <div className="border-t border-[#25262c] pt-3">
            <div className="flex items-center gap-4 text-gray-400 text-[11px]">
              
             
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {plan?.duration ?? 0} min
              </span>

             
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-gray-400 fill-gray-400" />
                {plan?.caloriesBurned ?? 0} kcal
              </span>

              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-gray-400" />
                {plan?.rating ?? "N/A"}
              </span>

            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default PlanCard;