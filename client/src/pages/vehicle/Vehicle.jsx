import React, { useEffect, useState } from "react";
import "./vehicle.css";
import axios from "axios";
import Post from "../../components/transaction/transaction";

const Vehicle = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [buyer, Setbuyer] = useState("");
  const [data, Setdata] = useState([]);
  const [edit, Setedit] = useState(false);
  const [useremail, Setuseremail] = useState("");
  const [location, Setlocation] = useState("");
  const [info, Setinfo] = useState("");

  useEffect(() => {
    const buyer = async () => {
      const res = await axios.get("/buyer/"+currentUser.username, {
        headers: { authorization: currentUser.token },
      });
      console.log(res.data);
      Setbuyer(res.data);
    };
    buyer();

    const purchase = async () => {
      const res = await axios.get(
        `/purchase/brecord?Buyer_id=${currentUser.id}`,
        { headers: { authorization: currentUser.token } }
      );
      console.log(res.data);
      Setdata(res.data);
    };
    purchase();
  }, []);

  const handlechange = async (e) => {
    try {
      const change = await axios.put("/buyer/" + currentUser.username, {
        Buyer_email: useremail,
        Buyer_location: location,
        Buyer_info: info,
      });
      Setedit(false);
      console.log(change.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="vehicle">
      <div className="container">
        <div className="topcontainer">
          <div className="left">
            <h1 className="h1">{buyer.Buyer_name}</h1>
            <div className="info">
              <span>user_id : </span>
              <span>{buyer.Buyer_id}</span>
            </div>
            <div className="info">
              <span>user_email : </span>
              {!edit ? (
                <span>{buyer.Buyer_email}</span>
              ) : (
                <input
                  className="input"
                  value={buyer.Buyer_email}
                  type="text"
                  placeholder="Enter you username"
                  onChange={(e) => Setuseremail(e.target.value)}
                />
              )}
            </div>
            <div className="info">
              <span>user_location : </span>
              {!edit ? (
                <span>{buyer.Buyer_location}</span>
              ) : (
                <input
                  className="input"
                  value={buyer.Buyer_location}
                  type="text"
                  placeholder="Enter you username"
                  onChange={(e) => Setlocation(e.target.value)}
                />
              )}
            </div>
            {edit ? (
              <button className="button" onClick={handlechange}>DONE</button>
            ) : (
              <button className="button" onClick={() => Setedit(true)}>EDIT</button>
            )}
          </div>
          <div className="right">
            <h1 className="h1">Buyer_info</h1>
            {edit ? (
              <textarea
                value={buyer.Buyer_info}
                className="desc"
                onChange={(e) => Setinfo(e.target.value)}
              ></textarea>
            ) : (
              <p className="desc">{buyer.Buyer_info}</p>
            )}
          </div>
        </div>

        <div className="posts">
          {data.map((post, id) => (
            <Post post={post} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
