import { BASE_URL } from "@/constants";

export const serverFetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
