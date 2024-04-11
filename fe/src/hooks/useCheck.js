import { useEffect, useState } from "react";

export const useCheck = (value) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (value === "") {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, [value]);

  return { isChecked };
};
