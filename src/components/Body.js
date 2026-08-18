import { Link } from "react-router";
import { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { SWIGGY_IMAGE_BASE_URL } from "../utils/constants";
const fetchData = async () => {
  const data = await fetch(
    "https://namastedev.com/api/v1/listRestaurants",
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
        const restaurants = extractRestaurants(json?.data?.data.cards);
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
            <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id} style={{textDecoration: "none", color: "inherit"}}>
              <RestaurantCard
                resName={restaurant.info.name}
                cuisine={restaurant.info.cuisines?.join(", ")}
                rating={restaurant.info.avgRating}
                imageUrl={
                  SWIGGY_IMAGE_BASE_URL + restaurant.info.cloudinaryImageId
                }
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
