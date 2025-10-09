import {useLocation} from "react-router-dom";
import {useGetUserByIdQuery, useUpdateUserMutation} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {useEffect, useState} from "react";
import {FaUserAstronaut} from "react-icons/fa";
import {MdMarkEmailUnread} from "react-icons/md";
import SimpleBtn from "../components/ui/simpleBtn.tsx";


const UserEditScreen = () => {
    const [id] = useLocation().pathname.split('/').slice(-1);
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const {data, isLoading} = useGetUserByIdQuery({id, token: user.token})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [updateUser] = useUpdateUserMutation()
    useEffect(() => {
        if (!data) return;
        setName(data.name)
        setEmail(data.email)
        setIsAdmin(data.is_admin)
    }, [data]);
    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className=" bg-gradient-to-br  flex justify-center items-center w-full flex-col">
            <h1 className="text-center text-2xl font-semibold text-gray-600">User : {data.name}</h1>
            <form>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <FaUserAstronaut/>
                            <input className="pl-2 outline-none border-none w-full"
                                   type="text"
                                   name="name"
                                   value={name}
                                   placeholder="Email"
                                   required
                                   onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <MdMarkEmailUnread/>
                            <input className="pl-2 outline-none border-none w-full"
                                   type="email"
                                   name="email"
                                   value={email}
                                   id="email" placeholder="Password" required
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md space-x-2">
                            <input
                                type="checkbox"
                                name="isAdmin"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label htmlFor="isAdmin">Admin</label>
                        </div>
                        <div className="flex justify-center">
                            <SimpleBtn
                                type={"button"}
                                text="Update"
                                onClick={async () => await updateUser({
                                    user: {name, email, is_admin: isAdmin},
                                    token: user.token,
                                    id
                                })}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserEditScreen
