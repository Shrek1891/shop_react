import {createSlice} from "@reduxjs/toolkit";
import type {OrderItem} from "../types.ts";

const localStorageCartItems = localStorage.getItem("cartItems");
const localStorageShippingAddress = localStorage.getItem("shippingAddress");
const localStoragePaymentMethod = localStorage.getItem("paymentMethod");

const initialState = {
    cartItem: localStorageCartItems ? JSON.parse(localStorageCartItems) : [],
    shippingAddress: localStorageShippingAddress ? JSON.parse(localStorageShippingAddress) : {},
    paymentMethod: localStoragePaymentMethod ? JSON.parse(localStoragePaymentMethod) : "",
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
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
        },
    },
})

export const {addToCart, removeCart, clearCart, saveShippingAddress, savePaymentMethod} = addCartSlice.actions;
export default addCartSlice.reducer;



