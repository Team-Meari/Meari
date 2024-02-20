import { useEffect } from "react";

function ListContent({ value, author }) {
  return (
    <div>
      <h2>{value}</h2>
      <h4>{author}</h4>
    </div>
  );
}

export default ListContent;
