import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "material-icons";
import { Sound } from "./Sound";
import { AuthContext } from "../contexts/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useNavigate();
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history("/");
  };

  return (
    <nav>
      <div
        className="nav-wrapper deep-orange darken-3"
        style={{ paddingLeft: "1rem" }}
      >
        <a href="/home" className="brand-logo">
          Radianite
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="waves-effect">
            <NavLink to="/battle">Battle</NavLink>
          </li>
          <li className="waves-effect">
            <NavLink to="/rules">Rules</NavLink>
          </li>
          <li className="waves-effect">
            <NavLink to="/profile">
              <i className="material-icons">person_pin</i>
            </NavLink>
          </li>
          <li>
            <Sound/>
          </li>
          <li className="waves-effect">
            <a href="/" onClick={logoutHandler}>
              <i className="material-icons">exit_to_app</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
