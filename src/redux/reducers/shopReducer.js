import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { products:[], loading:true, filter:10000 };

const shopSlice = createSlice({
  name: "shop",
  initialState: INITIAL_STATE,
  reducers: {
    setProducts: (state, action) => {
      state.products=[...action.payload];
      state.loading=false;
    },
    setLoading:(state, action)=>{
      state.loading=!state.loading;
    },
    setFilter:(state, action)=>{
      state.filter=action.payload;
    },
  }
});

export const shopReducer = shopSlice.reducer;
export const { setProducts ,setLoading, setFilter } = shopSlice.actions;

export const shopSelector = (state) => state.shopReducer;
