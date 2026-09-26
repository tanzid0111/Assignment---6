import React from "react";
import PlanCard from "../PlanCard";
import { IPlan } from "@/types/plans.type"; 

export const dynamic = 'force-dynamic';

const getPlans = async () => {
  try {

    const response = await fetch("https://workers.dev");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
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
          <h1 className="text-3xl font-bold text-white tracking-wide">
            THE LIBRARY
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plansData.map((plan: IPlan, ind: number) => {
            return <PlanCard key={ind} plan={plan} />;
          })}
        </div>

      </div>
    </section>
  );
};

export default Plans;
