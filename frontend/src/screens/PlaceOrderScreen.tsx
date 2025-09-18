import CheckoutSteps from "../components/CheckoutStpes.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import type {OrderItem} from "../types.ts";
import {useAddOrderItemsMutation} from "../store/api.ts";
import {useNavigate} from "react-router-dom";
import {clearCart, clearPaymentMethod, clearShippingAddress} from "../features/addCart.ts";

const PlaceOrderScreen = () => {
    const shippingAddress = useSelector((state: RootState) => state.addCart.shippingAddress)
    const cartItems = useSelector((state: RootState) => state.addCart.cartItem)
    const paymentMethod = useSelector((state: RootState) => state.addCart.paymentMethod)
    const itemsPrice = cartItems.reduce((a: number, b: OrderItem) => a + (b.qty || 0) * b.price, 0).toFixed(2)
    const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
    const taxPrice = (0.15 * itemsPrice).toFixed(2)
    const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [addOrderItems] = useAddOrderItemsMutation()
    const placeOrder = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const {data, error} = await addOrderItems({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            token: user.token,
        })
        console.log(data)
        dispatch(clearCart())
        dispatch(clearPaymentMethod())
        dispatch(clearShippingAddress())
        if (!error && data) {
            navigate(`/order/${data._id}`)
        }
    }
    return (
        <div>
            <CheckoutSteps step="confirm"/>
            <div className="flex justify-between items-center gap-4 flex-col md:flex-row ">
                <div className="w-full max-w-3xl mx-auto p-8 h-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping : </h2>
                    <div>
                        <span>{shippingAddress.address}</span> <span>{shippingAddress.city}</span>
                        <span>{shippingAddress.postalCode}</span> <span>{shippingAddress.country}</span>
                        <span>{shippingAddress.phone}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment : </h2>
                    <div>
                        <span>{paymentMethod}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Items : </h2>
                    <div className="flex flex-col gap-4">
                        {cartItems.length === 0 ? <div>Cart is empty</div> : (

                            cartItems.map((item: OrderItem) => (
                                    <div key={item.product}
                                         className="flex justify-between items-center mb-4 gap-4 align-center border-b pb-4 w-full ">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 flex-1"/>
                                        <span className="flex-1">{item.name}</span>
                                        <span className="flex-1">{item.price} $</span>
                                        <span className="flex-1">{item.qty}</span>
                                        <span className="flex-1">{item.qty ? item.qty * item.price : 0}</span>
                                    </div>
                                )
                            ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary : </h2>
                    <div className="flex flex-col gap-4 mb-4 border-b pb-4">
                        <div className="flex justify-between items-center">
                            <span>Items : </span>
                            <span>{itemsPrice} $</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Shipping  :</span>
                            <span> {shippingPrice} $</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Tax  :</span>
                            <span> {taxPrice} $</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Total  :</span>
                            <span> {totalPrice} $</span>
                        </div>
                    </div>
                    <button
                        onClick={placeOrder}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer">Place
                        Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen


