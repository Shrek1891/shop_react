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
}

export interface OrderItem {
    name: string;
    qty: number | null;
    image: string;
    price: number;
    product: string;
    countInStock: number;
}