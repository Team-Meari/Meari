import ListContent from "../componentes/ListContent";
import { useList } from "../hooks/useList";
import styles from "../css/List.module.css";
import { useEffect, useRef } from "react";
function MeariList({ value }) {
  const { mearilist } = useList(value);
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [mearilist]);
  return (
    <div className={styles.container} ref={containerRef}>
      {mearilist.map((item, index) => (
        <div key={index}>{item.content}</div>
      ))}
    </div>
  );
}

export default MeariList;
