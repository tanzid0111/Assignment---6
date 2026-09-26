'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface IPlan {
  id: number;
  name: string;
  image: string;
  duration: number;
  caloriesBurned: number;
  equipment?: string;
  rating?: number;
}

const PlanContent = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'today' | 'saved'>(tabParam === 'saved' ? 'saved' : 'today');
  const [todayPlans, setTodayPlans] = useState<IPlan[]>([]);
  const [savedPlans, setSavedPlans] = useState<IPlan[]>([]);
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  useEffect(() => {
    if (tabParam === 'saved') {
      setActiveTab('saved');
    } else if (tabParam === 'today') {
      setActiveTab('today');
    }
  }, [tabParam]);

  useEffect(() => {
    const today = JSON.parse(localStorage.getItem('todayPlans') || '[]');
    const saved = JSON.parse(localStorage.getItem('savedPlans') || '[]');
    setTodayPlans(today);
    setSavedPlans(saved);
  }, []);

  const handleDelete = (id: number) => {
    if (activeTab === 'today') {
      const updatedToday = todayPlans.filter(plan => plan.id !== id);
      setTodayPlans(updatedToday);
      localStorage.setItem('todayPlans', JSON.stringify(updatedToday));
    } else {
      const updatedSaved = savedPlans.filter(plan => plan.id !== id);
      setSavedPlans(updatedSaved);
      localStorage.setItem('savedPlans', JSON.stringify(updatedSaved));
    }
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('planUpdated'));
  };

  const displayPlans = activeTab === 'today' ? todayPlans : savedPlans;

  const sortedPlans = [...displayPlans].sort((a, b) => {
    if (sortBy === 'duration') {
      return a.duration - b.duration;
    } else if (sortBy === 'calories') {
      return b.caloriesBurned - a.caloriesBurned;
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  const totalExercises = displayPlans.length;
  const totalMinutes = displayPlans.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = displayPlans.reduce((sum, item) => sum + item.caloriesBurned, 0);

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white flex flex-col font-sans">
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider mb-1">My Plan</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        
        <div className="grid grid-cols-3 bg-[#13141a] rounded-xl border border-gray-800/60 p-4 sm:p-6 mb-8 divide-x divide-gray-800">
          <div className="flex flex-col justify-center px-2 sm:px-4">
            <span className="text-[10px] sm:text-xs uppercase text-gray-500 font-bold mb-1 sm:mb-2">Exercises</span>
            <span className="text-2xl sm:text-4xl font-extrabold text-[#c2ff1a]">{totalExercises}</span>
          </div>
          <div className="flex flex-col justify-center px-4 sm:px-8">
            <span className="text-[10px] sm:text-xs uppercase text-gray-500 font-bold mb-1 sm:mb-2">Minutes</span>
            <span className="text-2xl sm:text-4xl font-extrabold text-white">{totalMinutes}</span>
          </div>
          <div className="flex flex-col justify-center px-4 sm:px-8">
            <span className="text-[10px] sm:text-xs uppercase text-gray-500 font-bold mb-1 sm:mb-2">Calories</span>
            <span className="text-2xl sm:text-4xl font-extrabold text-white">{totalCalories}</span>
          </div>
        </div>

        
        <div className="flex flex-wrap items-center justify-between border-b border-gray-900 pb-4 mb-8 gap-4">
          <div className="bg-[#13141a] p-1 rounded-xl flex border border-gray-800/40">
            <button 
              onClick={() => setActiveTab('today')}
              className={`px-4 sm:px-5 py-2 text-xs font-bold rounded-lg transition ${activeTab === 'today' ? 'bg-[#1c1d26] text-white' : 'text-gray-400'}`}
            >
              Today's Plan
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`px-4 sm:px-5 py-2 text-xs font-bold rounded-lg transition ${activeTab === 'saved' ? 'bg-[#1c1d26] text-white' : 'text-gray-400'}`}
            >
              Saved
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-gray-500 ml-1">Sort By</label>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#13141a] text-white text-xs sm:text-sm border border-gray-800 rounded-lg pl-3 pr-8 py-2 outline-none focus:border-gray-600 cursor-pointer transition min-w-[130px]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {sortedPlans.length > 0 ? (
          <div className="flex flex-col gap-4">
            {sortedPlans.map((plan) => (
              <div key={plan.id} className="bg-[#13141a] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row justify-between md:items-center gap-4">
                
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      width={96}
                      height={74}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-white uppercase text-sm md:text-base">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{plan.equipment || 'Bodyweight'}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-medium">
                      
                 
                      <span className="flex items-center gap-1 text-gray-300">
                        <svg className="w-3.5 h-3.5 text-[#c2ff1a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {plan.duration} min
                      </span>

                     
                      <span className="flex items-center gap-1 text-[#c2ff1a]">
                        <svg className="w-3.5 h-3.5 fill-[#c2ff1a]" viewBox="0 0 24 24">
                          <path d="M12 23c-4.97 0-9-3.58-9-8 0-4.19 3.58-7.58 6.55-11.23.36-.44 1.04-.4 1.34.09.91 1.48 2.15 3.01 3.2 4.41.34.45 1.01.44 1.33-.03 1.18-1.72 2.37-3.6 2.82-5.74.08-.38.53-.55.84-.33C21.1 4.02 21 8.84 21 15c0 4.42-4.03 8-9 8zm0-13.5c-1.33 1.83-2.67 3.67-4 5.5 0 2.48 1.79 4.5 4 4.5s4-2.02 4-4.5c-1.33-1.83-2.67-3.67-4-5.5z"/>
                        </svg>
                        {plan.caloriesBurned} kcal
                      </span>

                     
                      <span className="flex items-center gap-1 text-gray-300">
                        <svg className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {plan.rating || '4.5'}
                      </span>

                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 justify-between sm:justify-end">
                  <Link 
                    href={`/plans/${plan.id}`} 
                    className="px-3 sm:px-4 py-2 border border-gray-700 rounded-full text-xs font-semibold text-white hover:bg-gray-800 transition"
                  >
                    View Details
                  </Link>
                  <button className="bg-[#c2ff1a] hover:bg-[#b0e617] text-black px-3 sm:px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 transition">
                    <svg className="w-3.5 h-3.5 stroke-black stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Mark as Done
                  </button>
                  <button 
                    onClick={() => handleDelete(plan.id)}
                    className="text-gray-500 hover:text-white transition p-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-gray-900 rounded-2xl bg-[#0f1015]">
            <h2 className="text-lg font-bold uppercase tracking-widest text-white mb-2">Nothing Here Yet</h2>
            <p className="text-gray-500 text-sm max-w-sm mb-6">Browse the library and add a lift to get today moving.</p>
            <Link href="/">
              <button className="bg-[#c2ff1a] hover:bg-[#b0e617] text-black font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full">
                Go to workouts
              </button>
            </Link>
          </div>
        )}

      </main>
    </div>
  );
};

const MyPlanPage = () => {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 mt-10">Loading your plans...</div>}>
      <PlanContent />
    </Suspense>
  );
};

export default MyPlanPage;