export const RestaurantCard = ({ resName, cuisine, rating, imageUrl }) => {
  return (
    <div
      className="background-gray-100 p-4 hover:bg-gray-200 rounded-lg w-64 m-4 shadow-md"
    >
      <img
        className="restaurant-logo"
        src={imageUrl}
        alt="restaurant-logo"
      />
      <h2 className="font-bold p-1">{resName}</h2>
      <h3 className="text-gray-600 p-1">{cuisine}</h3>
      <h4 className="text-gray-600 p-1">{rating}</h4>
    </div>
  );
};