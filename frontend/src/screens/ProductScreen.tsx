import {Link, useParams} from "react-router-dom";
import Rating from "../components/Rating.tsx";
import type {Product} from "../resources.ts";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";

const ProductScreen = () => {
    const [product, setProduct] = useState<Product | null>(null);
    let {id} = useParams();
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        }
        fetchProduct();
    }, []);
    if (!product) {
        return <div>Product not found</div>
    }
    if (!product) {
        return <Loading/>
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
                <div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
                    <img className="p-8 rounded-t-lg" src={product?.image}
                         alt="product image"/>
                </div>
                <div className="px-5 pb-5">
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product?.name}
                        </h5>
                    </div>
                    <div>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{product?.description}</p>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                        <Rating startRating={product?.rating}/>
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span
                            className="text-3xl font-bold ">{product?.price + " Candy"}</span>
                        <button className="button" disabled={product.countInStock === 0}>
                            <span className="label">+ Add to card</span>
                            <span className="gradient-container">
                            <span className="gradient"></span>
                          </span>
                        </button>
                    </div>
                </div>
            </div>
            <Link to="/" className="btn btn-light my-3 button">Back</Link>
        </div>

    )
}

export default ProductScreen