import Shipping from "../components/ui/shipping.tsx";
import {useDispatch} from "react-redux";
import {useGetOrderDetailsQuery, useUpdateOrderToPaidMutation} from "../store/api.ts";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading.tsx";
import PayMethod from "../components/ui/payMethod.tsx";
import CardOrderList from "../components/CardOrderList.tsx";
import OrderSummary from "../components/OrderSummary.tsx";
import {saveOrderDetails} from "../features/addCart.ts";
import type {OrderItem} from "../types.ts";
import SimpleBtn from "../components/ui/simpleBtn.tsx";
import {useEffect, useState} from "react";

const OrderScreen = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const {id} = useParams()
    const [isPaidSuccess, setIsPaidSuccess] = useState(false)
    const {data, isLoading} = useGetOrderDetailsQuery({id, token: user.token})
    const [updateOrderToPaid] = useUpdateOrderToPaidMutation()
    useEffect(() => {
        if (!data) return;
        dispatch(saveOrderDetails(data))
        setIsPaidSuccess(data.isPaid)
    }, [data])

    const toPayNow = async (id: string | undefined) => {
        await updateOrderToPaid({id, token: user.token})
        setIsPaidSuccess(true)
    }
    if (isLoading) {
        return <Loading/>
    }
    if (!data) {
        return <p>Order not found</p>
    }
    const {
        paymentMethod,
        order_items: cartItems,
        shippingPrice,
        taxPrice,
        totalPrice,
        isDelivered,
        user: userOrder
    } = data
    if (userOrder.id !== user.id) {
        return <p className="text-red-500 text-2xl flex justify-center items-center h-screen">Order not found</p>
    }
    const itemsPrice = cartItems.reduce((a: number, b: OrderItem) => a + (b.qty || 0) * b.price, 0).toFixed(2)
    return (
        <div className="flex justify-between items-center gap-4 flex-col md:flex-row ">
            <div className="w-full max-w-3xl mx-auto p-8 h-full">
                <Shipping isFull={true} isDelivered={isDelivered}/>
                <PayMethod paymentMethod={paymentMethod} isPaid={isPaidSuccess}/>
                <CardOrderList cartItems={cartItems}/>
            </div>
            <div className="w-full max-w-3xl mx-auto p-8 h-full">
                <OrderSummary
                    itemsPrice={itemsPrice}
                    shippingPrice={shippingPrice}
                    taxPrice={taxPrice}
                    totalPrice={totalPrice}
                />

                {isPaidSuccess ? <p>Order Paid : {new Date(data.paidAt).toLocaleDateString()}</p> :
                    <SimpleBtn onClick={async () => await toPayNow(id)}
                               text={"Pay Now (This demo, it will not work)"}/>}
            </div>

        </div>
    )


}

export default OrderScreen
