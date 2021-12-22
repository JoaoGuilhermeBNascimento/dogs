import React from "react";
import TokenPost from "./endpoints/TokenPost";
import UserPost from "./endpoints/UserPost";

const Api = () => {
  return (
    <div>
      <h2>UserPost</h2>
      <UserPost />
      <h2>TokenPost</h2>
      <TokenPost />
    </div>
  );
};

export default Api;
