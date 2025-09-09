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
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.user = action.payload

        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem("user")
            localStorage.removeItem("cartItems")
        },
        register: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
    }
})

export const {login, logout, register, clearUser} = usersSlice.actions
export default usersSlice.reducer