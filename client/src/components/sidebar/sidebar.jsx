import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const [data, setdata] = useState([]);
  const [deal, setdeal] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/dealer", {
        headers: { authorization: currentUser.token },
      });
      setdata(res.data);
    };
    fetchdata();

    const purchase = async () => {
      const res = await axios.get(
        `/purchase/drecord?dealer_id=${currentUser.id}`,
        { headers: { authorization: currentUser.token } }
      );
      console.log(res.data);
      setdeal(res.data);
    };
    purchase();
  }, []);

  return (
    <div className="sidebar">
      <div className="container1">
        {currentUser.isUser && (
          <>
            <h1 className="h1">Dealers</h1>
            {data.map((content, id) => (
              <Link className="Link">
                <div className="recentpost" key={id}>
                  <img
                    className="img"
                    alt=""
                    src="https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  />
                  <h3 className="postheading">{content.dealer_name}</h3>
                  <h6 className="time">{content.dealer_location}</h6>
                </div>
              </Link>
            ))}
          </>
        )}

        {currentUser.isDealer && (
          <>
            <h1 className="h1">Deals</h1>
            {deal.map((content, id) => (
              <Link className="Link">
                <div className="recentpost" key={id}>
                  <img
                    className="img"
                    alt=""
                    src="https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  />
                  <h3 className="postheading">{content.name}</h3>
                  <h6 className="time">{content.Buyer_name}</h6>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
