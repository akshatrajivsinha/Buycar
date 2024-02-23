import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./purchase.css";

const Purchase = () => {
  const { id } = useParams();
  console.log(id);

  const [data, setdata] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`/car/${id}`, {
        headers: { authorization: currentUser.token },
      });
      setdata(res.data);
    };
    fetchdata();
  }, []);
  console.log(data);
  const handlebuy = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/purchase", {
        headers: { authorization: currentUser.token },
        Buyer_id: currentUser.id,
        Buyer_name: currentUser.username,
        dealer_name:data.dealer_name,
        dealer_id: data.dealer_id,
        car_id: data.car_id,
        name: data.name,
        model: data.model,
        type: data.type,
        car_info: data.car_info,
      });
      navigate("/buyer");
      console.log(res.data);
    } catch (err) {}
  };

  return (
    <div className="purchase">
      <div className="left">
        <img
          className="img"
          src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="right">
        <div className="details">
          <div className="rightleft">
            <div className="detail">
              {" "}
              <label>Name:</label>
              <span>{data.name}</span>
            </div>
            <div className="detail">
              {" "}
              <label>Model:</label>
              <span>{data.model}</span>
            </div>
            <div className="detail">
              {" "}
              <label>Type:</label>
              <span>{data.type}</span>
            </div>

            {currentUser.isUser &&<button className="button" onClick={handlebuy}>
              BUY
            </button>}
          </div>
          <div className="rightleft">
            <div className="detail">
              {" "}
              <label>carId:</label>
              <span>{data.car_id}</span>
            </div>
            <div className="detail">
              {" "}
              <label>DealerId:</label>
              <span>{data.dealer_id}</span>
            </div>
            <div className="detail">
              {" "}
              <label>Time:</label>
              <span>{new Date(data.createdDate).toDateString()}</span>
            </div>
          </div>
        </div>
        <div className="info">{data.car_info}</div>
      </div>
    </div>
  );
};

export default Purchase;
