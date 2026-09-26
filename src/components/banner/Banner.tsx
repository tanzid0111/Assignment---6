import React from 'react';
import Image from "next/image";
import bannerImg from '@/assets/banner.png'

const Banner = () => {
    return (
        
<section className="bg-black text-white">
 
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#222630]">

    <div>
      <p className="text-sm text-lime-400 font-bold tracking-widest">WORKOUT LIBRARY</p>
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2 whitespace-nowrap">
        TRAIN WITH INTENT. LOG <br/> EVERY SET.
      </h1>
      <p className="mt-6 text-gray-300 text-lg">
        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
      </p>
      <button className="mt-8 bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition">
        BROWSE WORKOUTS
      </button>
    </div>

   
    <div className="flex justify-center">
      <Image src={bannerImg} alt="Banner" className="w-full h-auto max-w-md" />
    </div>
  </div>

</section>
    );
};

export default Banner;
