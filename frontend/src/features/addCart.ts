import {createSlice} from "@reduxjs/toolkit";
import type {OrderItem} from "../types.ts";

const localStorageCartItems = localStorage.getItem("cartItems");
const initialState = {
    cartItems: localStorageCartItems ? JSON.parse(localStorageCartItems) : []
}

export const addCartSlice = createSlice({
    name: "addCart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item: OrderItem = action.payload;
            const existItem =
                state.cartItems.find((x: OrderItem) => x.product === item.product);
            if (existItem) {
                state.cartItems = state.cartItems.map((x: OrderItem) =>
                    x.product === item.product ? item : x
                );
            } else {
                state.cartItems.push(item);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
})

export const {addToCart} = addCartSlice.actions;
export default addCartSlice.reducer;



