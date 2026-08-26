import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { SWIGGY_IMAGE_BASE_URL } from "../utils/constants";

import { useRestaurantMenu } from "../utils/useRestaurantMenu";
import { RestaurantCategory } from "./RestaurantCategory";

export const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState(null);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();

  const { restaurantMenu: json, loading: hookLoading, error: hookError } = useRestaurantMenu(resId);

  useEffect(() => {
    if (json) {
      setLoading(true);
      try {
        const cards = json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        const info = json?.data?.cards[2]?.card?.card?.info;

        const filteredCards = cards?.filter(
          (c) => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

        setRestaurantInfo(info);
        setMenuItems(filteredCards);
        setLoading(false);
      } catch (err) {
        console.error(`Failed to process menu for restaurant ${resId}:`, err);
        setMenuItems({ error: err.message });
        setLoading(false);
      }
    } else if (hookError) {
      setMenuItems({ error: hookError });
      setLoading(false);
    }
  }, [json, hookError, resId]);

  if (menuItems?.error) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex justify-center mt-10">
        <div className="bg-red-50 text-red-600 border border-red-200 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">⚠️ Unable to load menu</h2>
          <p>{menuItems.error}</p>
        </div>
      </div>
    );
  }

  if (loading || hookLoading) {
    return <div className="text-center p-10 text-xl text-gray-500">Loading menu...</div>;
  }

  const { name, cuisines, areaName, costForTwoMessage, avgRating } = restaurantInfo || {};

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white border text-center border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{name || `Restaurant ${resId}`}</h1>
        {cuisines && <p className="text-gray-600 font-medium mb-1">{cuisines.join(", ")}</p>}
        {areaName && <p className="text-gray-500 mb-3">{areaName}</p>}
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          {avgRating && <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md">⭐ {avgRating}</span>}
          {avgRating && costForTwoMessage && <span className="text-gray-300">•</span>}
          {costForTwoMessage && <span className="text-gray-700">{costForTwoMessage}</span>}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">Menu</h2>
      <div className="bg-white rounded-xl shadow-sm p-2 md:p-4">
        {menuItems && menuItems.length > 0 ? (
          <div>
            {menuItems.map((category, index) => (
              <RestaurantCategory
                key={category?.card?.card?.title}
                data={category?.card?.card}
                showItems={index === showIndex}
                setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No menu items found or unsupported menu format.
          </p>
        )}
      </div>
    </div>
  );
};
