import {LOGO_URL} from "../utils/constants";
import {Link} from "react-router";
export const Header = () => {
    return (
      <div className="flex justify-between bg-green-300 shadow-lg">
        <div className="logo-container">
        <img
          className="w-20"
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
            <li className="px-4">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="px-4">
              <Link to="/grocery">Grocery</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };