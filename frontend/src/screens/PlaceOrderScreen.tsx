import CheckoutSteps from "../components/CheckoutStpes.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import type {OrderItem} from "../types.ts";
import {useAddOrderItemsMutation} from "../store/api.ts";
import {useNavigate} from "react-router-dom";
import {clearCart, clearPaymentMethod, clearShippingAddress} from "../features/addCart.ts";
import type {shippingAddress} from "../types.ts";
import Shipping from "../components/ui/shipping.tsx";
import PayMethod from "../components/ui/payMethod.tsx";
import CardOrderList from "../components/CardOrderList.tsx";
import OrderSummary from "../components/OrderSummary.tsx";
import SimpleBtn from "../components/ui/simpleBtn.tsx";

const PlaceOrderScreen = () => {
    const shippingAddress: shippingAddress | null = useSelector((state: RootState) => state.addCart.shippingAddress)
    const cartItems = useSelector((state: RootState) => state.addCart.cartItem)
    const paymentMethod = useSelector((state: RootState) => state.addCart.paymentMethod)
    const itemsPrice = cartItems.reduce((a: number, b: OrderItem) => a + (b.qty || 0) * b.price, 0).toFixed(2)
    const shippingPrice = (Number(itemsPrice) > 100 ? 0 : 10).toFixed(2)
    const taxPrice = (0.15 * Number(itemsPrice)).toFixed(2)
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
        dispatch(clearCart())
        dispatch(clearPaymentMethod())
        dispatch(clearShippingAddress())
        if (!error && data) {
            navigate(`/order/${data}`)
        }
    }
    return (
        <div>
            <CheckoutSteps step="confirm"/>
            <div className="flex justify-between items-center gap-4 flex-col md:flex-row ">
                <div className="w-full max-w-3xl mx-auto p-8 h-full">
                    <Shipping isFull={false} isDelivered={false}/>
                    <PayMethod paymentMethod={paymentMethod} isPaid={false}/>
                    <CardOrderList cartItems={cartItems}/>
                </div>
                <div>
                    <OrderSummary itemsPrice={itemsPrice} shippingPrice={shippingPrice} taxPrice={taxPrice}
                                  totalPrice={totalPrice}/>
                    <SimpleBtn onClick={placeOrder} text="Place Order" type="button"/>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen


