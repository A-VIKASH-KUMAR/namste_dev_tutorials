import { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { SWIGGY_IMAGE_BASE_URL } from "../utils/constants";
const fetchData = async () => {
  const data = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
  );
  if (!data.ok) {
    throw new Error(
      `Failed to fetch restaurants: ${data.status} ${data.statusText}`,
    );
  }
  const json = await data.json();
  return json;
};
// Swiggy changes its response structure often, so instead of relying on a
// hardcoded card index (e.g. cards[1]), search for the first card that
// actually contains the restaurant list.
const extractRestaurants = (cards) => {
  const restaurantCard = cards?.find(
    (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants,
  );
  return (
    restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? []
  );
};
export const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const json = await fetchData();
        const restaurants = extractRestaurants(json?.data?.cards);
        setListOfRestaurants(restaurants);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
        setError(
          err.message ||
            "Something went wrong while loading restaurants. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getRestaurants();
  }, []);

  if (isLoading) {
    return <div className="body">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="body">⚠️ {error}</div>;
  }

  return (
    <div className="body">
      <div className="search">
        <input type="text" placeholder="Search for restaurants" />
        <button>Search</button>
      </div>

      <div className="restaurant-container">
        {listOfRestaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          listOfRestaurants.map((restaurant) => (
            <RestaurantCard
              resName={restaurant.info.name}
              key={restaurant.info.id}
              cuisine={restaurant.info.cuisines?.join(", ")}
              rating={restaurant.info.avgRating}
              imageUrl={
                SWIGGY_IMAGE_BASE_URL + restaurant.info.cloudinaryImageId
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
