import React, { useEffect, useState } from "react";
import ListContent from "../componentes/ListContent";

export const useList = (mvalue) => {
  const [state, setState] = useState(null);
  const mearilist = document.getElementById("mearilist");

  useEffect(() => {
    if (mearilist === null) {
      return;
    }
  }, [mvalue]);
  return { mearilist };
};
