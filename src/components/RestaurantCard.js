export const RestaurantCard = ({ resName, cuisine, rating, imageUrl }) => {
  return (
    <div
      className="restaurant-card"
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
        margin: "10px",
      }}
    >
      <img
        className="restaurant-logo"
        src={imageUrl}
        alt="restaurant-logo"
      />
      <h2>{resName}</h2>
      <h3>{cuisine}</h3>
      <h4>{rating}</h4>
    </div>
  );
};