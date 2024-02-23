import React, { useEffect, useState } from "react";
import "./deal.css"
import axios from "axios"
import Post from "../../components/transaction/transaction";

const Deal = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const[dealer,Setdealer] = useState("")
  const[data,Setdata] = useState([])
  const[edit,Setedit] = useState(false);
  const[useremail,Setuseremail] = useState("");
  const[location,Setlocation] = useState("");
  const[info,Setinfo] = useState("");

  useEffect(()=>{
  const dealer = async()=>{
    const res = await axios.get("/dealer/"+currentUser.username,{headers:{"authorization":currentUser.token}});
    console.log(res.data);
    Setdealer(res.data);
  }
  dealer()

  const purchase = async()=>{
    const res = await axios.get(`/purchase/drecord?dealer_id=${currentUser.id}`,{headers:{"authorization":currentUser.token}});
    console.log(res.data);
    Setdata(res.data);
  }
  purchase()
  },[])
  
  const handlechange = async(e)=>{
    try{
      const change = await axios.put("/dealer/"+currentUser.username,{dealer_email:useremail,dealer_location:location,dealer_info:info});
      // localStorage.setItem("currentUser", JSON.stringify(change.data));
      Setedit(false);
      console.log(change.data);
      } catch (err) { console.log(err) }
    };
  

  return (
    <div className="deal">
      <div className="container">
        <div className="topcontainer">
          <div className="left">
            <h1 className="h1">{dealer.dealer_name}</h1>
            <div className="info"><span>user_id : </span><span>{dealer.dealer_id}</span></div>
            <div className="info"><span>user_email : </span>{!edit ?<span>{dealer.dealer_email}</span>: <input
              className="input"
              value={dealer.dealer_email}
              type="text"
              placeholder="Enter you username"
              onChange={(e)=>Setuseremail(e.target.value)}
            />}</div>
            <div className="info"><span>user_location : </span>{!edit ?<span>{dealer.dealer_location}</span> :  <input
              className="input"
              value={dealer.dealer_location}
              type="text"
              placeholder="Enter you username"
              onChange={(e)=>Setlocation(e.target.value)}
            />}</div>
            {edit ? <button className="button" onClick={handlechange}>DONE</button> : <button className="button" onClick={()=>Setedit(true)}>EDIT</button>}
          </div>
          <div className="right">
            <h1 className="h1">dealer_info</h1>
            {edit ? (
              <textarea
                value={dealer.dealer_info}
                className="desc"
                onChange={(e) => Setinfo(e.target.value)}
              ></textarea>
            ) : (
              <p className="desc">{dealer.dealer_info}</p>
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

export default Deal;
