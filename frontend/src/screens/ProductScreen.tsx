import {Link, useNavigate, useParams} from "react-router-dom";
import Rating from "../components/Rating.tsx";
import Loading from "../components/Loading.tsx";
import {useGetProductQuery} from "../store/api.ts";
import Error from "../components/Error404.tsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addCartSlice} from "../features/addCart.ts";
import type {OrderItem} from "../types.ts";


const ProductScreen = () => {
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch()
    let {id} = useParams();
    const {data: product, isLoading, error} = useGetProductQuery(id);
    const handleAddToCart = () => {
        const cartItem: OrderItem = {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
        }
        dispatch(addCartSlice.actions.addToCart(cartItem))
        navigate(`/cart/${id}`);
    }
    if (!product || isLoading) {
        return <Loading/>
    }
    if (error) {
        return <Error/>
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
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
                            {product.countInStock > 0 && (
                                <span className="label">
                                    <select className="text-white" onChange={(e) => setQty(Number(e.target.value))}>
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option className="text-black" key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </span>
                            )}
                            <span className="label" onClick={handleAddToCart}>+ Add </span>
                            <span className="gradient-container">
                            <span className="gradient"></span>
                          </span>
                        </button>
                    </div>
                </div>
            </div>
            <Link to="/" className="btn btn-light my-3 button absolute bottom-8 right-1">Back</Link>
        </div>

    )
}

export default ProductScreen