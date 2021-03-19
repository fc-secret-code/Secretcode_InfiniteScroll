import React from "react";
import Item from "./Item";

const List = ({ list }) => (
  <ul id="list">
    {list.map((item, i) => (
      <Item {...item} key={`item_${i}`} />
    ))}
  </ul>
);

export default List;
