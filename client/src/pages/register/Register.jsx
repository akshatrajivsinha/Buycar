import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setuser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, Seterror] = useState("");
  const [isUser, setisUser] = useState(false);
  const [isDealer, setisDealer] = useState(false);
  const [dealership, setdealership] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        isUser,
        isDealer,
      });
      try {
        {
          isUser &&
            (await axios.post("/buyer/" + username, {
              Buyer_name: username,
              Buyer_email: email,
              Buyer_id: res.data._id,
            }));
        }
        {
          isDealer &&
            (await axios.post("/dealer/" + username, {
              dealer_name: username,
              dealer_email: email,
              dealer_id: res.data._id,
            }));
        }
        navigate("/login");
      } catch (err) {Seterror(err);
        console.log("error");}
    } catch (err) {
      Seterror(err);
      console.log("error");
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1 className="h1">Register</h1>
        {!dealership && (
          <form action="" className="form" onSubmit={handleRegistration}>
            <button className="button" onClick={() => setdealership(true)}>
              Register as Dealer
            </button>
            <label className="label">Buyer_Name</label>
            <input
              className="input"
              type="text"
              placeholder="Enter username without space"
              onChange={(e) => setuser(e.target.value)}
            />
            {error && <span className="warning">{error}</span>}
            <label className="label">Buyer_Email</label>
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
            />
            <label className="label">Buyer_Password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="button" onClick={() => setisUser(true)}>
              Register Me
            </button>
          </form>
        )}
        {dealership && (
          <form action="" className="form" onSubmit={handleRegistration}>
            <button className="button" onClick={() => setdealership(false)}>
              Register as Buyer
            </button>

            <label className="label">Dealer_Name</label>
            <input
              className="input"
              type="text"
              placeholder="Enter you username"
              onChange={(e) => setuser(e.target.value)}
            />
            {error && <span className="warning">{error}</span>}
            <label className="label">Dealer_Email</label>
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
            />
            <label className="label">Dealer_Password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="button" onClick={() => setisDealer(true)}>
              Register Me
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
