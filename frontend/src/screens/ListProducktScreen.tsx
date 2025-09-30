import {FaEdit, FaTrashAlt, FaUserAstronaut} from "react-icons/fa";
import {MdMarkEmailUnread} from "react-icons/md";
import SimpleBtn from "../components/ui/simpleBtn.tsx";
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useDeleteUserMutation,
    useGetProductsQuery,
    useGetUsersQuery
} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {saveUsersList} from "../features/addCart.ts";

const ListProductScreen = () => {
    const [user, _] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const navigate = useNavigate()
    const {data, isLoading, refetch} = useGetProductsQuery(user.token)
    const [deleteUser, {isLoading: isDeleting}] = useDeleteProductMutation()
    const [createProduct, {isLoading: isCreating}] = useCreateProductMutation()
    const [productsList, setProductsList] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (!data) return;
        setProductsList(data)
    }, [data]);
    const deleteHandler = async (id: string) => {
        if (!user.is_admin) {
            navigate('/login')
            return;
        }
        try {
            await deleteUser({id, token: user.token})
            setProductsList(productsList.filter((user: any) => user.id !== id))
            dispatch(saveUsersList(productsList.filter((user: any) => user.id !== id)))
            refetch()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container mx-auto h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Products List</h1>
                <SimpleBtn
                    text="Add Product"
                    onClick={async () => {
                        const data = await createProduct({token: user.token})
                        navigate(`/product/${data.data._id}/update`)
                    }}
                />
            </div>
            <table className="min-w-full border-collapse border border-gray-500">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Brand</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {productsList.map((product: any) => (
                    <tr key={product._id}>
                        <td className="border border-gray-300 px-4 py-2">{product._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.brand}</td>
                        <td className="border border-gray-300 px-4 py-2 flex gap-2 items-center justify-between">
                            <Link
                                className="text-blue-500 hover:text-blue-600"
                                to={`/product/${product._id}/update`}
                            >
                                <FaEdit/>
                            </Link>
                            <button
                                onClick={async () => await deleteHandler(product._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                <FaTrashAlt/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default ListProductScreen
