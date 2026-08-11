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
import "../index.css";
import {Header} from "./components/Header";
import {Body} from "./components/Body";
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


const AppLayout = () => {
  return (
    <div id="app">
      <Header />
      <Body restaurantsArray={restaurantsArray}/>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);

// class based component
// functional components
