'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png'; 

const Navbar = () => {
  const [counts, setCounts] = useState({ plan: 0, saved: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCounts = () => {
      try {
        const today = JSON.parse(localStorage.getItem('todayPlans') || '[]');
        const saved = JSON.parse(localStorage.getItem('savedPlans') || '[]');
        setCounts({ plan: today.length, saved: saved.length });
      } catch (error) {
        console.error("Error reading localStorage", error);
      }
    };

    fetchCounts();

    window.addEventListener('storage', fetchCounts);
    window.addEventListener('planUpdated', fetchCounts);

    return () => {
      window.removeEventListener('storage', fetchCounts);
      window.removeEventListener('planUpdated', fetchCounts);
    };
  }, [pathname]);

  return (
    <nav className="bg-[#0d0e12] border-b border-gray-900 shadow-sm relative z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        
        <div className="flex items-center gap-3">
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-1 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Image src={logo} alt="logo" width={28} height={28} className="object-contain" />
            <span className="text-lg sm:text-xl font-bold text-white tracking-wide">FITLOG</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          <Link href="/" className={`transition ${pathname === '/' ? 'text-[#c2ff1a]' : 'text-gray-400 hover:text-white'}`}>
            Workouts
          </Link>
          <Link href="/plans" className={`transition ${pathname === '/plans' ? 'text-[#c2ff1a]' : 'text-gray-400 hover:text-white'}`}>
            My Plan
          </Link>
        </div>

        
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold">
          <Link href="/plans?tab=today" className="flex items-center gap-1.5 bg-[#181922] px-2.5 sm:px-3 py-1.5 rounded-full border border-gray-800 hover:bg-[#23242f] transition">
            <span className="text-gray-400 text-[11px] sm:text-xs">Plan</span>
            <span className="bg-[#c2ff1a] text-black w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
              {counts.plan}
            </span>
          </Link>
          
          <Link href="/plans?tab=saved" className="flex items-center gap-1.5 bg-[#181922] px-2.5 sm:px-3 py-1.5 rounded-full border border-gray-800 hover:bg-[#23242f] transition">
            <span className="text-gray-400 text-[11px] sm:text-xs">Saved</span>
            <span className="bg-gray-700 text-white w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
              {counts.saved}
            </span>
          </Link>
        </div>
      </div>

     
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#13141a] border-b border-gray-800 px-6 py-4 flex flex-col gap-4 text-sm font-semibold transition-all">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`transition py-1 ${pathname === '/' ? 'text-[#c2ff1a]' : 'text-gray-300 hover:text-white'}`}
          >
            Workouts
          </Link>
          <Link 
            href="/plans" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`transition py-1 ${pathname === '/plans' ? 'text-[#c2ff1a]' : 'text-gray-300 hover:text-white'}`}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;