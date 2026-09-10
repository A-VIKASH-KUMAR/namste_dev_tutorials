import { SWIGGY_IMAGE_BASE_URL } from "../utils/constants";

export const ItemCard = ({ item, onAction, actionLabel, quantity }) => {
  const itemInfo = item?.card?.info || item;
  const price = (itemInfo.price || itemInfo.defaultPrice || 0) / 100;
  return (
    <li className="flex justify-between items-start py-6 hover:bg-gray-50 transition-colors rounded-lg border-b border-gray-200 last:border-b-0">
      <div className="flex-1 pr-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {itemInfo.name}
        </h3>
        <p className="text-gray-700 font-medium mt-1">
          ₹{price}
          {quantity > 1 && <span className="text-gray-500"> x {quantity}</span>}
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
        {onAction && actionLabel && (
          <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 border font-bold border-gray-300 shadow-md px-6 py-1.5 rounded-lg hover:bg-gray-50 w-max" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </li>
  );
};
