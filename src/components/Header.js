import {LOGO_URL} from "../utils/constants";
import {Link} from "react-router";
export const Header = () => {
    return (
      <div className="header">
        <img
          className="logo"
          src={LOGO_URL}
          alt="logo"
        />
  
        <div className="nav-items">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };