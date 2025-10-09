import {useSelector} from "react-redux";
import {useGetOrdersQuery, useUpdateOrderToDeliveredMutation} from "../store/api.ts";
import {Link, useNavigate} from "react-router-dom";
import {FaClipboardCheck, FaEdit} from "react-icons/fa";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";
import Table from "../components/Table.tsx";

const OrderListScreen = () => {
    const userInfo = useSelector((state: any) => state.users.user)
    const {data, isLoading, refetch} = useGetOrdersQuery({token: userInfo.token})
    const [updateOrderToDelivered, {isLoading: isUpdating}] = useUpdateOrderToDeliveredMutation()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
            return
        }
        if (!data) return
        setOrders(data)
    }, [data])

    if (isLoading || isUpdating) {
        return <Loading/>
    }

    const head = ["ID", "User", "Date", "Total", "Paid", "Delivered", "Action"]
    const body = orders.map((order: any) => {
        return {
            _id: order._id,
            user: order.user.name || order.user.username,
            date: new Date(order.createdAt).toLocaleDateString(),
            total: order.totalPrice,
            paid: order.isPaid ? 'Yes' : 'No',
            delivered: order.isDelivered ? 'Yes' : 'No',
            action: (
                <div className="flex gap-2 items-center justify-between">
                    <Link
                        className="text-blue-500 hover:text-blue-600"
                        to={`/order/${order._id}`}
                    >
                        <FaEdit/>
                    </Link>
                    <button
                        onClick={() => deliveredHandler(order._id)}
                        className={` text-white px-4 py-2 rounded ${order.isDelivered ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        <FaClipboardCheck/>
                    </button>

                </div>
            )
        }
    })

    const deliveredHandler = async (id: string) => {
        await updateOrderToDelivered({id, token: userInfo.token})
        refetch()
    }
    return (
        <div className="container mx-auto h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Order List</h1>
            <Table head={head} body={body}/>
        </div>

    )
}

export default OrderListScreen
