import { ItemCard } from "./ItemCard";

export const ItemLists = ({ items, onAction, actionLabel, groupByCategory = false }) => {
  if (!items || items.length === 0) {
    return <p className="text-gray-500 text-center py-10">No items to display.</p>;
  }

  if (groupByCategory) {
    let flatIndex = 0;
    return (
      <div>
        {items.map((category, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {category?.card?.card?.title} ({category?.card?.card?.itemCards?.length || 0})
            </h3>
            <ul className="divide-y divide-gray-200">
              {category?.card?.card?.itemCards?.map((item) => {
                const currentIndex = flatIndex++;
                return (
                  <ItemCard
                    key={item.card.info.id}
                    item={item}
                    onAction={() => onAction?.(currentIndex)}
                    actionLabel={actionLabel}
                  />
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <ItemCard
          key={item?.card?.info?.id || index}
          item={item}
          onAction={() => onAction?.(index)}
          actionLabel={actionLabel}
        />
      ))}
    </ul>
  );
};
