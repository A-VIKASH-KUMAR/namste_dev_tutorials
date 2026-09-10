import { useState, useEffect } from "react";
import { swiggyfetchMenuUrl } from "./constants";

export const useRestaurantMenu = (resId) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${swiggyfetchMenuUrl}${resId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch menu: ${response.status} ${response.statusText}`,
          );
        }
        const json = await response.json();
        setRestaurantMenu(json);
      } catch (err) {
        console.error(`Failed to fetch menu for restaurant ${resId}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (resId) {
      fetchData();
    }
  }, [resId]);

  return { restaurantMenu, loading, error };
};
