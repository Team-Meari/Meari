import { useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
    //console.log(event.target.value);
  };

  const textClear = () => {
    setValue("");
  };

  return { value, onChange, textClear };
};
