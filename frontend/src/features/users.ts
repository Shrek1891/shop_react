import {createSlice} from "@reduxjs/toolkit";

const localStorageUser = localStorage.getItem("user")
const localStorageCartItems = localStorage.getItem("cartItems")
const initialState = {
    user: localStorageUser ? JSON.parse(localStorageUser) : null,
    cartItem: localStorageCartItems ? JSON.parse(localStorageCartItems) : []
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        login: (state, action) => {
            const {password, ...rest} = action.payload
            localStorage.setItem("user", JSON.stringify({...rest}))
            state.user = action.payload

        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem("user")
            localStorage.removeItem("cartItems")
            localStorage.removeItem("shippingAddress")
            localStorage.removeItem("paymentMethod")
            localStorage.removeItem("orderItems")
        },
        register: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
        updateUserProfile: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
    }
})

export const {login, logout, register, clearUser, updateUserProfile} = usersSlice.actions
export default usersSlice.reducer