import { useState, useEffect } from "react";
import { useParams } from "react-router";

const fetchMenuData = async (resId) => {
  const swiggyUrl = `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`;

  // Use proxy and add headers
  const response = await fetch(swiggyUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  // Return the parsed JSON from the response stream
  return json;
};

export const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState(null);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resId } = useParams();

  useEffect(() => {
    const getMenu = async () => {
      setLoading(true);
      try {
        const json = await fetchMenuData(resId);
        
        console.log("datat of menu", json);
        

        const cards = json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        const info = json?.data?.cards[2]?.card?.card?.info;

        const filteredCards = cards?.filter(
          (c) => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

        let allItems = [];
        filteredCards?.forEach((c) => allItems.push(...(c?.card?.card?.itemCards || [])));

        setRestaurantInfo(info);
        setMenuItems(allItems);
      } catch (err) {
        console.error(`Failed to fetch menu for restaurant ${resId}:`, err);
        setMenuItems({ error: err.message });
      } finally {
        setLoading(false);
      }
    };

    if (resId) {
      getMenu();
    }
  }, [resId]);

  if (menuItems?.error) {
    return (
      <div className="restaurant-menu">
        <div className="error-message">
          <h2>⚠️ Unable to load menu</h2>
          <p>{menuItems.error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="menu-loading">Loading menu...</div>;
  }

  const { name, cuisines, areaName, costForTwoMessage, avgRating } = restaurantInfo || {};

  return (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <h1>{name || `Restaurant ${resId}`}</h1>
        {cuisines && <p className="cuisines">Cuisines: {cuisines.join(", ")}</p>}
        {areaName && <p className="location">Location: {areaName}</p>}
        <p className="rating-cost">
          {avgRating && <span>⭐ {avgRating}</span>}
          {avgRating && costForTwoMessage && <span> • </span>}
          {costForTwoMessage && <span>{costForTwoMessage}</span>}
        </p>
      </div>

      <h2>Menu</h2>
      <div className="menu-items-container">
        {menuItems && menuItems.length > 0 ? (
          <ul className="menu-items-list" style={{ listStyle: "none", padding: 0 }}>
            {menuItems.map((item) => {
              const itemInfo = item?.card?.info;
              if (!itemInfo) return null;
              return (
                <li
                  key={itemInfo.id}
                  className="menu-item"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div className="item-details">
                    <h3>{itemInfo.name}</h3>
                    <p>₹{(itemInfo.price || itemInfo.defaultPrice || 0) / 100}</p>
                    {itemInfo.description && (
                      <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
                        {itemInfo.description}
                      </p>
                    )}
                  </div>
                  {itemInfo.imageId && (
                    <div className="item-image" style={{ marginLeft: "20px" }}>
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${itemInfo.imageId}`}
                        alt={itemInfo.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No menu items found or unsupported menu format.</p>
        )}
      </div>
    </div>
  );
};