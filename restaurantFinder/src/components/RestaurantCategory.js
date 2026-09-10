import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/appSlices";
import { ItemCard } from "./ItemCard";

export const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div>
      <div className="w-full mx-auto my-4 bg-white shadow-lg p-4 rounded-lg">
        <div
          className="flex justify-between cursor-pointer mb-2"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>{showItems ? "🔼" : "🔽"}</span>
        </div>

        {showItems && (
          <ul className="divide-y divide-gray-200 mt-2">
            {data.itemCards.map((item) => (
              <ItemCard
                key={item.card.info.id}
                item={item}
                onAction={() => dispatch(addItem(item))}
                actionLabel="ADD"
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
