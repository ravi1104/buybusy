import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { isLoggedin: false, loginData:{}, error: null , cartItems:[]};

const loginSlice = createSlice({
    name: "login",
    initialState: INITIAL_STATE,
    reducers: {
        setLoginData: (state, action) => {
            state.loginData = action.payload.loginData;
            state.isLoggedin = true;
            state.error = null;
            state.cartItems=[...state.cartItems, ...action.payload.cart]
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoggedin = false;
        },
        setCartItems:(state, action)=>{
            state.cartItems=[...state.cartItems,action.payload]
        },
        removeCartItem: (state, action) => {
            const newItems = state.cartItems.filter((item) => item.id !== action.payload);
            state.cartItems = newItems;
        }
        
    },
});

export const { setLoginData, setError, setCartItems, removeCartItem } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
export const loginSelector = (state) => state.loginReducer;
