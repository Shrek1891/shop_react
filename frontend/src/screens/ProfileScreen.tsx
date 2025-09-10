import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {Link, useNavigate} from "react-router-dom";
import {useGetUserProfileQuery} from "../store/api.ts";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";

const ProfileScreen = () => {
    const {user} = useSelector((state: RootState) => state.users)
    const navigate = useNavigate()
    if (!user) {
        navigate('/login')
    }
    const {data: profile, isLoading, error} = useGetUserProfileQuery({id: user.id, token: user.access})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isConfirmPassword, setIsConfirmPassword] = useState(false)
    useEffect(() => {
        if (!profile) return
        setName(profile.name)
        setEmail(profile.email)
        setPassword(profile.password)
        setConfirmPassword(profile.password)
    }, [profile])
    return isLoading ? <Loading/> : (
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br  flex justify-center items-center w-full ">
                    <form>
                        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                            <div className="space-y-4">
                                <h1 className="text-center text-2xl font-semibold text-gray-600">Profile</h1>
                                <hr/>
                                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                                    </svg>
                                    <input className="pl-2 outline-none border-none w-full" type="text" name="name"
                                           value={name}
                                           placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                                         fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                                    </svg>
                                    <input className="pl-2 outline-none border-none w-full" type="email" name="email"
                                           value={email}
                                           placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>

                                </div>
                                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <input className="pl-2 outline-none border-none w-full" type="password"
                                           name="password"
                                           value={password}
                                           id="" placeholder="Password" required
                                           onChange={(e) => setPassword(e.target.value)}/>

                                </div>
                                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <input className="pl-2 outline-none border-none w-full" type="password"
                                           name="confirmPassword"
                                           value={password}
                                           id="confirmPassword" placeholder="Confirm Password" required
                                           onChange={(e) => setConfirmPassword(e.target.value)}/>

                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-4">
                                <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                                    <input type="checkbox" id="rememberMeCheckbox" name="rememberMe" className="mr-2"/>
                                    <span className="text-xs font-semibold">Remember me?</span>
                                </p>
                            </div>
                            <button
                                type="submit"
                                value="login"
                                id="login"
                                className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400
                                 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide
                                 transition duration-1000">
                                Update
                            </button>
                            <hr/>

                        </div>
                        <div className="pt-6 text-base font-semibold leading-7">
                            <p className="font-sans text-red-500 text-md hover:text-red-800">
                                <Link to="/" className="absolute">&larr; Home</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <h3>Order</h3>
            </div>
        </div>
    )

}
export default ProfileScreen