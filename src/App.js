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

import React, {lazy,useContext, useEffect} from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Error } from "./components/Error";
// import { About } from "./components/About";
import { Contact } from "./components/Contact";
// import { Grocery } from "./components/Grocery";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { RestaurantMenu } from "./components/RestaurantMenu";
import { UserContext } from "./utils/UserContext";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";
const About  = lazy(() => import("./components/About").then(module => ({ default: module.About })));
const Grocery = lazy(() => import("./components/Grocery").then(module => ({ default: module.Grocery })));
const AppLayout = () => {
  const [userName, setUserName] = React.useState("");
  useEffect(() => {
    // make an api call and send login data
    const data = {
      LoggedInData: "vikash kumar",
    };
    setUserName(data.LoggedInData);
  }, []);
  
  return (
    <Provider store={store}>
    <UserContext.Provider value={{LoggedInData: userName}}>
      <div id="app">
        <input className="border border-black" />

      <Header />
      <Outlet />
    </div>
    </UserContext.Provider>
    </Provider>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <Error message="about page" />,
      },
      {
        path: "/grocery",
        element: <Grocery />,
        errorElement: <Error message="grocery page" />,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <Error message="contact page" />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu/>,
        errorElement: <Error message="restaurant page" />,
      }
    ],
    errorElement: <Error message="main page" />,
  },
  ,
]);
// class based component
// functional components
root.render(<RouterProvider router={appRoutes} />);
