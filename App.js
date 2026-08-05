/**
 * header
 * - logo,
 * - nav items
 * body
 * - search
 * - restaurant container
 *    - restaurant card
 *
 * footer
 * - copyright
 * - links
 * -Address
 * - contact
 *
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// const parent = React.createElement("div", { id: "parent" }, [
//   React.createElement(
//     "div",
//     { id: "child" },
//     React.createElement("h1", {}, "I am a h1 tag")
//   ),
//   React.createElement(
//     "div",
//     { id: "child2" },
//     React.createElement("h2", {}, "I am a h2 tag")
//   ),
// ]);
// const heading = React.createElement("h1", { id: "heading" }, "Hello, React!");
// const jsxheading = <h1 id="jsx-heading">Hello, JSX!</h1>;
// const Title = () => <h1 id="title">Hello, Functional title Component!</h1>;
// // Component composition passing one component into another
// const HeadingComponent = () => {
//   return (
//     <div id="container">
//       <Title />
//       <h1>This is a functional component</h1>
//     </div>
//   );
// };

const Header = () => {
  return (
    <div className="header">
      <img
        className="logo"
        src="https://static.vecteezy.com/system/resources/previews/021/953/308/non_2x/food-ordering-app-logo-with-points-and-fork-shapes-in-the-center-free-vector.jpg"
        alt="logo"
      />

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};
const restaurantsArray = {
  success: true,
  message: "Restaurant List fetched successfully",
  data: {
    data: {
      cards: [
        {},
        {
          card: {
            card: {
              gridElements: {
                infoWithStyle: {
                  restaurants: [
                    {
                      info: {
                        id: "123456",
                        name: "Pizza Paradise",
                        cloudinaryImageId:
                          "rng/md/carousel/production/pizza123",
                        locality: "MG Road",
                        areaName: "Central District",
                        costForTwo: "₹400 for two",
                        cuisines: ["Pizza", "Italian", "Fast Food"],
                        avgRating: 4.3,
                        avgRatingString: "4.3",
                        totalRatingsString: "10K+ ratings",
                        veg: false,
                        sla: {
                          deliveryTime: 30,
                          lastMileTravel: 3.5,
                          slaString: "30 mins",
                        },
                        aggregatedDiscountInfoV3: {
                          header: "50% OFF",
                          subHeader: "UPTO ₹100",
                        },
                      },
                    },
                    // ... more restaurants
                  ],
                },
              },
            },
          },
        },
      ],
    },
  },
};
const RestaurantCard = ({ resName, cuisine, rating }) => {
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
        src="https://static.vecteezy.com/system/resources/previews/068/286/629/large_2x/delicious-chicken-biryani-recipe-2023-photo.jpg"
        alt="restaurant-logo"
      />
      <h2>{resName}</h2>
      <h3>{cuisine}</h3>
      <h4>{rating}</h4>
    </div>
  );
};
const Body = () => {
  return (
    <div className="body">
      <div className="search">
        <input type="text" placeholder="Search for restaurants" />
        <button>Search</button>
      </div>

      <div className="restaurant-container">
        {restaurantsArray.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map((restaurant) => <RestaurantCard resName={restaurant.info.name} key={restaurant.info.id}/>)}
      </div>
    </div>
  );
};
const AppLayout = () => {
  return (
    <div id="app">
      <Header />
      <Body />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);

// class based component
// functional components
