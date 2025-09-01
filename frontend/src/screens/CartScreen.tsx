import type {RootState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {MdDeleteSweep} from "react-icons/md";
import {FaMinus, FaPlus} from "react-icons/fa";
import type {OrderItem} from "../types.ts";
import {addToCart, removeCart} from "../features/addCart.ts";


const CartScreen = () => {
    const {cartItem} = useSelector((state: RootState) => state.addCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const changeHandle = (item: OrderItem, qty: number) => {
        const updatedItem = {
            ...item,
            qty,
        };
        dispatch(addToCart(updatedItem));
    };
    const handleClick = (item: OrderItem, action: "+" | "-") => {
        if (!item.qty) {
            item.qty = 1;
        }
        const qty = item.qty + (action === "+" ? 1 : -1);
        changeHandle(item, qty);
    };

    const checkLogin = () => {
        navigate("/login?redirect=shipping");
    }
    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            <div className="container mx-auto p-4 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Shopping Cart</h1>
                    <div x-data="cart()" className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center">
                        <span x-text="cartItems.length"> {cartItem.length}</span> <span
                        className="hidden sm:inline ml-1">items</span>
                    </div>
                    <div x-data="cart()" className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center">
                        <span
                            x-text="cartItems.length"> {cartItem.reduce((acc: number, item: OrderItem) => acc + item.price * (item.qty || 0), 0)}</span>
                        <span
                            className="hidden sm:inline ml-1">$ Amount</span>
                    </div>
                </div>
            </div>
            {!cartItem.length && (
                <div className="container mx-auto p-4 max-w-6xl">
                    <div x-show="cartItems.length === 0" className="bg-white rounded-lg shadow-md p-6 text-center">
                        <i className="fas fa-shopping-cart text-gray-300 text-5xl mb-4"></i>
                        <p className="text-xl text-gray-500">Your cart is empty</p>
                        <Link to="/"
                              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Continue Shopping
                        </Link>
                    </div>
                </div>)
            }
            <div>
                {
                    cartItem.map((item: OrderItem) => (
                        <div key={item.product} className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <div className="flex justify-between  aleign-center items-center">
                                <div className="flex  space-x-3 align-center items-center">
                                    <img src={item.image || 'https://via.placeholder.com/80'} alt="Product" className="w-20
                                    h-20 object-cover rounded"/>
                                    <div className="w-64">
                                        <h2 className="font-semibold text-lg">{item.name}</h2>
                                    </div>
                                </div>
                                <div className="flex justify-between font-medium">
                                    <span>Price :</span>
                                    <span> {" " + item.price} $</span>
                                </div>
                                <div className="flex justify-center align-center items-center">
                                    <span className="text-gray-600">Quantity : </span>
                                    <div className="flex items-center border rounded mx-2">
                                        <button
                                            className="px-2 py-1 text-gray-500 cursor-pointer"
                                            disabled={item.qty === item.countInStock}
                                            onClick={() => handleClick(item, "+")}
                                        >
                                            <FaPlus/>
                                        </button>
                                        <input
                                            onChange={(e) => {
                                                const qty = parseInt(e.target.value);
                                                changeHandle(item, qty)
                                            }}
                                            type="number"
                                            min="1"
                                            max={item.countInStock}
                                            value={item.qty || 1}
                                            className="w-12 text-center border-x text-gray-500 cursor-pointer"
                                        />
                                        <button
                                            disabled={item.qty === 1}
                                            onClick={() => handleClick(item, "-")}
                                            className="px-2 py-1 text-gray-500 cursor-pointer">
                                            <FaMinus/>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => dispatch(removeCart(item))}
                                >
                                    <MdDeleteSweep/>
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    onClick={checkLogin}
                >
                    Buy Now
                </button>
            </div>
        </div>
    )
}

export default CartScreen

