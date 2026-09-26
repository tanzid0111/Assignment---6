import React from "react";
import PlanCard from "../PlanCard";
import { IPlan } from "@/types/plans.type"; 

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
      console.error("API Fetch Error: Received invalid content type or status code");
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("API Fetch Error in Plans:", error);
    return [];
  }
};

const Plans = async () => {
  const plansData = await getPlans();

  return (
    <section className="bg-[#0d0e11] min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

     
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wide uppercase">
            THE LIBRARY
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {plansData && plansData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plansData.map((plan: IPlan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-gray-800 rounded-xl bg-[#13141a]">
            <p className="text-gray-400 text-base font-medium">
              No workout plans available at the moment.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Please check back later or verify your API configuration.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Plans;