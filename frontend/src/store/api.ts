import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const URL = "http://127.0.0.1:8000/api/"


export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword, page}: { keyword: string | null, page: number | null }) => ({
                url: 'products',
                method: 'GET',
                params: {
                    keyword,
                    page,
                },
            }),

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
            query: ({user}) => ({
                url: 'users/profile/update/',
                method: 'PUT',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
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
        addOrderItems: builder.mutation({
            query: ({
                        orderItems,
                        shippingAddress,
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        taxPrice,
                        totalPrice,
                        token
                    }) => ({
                url: 'orders/add/',
                method: 'POST',
                body: {
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },

            }),
        }),
        getOrderDetails: builder.query({
            query: ({id, token}) => ({
                url: `orders/${id}/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        updateOrderToPaid: builder.mutation({
            query: ({id, token}) => ({
                url: `orders/${id}/pay/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        getMyOrders: builder.query({
            query: ({token}) => ({
                url: 'orders/myorders/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        getUsers: builder.query({
            query: (token) => ({
                url: 'users/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                invalidatesTags: ['Users'],
            })
        }),
        deleteUser: builder.mutation({
            query: ({id, token}) => ({
                url: `users/${id}/delete/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        getUserById: builder.query({
            query: ({id, token}) => ({
                url: `users/get/${id}/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        updateUser: builder.mutation({
            query: ({user, token, id}) => ({
                url: `users/update/${id}/`,
                method: 'PUT',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        deleteProduct: builder.mutation({
            query: ({id, token}) => ({
                url: `products/delete/${id}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        createProduct: builder.mutation({
            query: ({token}) => ({
                url: 'products/create/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        updateProduct: builder.mutation({
            query: ({product, token, id}) => ({
                url: `products/update/${id}/`,
                method: 'PUT',
                body: product,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: 'products/upload/',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        getOrders: builder.query({
            query: ({token}) => ({
                url: 'orders/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        getOrderById: builder.query({
            query: ({id, token}) => ({
                url: `/${id}/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        updateOrderToDelivered: builder.mutation({
            query: ({id, token}) => ({
                url: `orders/${id}/delivered/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        createProductReview: builder.mutation({
            query: ({id, token, reviewData}) => ({
                url: `products/${id}/reviews/`,
                method: 'POST',
                body: reviewData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: 'products/top/',
                method: 'GET',
            })
        })
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useLoginMutation,
    useRegisterMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAddOrderItemsMutation,
    useGetOrderDetailsQuery,
    useUpdateOrderToPaidMutation,
    useGetMyOrdersQuery,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteProductMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadImageMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderToDeliveredMutation,
    useCreateProductReviewMutation,
    useGetTopProductsQuery
} = api;


