import { useEffect, useState } from "react";

export const useList = (mvalue, data) => {
  const [mearilist, setMeariList] = useState([]);

  useEffect(() => {
    if (data) {
      setMeariList([...data]);
    }
  }, [data]);

  return { mearilist };
};
