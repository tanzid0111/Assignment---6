import { IPlan } from "@/types/plans.type";

const API_URL = "https://api.api-store.workers.dev/api/fitlog"; 

export const fetchPlans = async (): Promise<IPlan[]> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 0 },
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch plans service:", error);
    return [];
  }
};