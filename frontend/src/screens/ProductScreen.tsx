import {Link, useNavigate, useParams} from "react-router-dom";
import Rating from "../components/Rating.tsx";
import Loading from "../components/Loading.tsx";
import {useCreateProductReviewMutation, useGetProductQuery} from "../store/api.ts";
import Error from "../components/Error404.tsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCartSlice} from "../features/addCart.ts";
import type {OrderItem, Review} from "../types.ts";
import type {RootState} from "../store/store.ts";

const ProductScreen = () => {
    const userLogin = useSelector((state: RootState) => state.users)
    const navigate = useNavigate();
    const [createProductReview, {isLoading: isLoadingReview}] = useCreateProductReviewMutation()
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch()
    let {id} = useParams();
    const {data: product, isLoading, error, refetch} = useGetProductQuery(id);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
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
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const reviewData = {
            rating: Number(rating),
            comment: comment,
        }
        const {data} = await createProductReview({id, token: userLogin.user.token, reviewData})
        if (data === "You have already reviewed this product") {
            alert("You have already reviewed this product")
            return;
        }
        if (data === "Please select a rating") {
            alert("Please select a rating")
            return;
        }
        refetch()
        setRating(0)
        setComment("")
    }
    if (!product || isLoading || isLoadingReview) {
        return <Loading/>
    }
    if (error || !product) {
        return <Error/>
    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
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
                        {userLogin.user &&
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
                            </button>}
                    </div>
                </div>
            </div>
            <Link to="/" className="btn btn-light my-3 button absolute bottom-8 right-1">Back</Link>
            <div className="flex flex-col gap-4 flex-wrap justify-center items-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
                {product.numReviews === 0 && <p className="text-gray-500">No Reviews</p>}
                {product.numReviews > 0 && product.reviews.map((review: Review) => (
                    <div key={review._id} className="flex flex-col gap-2">
                        <p className="text-gray-800">{review.name}</p>
                        <p className="text-gray-800">{review.comment}</p>
                        <Rating startRating={review.rating}/>
                        <p className="text-gray-800">{review.rating}</p>
                        <p className="text-gray-800">{(new Date(review.createdAt)).toLocaleDateString()}</p>
                    </div>

                ))
                }
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h1>
                {userLogin.user ? (
                    <form onSubmit={submitHandler} className="flex flex-col gap-2 w-[450px]">
                        <div className="flex flex-col gap-2 border border-gray-300 rounded p-2">
                            <label htmlFor="rating" className="text-gray-800 text-center">Rating</label>
                            <select
                                className="text-gray-800 border border-gray-300 rounded p-2"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                            >
                                <option value="" className="text-gray-800">Select...</option>
                                <option value="1" className="text-gray-800">1 - Poor</option>
                                <option value="2" className="text-gray-800">2 - Fair</option>
                                <option value="3" className="text-gray-800">3 - Good</option>
                                <option value="4" className="text-gray-800">4 - Very Good</option>
                                <option value="5" className="text-gray-800">5 - Excellent</option>
                            </select>
                            <label htmlFor="comment" className="text-gray-800 text-center">Comment</label>
                            <textarea
                                className="text-gray-800 border border-gray-300 rounded p-2"
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button type="submit" className="button mx-auto">Submit</button>
                        </div>
                    </form>
                ) : (
                    <p className="text-gray-500">Please <Link to="/login">login</Link> to write a review</p>
                )}


            </div>
        </div>

    )
}

export default ProductScreen