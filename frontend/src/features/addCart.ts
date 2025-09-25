import {createSlice} from "@reduxjs/toolkit";
import type {OrderItem} from "../types.ts";

const localStorageCartItems = localStorage.getItem("cartItems");
const localStorageShippingAddress = localStorage.getItem("shippingAddress");
const localStoragePaymentMethod = localStorage.getItem("paymentMethod");
const localStorageOrderItems = localStorage.getItem("orderItems");
const localStorageOrderDetails = localStorage.getItem("orderDetails");
const localStorageUsersList = localStorage.getItem("usersList");
import type {shippingAddress} from "../types.ts";

interface initialState {
    cartItem: OrderItem[];
    shippingAddress: shippingAddress | null;
    paymentMethod: string;
    orderItems: OrderItem[];
    orderDetails: OrderItem[];
    usersList: string[];

}


const initialState: initialState = {
    cartItem: localStorageCartItems ? JSON.parse(localStorageCartItems) : [],
    shippingAddress: localStorageShippingAddress ? JSON.parse(localStorageShippingAddress) : {},
    paymentMethod: localStoragePaymentMethod ? JSON.parse(localStoragePaymentMethod) : "",
    orderItems: localStorageOrderItems ? JSON.parse(localStorageOrderItems) : [],
    orderDetails: localStorageOrderDetails ? JSON.parse(localStorageOrderDetails) : [],
    usersList: localStorageUsersList ? JSON.parse(localStorageUsersList) : [],
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
        saveOrderItems: (state, action) => {
            state.orderItems = action.payload;
            localStorage.setItem("orderItems", JSON.stringify(action.payload));
        },
        clearPaymentMethod: (state) => {
            state.paymentMethod = "";
            localStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod));
        },
        clearShippingAddress: (state) => {
            state.shippingAddress = null;
            localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress));
        },
        clearOrderItems: (state) => {
            state.orderItems = [];
            localStorage.setItem("orderItems", JSON.stringify(state.orderItems));
        },
        saveOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
            localStorage.setItem("orderDetails", JSON.stringify(action.payload));
        },
        clearOrderDetails: (state) => {
            state.orderDetails = [];
            localStorage.setItem("orderDetails", JSON.stringify(state.orderDetails));
        },
        saveUsersList: (state, action) => {
            state.usersList = action.payload;
            localStorage.setItem("usersList", JSON.stringify(action.payload));
        },
    },
})

export const {
    addToCart,
    removeCart,
    clearCart,
    saveShippingAddress,
    savePaymentMethod,
    clearPaymentMethod,
    clearShippingAddress,
    clearOrderItems,
    saveOrderDetails,
    clearOrderDetails,
    saveUsersList
} = addCartSlice.actions;
export default addCartSlice.reducer;



