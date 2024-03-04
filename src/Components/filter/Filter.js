import React, { useEffect, useState } from "react";
import { setFilter } from "../../redux/reducers/shopReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const [price, setPrice] = useState(10000);
  const dispatch = useDispatch();


  const handlePriceChange = (event) => {
    setTimeout(() => {
      dispatch(setFilter(event.target.value));
    }, 1000);
    setPrice(event.target.value);
  };

  return (
    <div style={{ position: "fixed", top: "40vh", padding: "0px", background: "white" }}>
      <p>Filter</p>
      <label>
        Min Price: <span>{price}</span>
      </label>
      <input
        type='range'
        min='100'
        max='15000'
        value={price}
        onChange={handlePriceChange}
      />
      <label>
      </label>
    </div>
  );
};

export default Filter;
