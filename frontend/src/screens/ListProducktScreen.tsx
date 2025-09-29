import {FaEdit, FaTrashAlt, FaUserAstronaut} from "react-icons/fa";
import {MdMarkEmailUnread} from "react-icons/md";
import SimpleBtn from "../components/ui/simpleBtn.tsx";
import {useGetProductsQuery} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const ListProductScreen = () => {
    const navigate = useNavigate()
    const deleteHandler = async ({id, token}: { id: string, token: string }) => {
        console.log(id, token)
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const {data: products, error, isLoading} = useGetProductsQuery({token: user.token})
    if (isLoading) {
        return <Loading/>
    }


    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Products List</h1>
                <SimpleBtn
                    text="Add Product"
                    onClick={() => {
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
                {products.map((product: any) => (
                    <tr key={product._id}>
                        <td className="border border-gray-300 px-4 py-2">{product._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.brand}</td>
                        <td className="border border-gray-300 px-4 py-2 flex gap-2 items-center justify-between">
                            <Link
                                className="text-blue-500 hover:text-blue-600"
                                to={`/user/${user.id}`}
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
