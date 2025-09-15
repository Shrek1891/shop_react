import type {RootState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {MdDeleteSweep} from "react-icons/md";
import {FaMinus, FaPlus} from "react-icons/fa";
import type {OrderItem} from "../types.ts";
import {addToCart, removeCart} from "../features/addCart.ts";
import InfoTablet from "../components/ui/InfoTablet.tsx";
import ButtonQuantity from "../components/ui/buttonQuantity.tsx";
import InfoCart from "../components/ui/InfoCart.tsx";
import CheckoutSteps from "../components/CheckoutStpes.tsx";


const CartScreen = () => {
    const {cartItem} = useSelector((state: RootState) => state.addCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector((state: RootState) => state.users)
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
            <CheckoutSteps step="cart" />
            <div className="container mx-auto p-4 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Shopping Cart</h1>
                    <InfoTablet info={cartItem.length} text="items"/>
                    <InfoTablet
                        info={cartItem.reduce((acc: number, item: OrderItem) => acc + Number(item.price) * (item.qty || 0), 0)}
                        text="$ Amount"/>
                </div>
            </div>
            {!cartItem.length && <InfoCart link={"/"}/>}
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
                                {userLogin.user &&
                                    <div className="flex justify-center align-center items-center">
                                        <span className="text-gray-600">Quantity : </span>
                                        <div className="flex items-center border rounded mx-2">
                                            <ButtonQuantity
                                                children={<FaPlus/>}
                                                func={() => handleClick(item, "+")}
                                                disabled={item.qty === item.countInStock}
                                            />
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
                                            <ButtonQuantity
                                                children={<FaMinus/>}
                                                func={() => handleClick(item, "-")}
                                                disabled={item.qty === 1}
                                            />
                                        </div>
                                    </div>
                                }
                                < ButtonQuantity
                                    children={<MdDeleteSweep/>}
                                    func={() => dispatch(removeCart(item))}
                                    disabled={item.qty === 1}
                                />
                            </div>
                        </div>
                    ))
                }

            </div>
            {cartItem.length && (
                <div className="flex justify-center mt-4">
                    <Link to="/shipping"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Buy Now
                    </Link>
                </div>
            )}

        </div>
    )
}

export default CartScreen

