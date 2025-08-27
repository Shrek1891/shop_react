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
    }),
});

export const {useGetProductsQuery, useGetProductQuery} = api;


