import {createSlice} from "@reduxjs/toolkit";
import type {OrderItem} from "../types.ts";

const localStorageCartItems = localStorage.getItem("cartItems");
const initialState = {
    cartItem: localStorageCartItems ? JSON.parse(localStorageCartItems) : []
}

export const addCartSlice = createSlice({
    name: "addCart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item: OrderItem = action.payload;
            const existItem =
                state.cartItem.find((x: OrderItem) => x.product === item.product);
            if (existItem) {
                state.cartItem = state.cartItem.map((x: OrderItem) =>
                    x.product === item.product ? item : x
                );
            } else {
                state.cartItem.push(item);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
        },
        removeCart: (state, action) => {
            const item: OrderItem = action.payload;
            state.cartItem = state.cartItem.filter((x: OrderItem) => x.product !== item.product);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
        },
        clearCart: (state) => {
            state.cartItem = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
        },
    },
})

export const {addToCart, removeCart, clearCart} = addCartSlice.actions;
export default addCartSlice.reducer;



