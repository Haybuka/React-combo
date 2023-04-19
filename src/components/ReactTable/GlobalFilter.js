import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
const GlobalFilter = ({ filter, setFilter }) => {
  //for debounce
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
    //delay at which the global takes to filter, in other to optimize.
  }, 1000);

  return (
    <span>
      Search :
      {/* <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} /> */}
      {/* for debounce */}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
