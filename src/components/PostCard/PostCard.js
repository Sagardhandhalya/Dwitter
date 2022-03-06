import React from "react";
import donateIcon from "./../../donate.svg";
import Avatar from "../Avatar/Avatar";
import "./PostCard.css";
const PostCard = ({ post, tipPost, instance }) => {
  return (
    <div className="card">
      <div className="card-header">
        <Avatar account={post.author} />
        <small className="text-muted">{post.author}</small>
      </div>
      <div className="post_content">
        <p>{post.content}</p>
      </div>
      <div className="bottom_bar">
        <b>
          {" "}
          <small className="tips">
            TIPS: {instance.utils.fromWei(post.tipAmount.toString(), "Ether")}
            ETH
          </small>
        </b>
        <button
          className="btn"
          name={post.id}
          onClick={(event) => {
            let tipAmount = instance.utils.toWei("0.1", "Ether");
            console.log(tipAmount);
            tipPost(event.target.name, tipAmount);
          }}
        >
          <img src={donateIcon} className="donate" /> TIP 0.1 ETH
        </button>
      </div>
    </div>
  );
};

export default PostCard;
