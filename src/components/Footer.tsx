import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="border-t border-gray-900 bg-[#0d0e12] px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
      
      <div className="flex items-center gap-2 font-black tracking-wider text-white">
        <Image 
          src={logo} 
          alt="FitLog Logo" 
          width={20} 
          height={20} 
          className="object-contain" 
        />
        <span>FITLOG</span>
      </div>

      
      <div className="text-center sm:text-right text-gray-500">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </div>

    </footer>
  );
};

export default Footer;