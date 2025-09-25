import {useGetUsersQuery} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {saveUsersList} from "../features/addCart.ts";
import {useEffect, useState} from "react";

const UserListScreen = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const {data: users_list, isLoading} = useGetUsersQuery(user.token)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!users_list) return;
        if (!user.is_admin) {
            navigate('/login')
            return;
        }
        setData(users_list);
        dispatch(saveUsersList(users_list))

    }, [users_list])
    if (isLoading) {
        return <Loading/>
    }
    const deleteHandler = (id: string) => {
        console.log(id)
    }
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Users</h1>
            <table className="min-w-full border-collapse border border-gray-500">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Admin</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user: any) => (
                    <tr key={user.id}>
                        <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.is_admin ? 'Yes' : 'No'}</td>
                        <td className="border border-gray-300 px-4 py-2 flex gap-2 items-center justify-between">
                            <Link
                                className="text-blue-500 hover:text-blue-600"
                                to={`/user/${user.id}`}
                            >
                                <FaEdit/>
                            </Link>
                            <button
                                onClick={() => deleteHandler(user.id)}
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
    );
}

export default UserListScreen;
