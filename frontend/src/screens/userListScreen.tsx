import {useDeleteUserMutation, useGetUsersQuery} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {saveUsersList} from "../features/addCart.ts";

const UserListScreen = () => {
    const [user, _] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const navigate = useNavigate()
    const {data, isLoading, refetch} = useGetUsersQuery(user.token)
    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation()
    const [usersList, setUsersList] = useState([])
    const dispatch = useDispatch()
    if (isLoading) {
        return <Loading/>
    }
    const deleteHandler = async (id: string) => {
        if (!user.is_admin) {
            navigate('/login')
            return;
        }
        if (user.id === id) {
            alert('You cannot delete yourself')
            return;
        }
        if (data.some((user: any) => user.id === id && user.is_admin === true)) {
            alert('You cannot delete admin')
            return;
        }
        try {
            await deleteUser({id, token: user.token}).unwrap()
            setUsersList(usersList.filter((user: any) => user.id !== id))
            dispatch(saveUsersList(usersList.filter((user: any) => user.id !== id)))
            refetch()
        } catch (error) {
            console.log(error)
        }
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
                        <td className="border border-gray-300 px-4 py-2">{user.name || user.username}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email || user.username}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.is_admin ? 'Yes' : 'No'}</td>
                        <td className="border border-gray-300 px-4 py-2 flex gap-2 items-center justify-between">
                            <Link
                                className="text-blue-500 hover:text-blue-600"
                                to={`/user/${user.id}`}
                            >
                                <FaEdit/>
                            </Link>
                            <button
                                onClick={async () => await deleteHandler(user.id)}
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
