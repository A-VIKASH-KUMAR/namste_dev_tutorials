import { useState } from "react";
import { SWIGGY_IMAGE_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/appSlices";
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
            {data.itemCards.map((item) => {
              const itemInfo = item.card.info;
              return (
                <li
                  key={itemInfo.id}
                  className="flex justify-between items-start py-6 hover:bg-gray-50 transition-colors rounded-lg border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {itemInfo.name}
                    </h3>
                    <p className="text-gray-700 font-medium mt-1">
                      ₹{(itemInfo.price || itemInfo.defaultPrice || 0) / 100}
                    </p>
                    {itemInfo.description && (
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                        {itemInfo.description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 ml-4 relative">
                    {itemInfo.imageId && (
                      <img
                        src={`${SWIGGY_IMAGE_BASE_URL}${itemInfo.imageId}`}
                        alt={itemInfo.name}
                        className="w-32 h-32 object-cover rounded-xl shadow-sm"
                      />
                    )}
                    <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 border font-bold border-gray-300 shadow-md px-6 py-1.5 rounded-lg hover:bg-gray-50 w-max" onClick={() => dispatch(addItem(item))}>
                      ADD
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
