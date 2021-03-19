import React from "react";

const Item = ({ id, no, text }) => (
  <li>
    <div className="no">{no}</div>
    <div className="content">
      <div className="_id">{id}</div>
      <div className="text">{text}</div>
    </div>
  </li>
);

export default Item;
