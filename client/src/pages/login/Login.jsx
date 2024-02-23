import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [deal, Setdeal] = useState(true);
  const navigate = useNavigate();
  const [username, setuser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, Seterror] = useState("");
  const [isUser, setisUser] = useState(false);
  const [isDealer, setisDealer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        username,
        email,
        password,
        isUser,
        isDealer,
      });
      const currentUser = localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data)
      );
      if (res.data.isUser) {
        navigate("/buyer");
      } else {
        navigate("/dealer");
      }
      console.log(res.data);
    } catch (err) {
      Seterror(err);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1 className="h1">Login</h1>
        {deal && (
          <form action="" className="form" onSubmit={handleSubmit}>
            <button className="button" onClick={() => Setdeal(false)}>Login as Dealer</button>
            {() => setisDealer(false)}
            {() => setisUser(true)}
            <label className="label">Buyer_Name</label>
            <input
              className="input"
              type="text"
              placeholder="Enter you username"
              onChange={(e) => setuser(e.target.value)}
            />
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
            <button className="button">Login Me</button>
          </form>
        )}

        {!deal && (
          <form action="" className="form" onSubmit={handleSubmit}>
            <button className="button" onClick={() => Setdeal(true)}>Login as Buyer</button>
            <label className="label">Dealer_Name</label>
            <input
              className="input"
              type="text"
              placeholder="Enter you username"
              onChange={(e) => setuser(e.target.value)}
            />
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
            <button className="button">Login Me</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
