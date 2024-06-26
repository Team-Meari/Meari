import { useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
    //console.log(event.target.value);
  };

  const textClear = () => {
    setValue("");
  };

  return { value, onChange, textClear };
};

export const useTextArea = (textarea) => {
  const [value, setValue] = useState("");
  const [height, setHeight] = useState(22);

  const onChange = (event) => {
    setValue(event.target.value);
    //console.log(event.target.value);
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    setHeight(textarea.current.scrollHeight);
  };

  const textClear = () => {
    setValue("");
  };

  return { value, onChange, textClear, height };
};
