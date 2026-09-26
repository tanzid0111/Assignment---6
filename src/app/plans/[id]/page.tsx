import React from 'react';
import Image from 'next/image';
import Button from '@/components/planDetails/Button';
import IPlan from "@/types/plans.type"




interface IPlanDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getPlans = async () => {
  const response = await fetch("http://localhost:3000/plansData.json");
  const data = await response.json();
  return data;
};

const PlanDetailsPage = async ({ params }: IPlanDetailsPageProps) => {
  const { id } = await params;
  const plansData = await getPlans();

  const plan = plansData.find(
    (plan: IPlan) => String(plan.id) === String(id)
  ) as IPlan;

  if (!plan) {
    return <div className="text-white text-center py-10">Workout plan not found!</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-[#13141a] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="flex flex-col md:flex-row">
          
          
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-[#181922]">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
              <Image
                src={plan.image}
                alt={plan.name}
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
                {plan.description}
              </p>

         
              <div className="flex flex-wrap gap-2 mb-6">
                {plan.muscleGroups.map((muscle, index) => (
                  <span
                    key={index}
                    className="bg-[#c2ff1a] text-black font-semibold text-xs px-3 py-1 rounded-full uppercase"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              
              <div className="space-y-3 text-sm border-t border-b border-gray-800 py-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Equipment</span>
                  <span className="text-gray-200 font-semibold">{plan.equipment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Difficulty</span>
                  <span className="text-gray-200 font-semibold">{plan.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Sets</span>
                  <span className="text-gray-200 font-semibold">{plan.sets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Reps</span>
                  <span className="text-gray-200 font-semibold">{plan.reps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Duration</span>
                  <span className="text-gray-200 font-semibold">{plan.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Calories</span>
                  <span className="text-gray-200 font-semibold">{plan.caloriesBurned} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-medium">Rating</span>
                  <span className="text-gray-200 font-semibold"> {plan.rating}</span>
                </div>
              </div>

       
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                  {plan.instructions.map((step, index) => (
                    <li key={index} className="leading-relaxed">
                      <span className="text-gray-400">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

         
        <Button plan={plan} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPage;
