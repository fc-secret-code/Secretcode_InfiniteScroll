import getList from "./listBuilder";
import { dummyFetcher } from "./util";

const listElem = document.querySelector("#list");

const renderItem = ({ id, no, text }) => {
  const li = document.createElement("li");
  li.insertAdjacentHTML(
    "beforeend",
    `
      <div class="no">${no}</div>
      <div class="content">
        <div class="_id">${id}</div>
        <div class="text">${text}</div>
      </div>
    `
  );
  return li;
};

const renderList = async page => {
  const list = await dummyFetcher(getList, page);

  const frag = document.createDocumentFragment();
  list.forEach(item => frag.appendChild(renderItem(item)));
  listElem.appendChild(frag);
};

export default renderList;
