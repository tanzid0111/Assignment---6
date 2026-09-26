"use client"
import React from 'react';
import toast from 'react-hot-toast';
import { IPlan } from "@/types/plans.type";

interface ButtonProps {
  plan: IPlan;
}

const Button = ({ plan }: ButtonProps) => {

    const toastStyle = {
        style: {
            background: '#1c1d26', 
            color: '#fff', 
            borderRadius: '8px', 
            fontSize: '14px',
            border: '1px solid #2a2b36'
        },
        iconTheme: {
            primary: '#22c55e', 
            secondary: '#fff',
        },
    };

    const handleAddToToday = () => {
        const existingPlans = JSON.parse(localStorage.getItem('todayPlans') || '[]');
        const isAlreadyAdded = existingPlans.some((item: IPlan) => item.id === plan.id);
        
        if (!isAlreadyAdded) {
            const updatedPlans = [...existingPlans, plan];
            localStorage.setItem('todayPlans', JSON.stringify(updatedPlans));
            
            
            window.dispatchEvent(new Event('planUpdated'));
            
         
            toast.success("Added to today's plan", toastStyle);
        } else {
            toast.error("Already saved in today's plan", {
                style: toastStyle.style
            });
        }
    };

    const handleSaveForLater = () => {
        const existingSaved = JSON.parse(localStorage.getItem('savedPlans') || '[]');
        const isAlreadyAdded = existingSaved.some((item: IPlan) => item.id === plan.id);
        
        if (!isAlreadyAdded) {
            const updatedSaved = [...existingSaved, plan];
            localStorage.setItem('savedPlans', JSON.stringify(updatedSaved));
            
            window.dispatchEvent(new Event('planUpdated'));
            
            
            toast.success("Saved for later", toastStyle);
        } else {
            toast.error("Already in your saved list", {
                style: toastStyle.style
            });
        }
    };

    return (
        <div>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={handleAddToToday}
                className="flex-1 bg-[#c2ff1a] hover:bg-[#b0e617] text-black font-bold py-3 px-4 rounded-xl transition duration-200 text-sm"
              >
                 Add to today's plan
              </button>
              <button 
                onClick={handleSaveForLater}
                className="flex-1 bg-transparent hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl border border-gray-700 transition duration-200 text-sm"
              >
                 Save for later
              </button>
            </div>
        </div>
    );
};

export default Button;