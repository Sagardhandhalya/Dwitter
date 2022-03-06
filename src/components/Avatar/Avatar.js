import React from "react";
import Identicon from "identicon.js";

const Avatar = ({ account }) => {
  return (
    <img
      alt="some avatar"
      className="ml-2"
      width="30"
      height="30"
      src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
    />
  );
};

export default Avatar;
