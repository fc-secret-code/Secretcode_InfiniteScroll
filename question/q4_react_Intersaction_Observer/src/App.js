import React, { useState, useEffect } from "react";
import List from "./List";
import FetchMore from "./FetchMore";
import getList from "./listBuilder";
import { dummyFetcher } from "./util";
import "./style.css";

export default function App() {
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const list = await dummyFetcher(getList, page);
    setList((prev) => [...prev, ...list]);
    setLoading(false);
  }, [page]);

  return (
    <div id="app" className={page === 0 && loading ? "loading" : ""}>
      <List list={list} />
      <FetchMore loading={page !== 0 && loading} setPage={setPage} />
    </div>
  );
}
