import React from "react";
import { Link, withRouter } from "react-router-dom";

const Menu = () => (
  <div>
    <ul className="nav nav-tabs ml-auto">
      <li className="nav-item">
        <Link className="nav-link text-white" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/dashboard">
          Dashboard
        </Link>
      </li>
    </ul>
  </div>
);
export default withRouter(Menu);
