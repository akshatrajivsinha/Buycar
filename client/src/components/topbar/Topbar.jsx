import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import axios from "axios";

function Topbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [active, setActive] = useState(false);
  const Navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      Navigate("/login");
    } catch (err) {
      console.log("error in logout");
    }
  };

  return (
    <div className={active ? "topbar scroll" : "topbar"}>
      <div className="container">
        <div className="left">
        {!currentUser && <Link className="righth3 Link" to={"/dealer"}>
                  <h1 className="lefth1">BuyCar</h1>
                  </Link>}
            {currentUser &&    <> 
            {currentUser.isUser && (
                  <Link className="righth3 Link" to={"/buyer"}>
                  <h1 className="lefth1">BuyCar</h1>
                  </Link>
              )}
              {currentUser.isDealer && (
                  <Link className="righth3 Link" to={"/dealer"}>
                  <h1 className="lefth1">BuyCar</h1>
                  </Link>
              )}</>}

        </div>
        <div className="right">
          {!currentUser && (
            <>
              <Link className="righth3 Link" to={"/login"}>
                Login
              </Link>
              <Link className="righth3 Link" to={"/register"}>
                Register
              </Link>
            </>
          )}

          {currentUser && (
            <>
              {currentUser.isUser && (
                <>
                  <Link className="righth3 Link" to={"/vehicle"}>
                    My_Vehicle
                  </Link>
                </>
              )}
              {currentUser && currentUser.isDealer && (
                <>
                  <Link className="righth3 Link" to={"/deals"}>
                    My_Deals
                  </Link>
                  <Link className="righth3 Link" to={"/add"}>
                    Add_Car
                  </Link>
                </>
              )}
              <Link className="righth3 Link" onClick={handleLogout}>
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
