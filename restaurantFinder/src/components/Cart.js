import { useDispatch, useSelector } from "react-redux";
import { clearItems, removeItem } from "../utils/appSlices";
import { ItemLists } from "./ItemLists";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (index) => {
    dispatch(removeItem(index));
  };

  const handleClear = () => {
    dispatch(clearItems());
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Cart</h1>
        {cartItems.length > 0 && (
          <button onClick={handleClear} className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-medium hover:bg-red-100">
            Clear Cart
          </button>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-2 md:p-4">
        <ItemLists
          items={cartItems}
          groupByCategory={false}
          onAction={handleRemove}
          actionLabel="REMOVE"
        />
      </div>
      {cartItems.length === 0 && (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      )}
    </div>
  );
};
