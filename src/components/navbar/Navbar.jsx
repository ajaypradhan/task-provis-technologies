import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container space-between">
          <Link to={"/"} className="navbar-brand">
            <i className="fa-solid fa-address-book"></i> Contacts Management
          </Link>
          <form className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Search Contact.."
              />
            </div>
            <div className="col">
              <input type="submit" className="btn btn-outline-primary" value="Search" />
            </div>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
