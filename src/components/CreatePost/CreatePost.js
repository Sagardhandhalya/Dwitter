import React, { useState } from "react";
import "./CreatePost.css";
const CreatePost = ({ createPost }) => {
  const [content, setContent] = useState("");

  return (
    <div className="form_container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(createPost, content);
          createPost(content);
          setContent("");
        }}
      >
        <textarea
          className="form-control"
          placeholder="What's on your mind?"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="bottom">
          <button type="submit" className="btn">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
