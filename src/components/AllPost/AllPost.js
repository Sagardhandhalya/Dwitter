import React from "react";
import "./AllPost.css";
import PostCard from "../PostCard/PostCard";
const AllPost = ({ posts, tipPost, instance }) => {
  return (
    <div className="main__container">
      <div className="header_sort">
        <h1>All Posts</h1>
        <div className="select_form">
          <label>Sort By </label>
          <select>
            <option value="Tips">Popular</option>
            <option value="old">Oldest</option>
            <option value="new">Letest</option>
            <option value="mypost">My Post</option>
          </select>
        </div>
      </div>
      <div className="cards">
        {posts.map((post, key) => (
          <PostCard
            instance={instance}
            key={post.id}
            post={post}
            tipPost={tipPost}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPost;
