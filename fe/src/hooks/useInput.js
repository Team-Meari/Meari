import { useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState(null);
  const onChange = (event) => {
    setValue(event.target.value);
    //console.log(event.target.value);
  };

  return { value, onChange };
};
