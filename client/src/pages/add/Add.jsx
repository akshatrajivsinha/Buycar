import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./add.css"

function Add() {

  const navigate = useNavigate();
  const[cardId,setcardId] = useState("");
  const[name,setname] = useState("");
  const[model,setmodel] = useState("");
  const[type,settype] = useState("");
  const[info,setinfo] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))


  const handleSubmit = async(e)=>{
    e.preventDefault();
   try {const res = await axios.post("/car/",{headers:{"authorization":currentUser.token},dealer_name:currentUser.username,dealer_id:currentUser.id,car_id:cardId,name,model,type,car_info:info})
          navigate("/dealer")      
    res.status(200).json(res.data);
  }
   catch(err){}
  }


  return (
    <div className='add'>
    <div className="container">
        <h1 className='h1'>ADD CAR Detail</h1>
        (
          <form action="" className='form' onSubmit={handleSubmit}> 
                <label className='label'>CarId</label>
                <input className="input" type="text" placeholder='Enter you cardId' onChange={(e)=>setcardId(e.target.value)}/>
                <label className="label">Name</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e)=>setname(e.target.value)}
                />
                <label className='label'>model</label>
                <input className="input" type="text" placeholder='Enter your model' onChange={(e)=>setmodel(e.target.value)}/>
                <label className='label'>type</label>
                <input className="input" type="text" placeholder='Enter your type' onChange={(e)=>settype(e.target.value)}/>
                <label className='label'>car_info</label>
                <textarea name="input" id="" cols="80" rows="10" onChange={(e)=>setinfo(e.target.value)}/>
                <button className='button'>ADD</button>
            </form>
        )
        </div>
        </div>
  )
}

export default Add
