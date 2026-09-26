import React from 'react';
import Image from 'next/image';
import Button from '@/components/planDetails/Button';
import { IPlan } from "@/types/plans.type";

interface IPlanDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';

const getPlans = async (): Promise<IPlan[]> => {
  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok || !contentType || !contentType.includes("application/json")) {
      console.error("API Fetch Error in Details Page: Received invalid response");
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("API Fetch Error in Details Page:", error);
    return [];
  }
};

const PlanDetailsPage = async ({ params }: IPlanDetailsPageProps) => {
  const { id } = await params;
  const plansData = await getPlans();

  const plan = plansData.find(
    (p: IPlan) => String(p.id) === String(id)
  );

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center text-white p-4">
        <div className="bg-[#13141a] p-8 rounded-xl border border-gray-800 text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Workout Plan Not Found</h2>
          <p className="text-gray-400 text-sm">Requested plan could not be loaded or does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-[#13141a] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="flex flex-col md:flex-row">
          
       
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-[#181922]">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#15161b]">
              <Image
                src={plan.image || "https://img.freepik.com/free-photo/man-working-out-gym_1303-21300.jpg"}
                alt={plan.name || "Workout"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white mb-2">
                {plan.name}
              </h1>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {plan.description || "No description provided."}
              </p>

            
              <div className="flex flex-wrap gap-2 mb-6">
                {plan.muscleGroups?.map((muscle: string, index: number) => (
                  <span
                    key={`${muscle}-${index}`}
                    className="bg-[#c2ff1a] text-black font-semibold text-xs px-3 py-1 rounded-full uppercase"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
              
            
              <div className="space-y-3 text-sm border-t border-b border-gray-800 py-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Equipment</span>
                  <span className="text-gray-200 font-semibold">{plan.equipment || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Difficulty</span>
                  <span className="text-gray-200 font-semibold">{plan.difficulty || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Sets</span>
                  <span className="text-gray-200 font-semibold">{plan.sets ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Reps</span>
                  <span className="text-gray-200 font-semibold">{plan.reps ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Duration</span>
                  <span className="text-gray-200 font-semibold">{plan.duration ?? 0} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Calories</span>
                  <span className="text-gray-200 font-semibold">{plan.caloriesBurned ?? 0} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Rating</span>
                  <span className="text-gray-200 font-semibold">{plan.rating ?? "N/A"}</span>
                </div>
              </div>

           
              {plan.instructions && plan.instructions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Instructions
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                    {plan.instructions.map((step: string, index: number) => (
                      <li key={index} className="leading-relaxed">
                        <span className="text-gray-400">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            
            <Button plan={plan} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPage;