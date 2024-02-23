import React from "react";
import "./transaction.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {

  return (
    <Link className="Link" to={`/purchase/${post.car_id}`}>
      <div className="transaction">
        <img
          className="postimg"
          src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />

        <div className="postinfo">
          <div className="postTitle">
            <span className="span">{post.name}</span>
          </div>
          <div className="postdetail">
            <div><span className="span">Type: {post.type}</span></div>
            <div><span className="span">Model: {post.model}</span></div>
          </div>

          <hr/>
          <div className="postdetail">
            <span className="span">Seller Name: {post.dealer_name}</span>
            <span className="span">SellerId: {post.dealer_id}</span>
          </div>
          <div className="postdetail">
            <span className="span">Buyer Name: {post.Buyer_name}</span>
            <span className="span">BuyerId: {post.Buyer_id}</span>
          </div>
          <div className="postdetail">
            <span className="span">CarId: {post.car_id}</span>
          </div>
        </div>
        <p className="postDesc">{post.car_info}</p>
      </div>
    </Link>
  );
}
