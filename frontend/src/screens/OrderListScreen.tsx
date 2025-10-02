import {useSelector} from "react-redux";
import {useGetOrdersQuery, useUpdateOrderToDeliveredMutation} from "../store/api.ts";
import {Link, useNavigate} from "react-router-dom";
import {FaClipboardCheck, FaEdit, FaTrashAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";

const OrderListScreen = () => {
    const userInfo = useSelector((state: any) => state.users.user)
    const {data, isLoading, error, refetch} = useGetOrdersQuery({token: userInfo.token})
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

    if (isLoading) {
        return <Loading/>
    }


    const deliveredHandler = async (id: string) => {
        await updateOrderToDelivered({id, token: userInfo.token})
        refetch()
    }
    return (
        <div className="container mx-auto h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Order List</h1>
            <table className="min-w-full border-collapse border border-gray-500">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">User</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Total</th>
                    <th className="border border-gray-300 px-4 py-2">Paid</th>
                    <th className="border border-gray-300 px-4 py-2">Delivered</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order: any) => (
                    <tr key={order._id}>
                        <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.user.name || order.user.username}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.totalPrice}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.isPaid ? 'Yes' : 'No'}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.isDelivered ? 'Yes' : 'No'}</td>
                        <td className="border border-gray-300 px-4 py-2 flex gap-2 items-center justify-between">
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

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>

    )
}

export default OrderListScreen
