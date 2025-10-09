export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    createdAt: string;
    brand: string;
}

export interface OrderItem {
    name: string;
    qty: number | null;
    image: string;
    price: number;
    product: string;
    countInStock: number;
}

export type shippingAddress = {
    name?: string,
    lastName: string,
    address: string,
    city: string,
    zip: string,
    country: string,
    phone: string,
    state: string,

}

export type Order = {
    _id: string;
    user: string;
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliveredAt: string;
    createdAt: string;
    shippingAddress: shippingAddress;
    orderItems: OrderItem[];
}

export interface Review {
    _id: string;
    name: string;
    comment: string;
    rating: number;
    createdAt: string;
}

export type User = {
    user: []
}