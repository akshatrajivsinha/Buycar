import React, { useEffect, useState } from "react";
import Post from "../post/post";
import "./posts.css";
import axios from "axios";

export default function Posts() {
  const [data, setdata] = useState([]);
  const [dealdata, Setdealdata] = useState([]);
  const [name, setname] = useState("");
  const [model, setmodel] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/car", {
        headers: { authorization: currentUser.token },
      });
      setdata(res.data);
    };
    fetchdata();

    const dealerdata = async () => {
      const res = await axios.get(`/car/drecord?dealer_id=${currentUser.id}`, {
        headers: { authorization: currentUser.token },
      });
      Setdealdata(res.data);
    };
    dealerdata();
  }, []);
  const dofilter = async () => {
    if (!name) {
      try {
        const change = await axios.get(`/car/filtermodel?model=${model}`, {
          headers: { authorization: currentUser.token },
        });
        setdata(change.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (!model) {
      try {
        const change = await axios.get(`/car/filtername?name=${name}`, {
          headers: { authorization: currentUser.token },
        });
        setdata(change.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (name && model) {
      try {
        const change = await axios.get(
          `/car/filterboth?name=${name}&model=${model}`,
          { headers: { authorization: currentUser.token } }
        );
        setdata(change.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {currentUser.isUser && (
        <div className="main">
          <div className="filter">
            <div>
              <span>Name: </span>
              <input
                type="text"
                className="input"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div>
              <span>Model: </span>
              <input
                type="text"
                className="input"
                onChange={(e) => setmodel(e.target.value)}
              />
            </div>
            <div>
              <button className="button" onClick={dofilter}>
                Filter
              </button>
            </div>
          </div>

          <div className="posts">
            {data.map((p, id) => (
              <Post post={p} />
            ))}
          </div>
        </div>
      )}

      {currentUser.isDealer && (
        <div className="posts">
          {dealdata.map((p, id) => (
            <Post post={p} />
          ))}
        </div>
      )}
    </>
  );
}
