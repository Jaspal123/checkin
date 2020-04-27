import React from "react";
import "../styles.css";
import Base from "./Base";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <Base title="Home Page">
      <div className="text-center vc">
        <Link className="btn btn-success btn-lg p-2" to='/signin'>Login For Checkin</Link>
      </div>
    </Base>
  );
}
