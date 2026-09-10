import {LOGO_URL} from "../utils/constants";
import {UserContext} from "../utils/UserContext";
import {Link} from "react-router";
import { useState, useContext } from "react";
import { useSelector } from "react-redux";
export const Header = () => {
  const [btnNameLogin, setBtnNameLogin] = useState("Login");
  const {LoggedInData} = useContext(UserContext);
  // selecting cart items from the redux store using useSelector hook
  const cartItems = useSelector((state) => state.cart.items);
    return (
      <div className="flex justify-between bg-green-300 shadow-lg">
        <div className="logo-container">
        <img
          className="w-20 p-2"
          src={LOGO_URL}
          alt="logo"
        />
        </div>

        <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className="px-4">
              <Link to="/">Home</Link>
            </li>
            <li className="px-4">
              <Link to="/about">About</Link>
            </li>
            <li className="px-4">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-4 font-bold">
              <Link to="/cart">Cart({cartItems.length})</Link>
            </li>
            <li className="px-4">
              <Link to="/grocery">Grocery</Link>
            </li>
            <button className="login" onClick={() => {
              if (btnNameLogin === "Login") {
                setBtnNameLogin("Logout");
              } else {
                setBtnNameLogin("Login");
              }}}>
              {btnNameLogin === "Logout" && LoggedInData ? LoggedInData : btnNameLogin} 
            </button>
          </ul>
        </div>
      </div>
    );
  };
