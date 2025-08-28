import {configureStore} from "@reduxjs/toolkit";
import {api} from "./api.ts";
import addCartReducer from "../features/addCart.ts";


export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        addCart: addCartReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
