import Shipping from "../components/ui/shipping.tsx";
import {useDispatch} from "react-redux";
import {useGetOrderDetailsQuery} from "../store/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../components/Loading.tsx";
import PayMethod from "../components/ui/payMethod.tsx";
import CardOrderList from "../components/CardOrderList.tsx";
import OrderSummary from "../components/OrderSummary.tsx";
import {saveOrderDetails} from "../features/addCart.ts";

const OrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const {id} = useParams()
    const {data, error, isLoading} = useGetOrderDetailsQuery({id, token: user.token})
    if (isLoading) {
        return <Loading/>
    } else {
        if (data) {
            dispatch(saveOrderDetails(data))
            const {
                paymentMethod,
                order_items: cartItems,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                isPaid,
                isDelivered
            } = data
            return (
                <div className="flex justify-between items-center gap-4 flex-col md:flex-row ">
                    <div className="w-full max-w-3xl mx-auto p-8 h-full">
                        <Shipping isFull={true} isDelivered={isDelivered}/>
                        <PayMethod paymentMethod={paymentMethod} isPaid={isPaid}/>
                        <CardOrderList cartItems={cartItems}/>
                    </div>
                    <div>
                        <OrderSummary itemsPrice={itemsPrice} shippingPrice={shippingPrice} taxPrice={taxPrice}
                                      totalPrice={totalPrice}/>
                    </div>
                </div>
            )
        }
    }


}

export default OrderScreen
