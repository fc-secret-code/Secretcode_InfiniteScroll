import React, { useRef, useEffect } from "react";

const FetchMore = ({ loading, setPage }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    // do something
  });

  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, []);

  return (
    <div
      id="fetchMore"
      className={loading ? "loading" : ""}
      ref={fetchMoreTrigger}
    />
  );
};

export default FetchMore;
