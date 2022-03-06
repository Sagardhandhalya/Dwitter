import React from "react";
import Avatar from "../Avatar/Avatar";
import "./AllPost.css";
import donateIcon from "./../../donate.svg";
const AllPost = ({ posts, tipPost, instance }) => {
  return (
    <div className="main__container">
      <div className="header_sort">
        <h1>All Posts</h1>
        <div className="select_form">
          <label>Sort By </label>
          <select>
            <option value="Tips">Popular</option>
            <option value="old">oldest</option>
            <option value="new">letest</option>
          </select>
        </div>
      </div>
      <div className="cards">
        {posts.map((post, key) => {
          return (
            <div className="card" key={key}>
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
                    TIPS:{" "}
                    {instance.utils.fromWei(post.tipAmount.toString(), "Ether")}
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
        })}
      </div>
    </div>
  );
};

export default AllPost;
