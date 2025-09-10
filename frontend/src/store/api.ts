import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const URL = "http://127.0.0.1:8000/api/"


export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}`,
        }),
        getUserProfile: builder.query({
            query: ({token}) => ({
                url: `users/profile/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),

        updateUserProfile: builder.mutation({
            query: () => ({
                url: 'users/profile/',
                method: 'PUT',
            })
        }),
        login: builder.mutation({
            query: ({email, password}) => ({
                url: 'users/login/',
                method: 'POST',
                body: {'username': email, password},
            }),
        }),
        register: builder.mutation({
            query: ({name, email, password}) => ({
                url: 'users/register/',
                method: 'POST',
                body: {'name': name, 'email': email, 'username': email, 'password': password},
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useLoginMutation,
    useRegisterMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = api;


