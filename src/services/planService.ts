import { IPlan } from "@/types/plans.type";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const fetchPlans = async (): Promise<IPlan[]> => {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type");

    // রেসপন্স সঠিক না হলে বা JSON না পাঠালে খালি অ্যারে বা ফলব্যাক দেবে
    if (!response.ok || !contentType || !contentType.includes("application/json")) {
      console.error(`API Error: Received invalid response from ${API_URL}`);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch plans service:", error);
    return [];
  }
};