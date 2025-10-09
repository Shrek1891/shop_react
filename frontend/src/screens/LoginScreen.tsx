import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../features/users.ts";
import {useLoginMutation} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {MdOutlineAlternateEmail} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";

const loginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, {isLoading, error}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandle =
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const response = await loginData({email, password})
            if (response && !response.error) {
                dispatch(login(response.data))
                navigate('/');
            }
        }
    if (isLoading) {
        return <Loading/>
    }
    if (error) {
        return (
            <div className="h-screen bg-gradient-to-br  flex justify-center items-center space-x-4 w-full  ">
                <p className="text-red-500">{"Invalid email or password"}</p> <br/>
                <Link to="/register" className="text-red-500">{"->   Register"}</Link>
            </div>
        )
    }
    return (
        <div className="h-screen bg-gradient-to-br  flex justify-center items-center w-full ">
            <form onSubmit={(e) => loginHandle(e)}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
                        <hr/>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <MdOutlineAlternateEmail/>
                            <input
                                className="pl-2 outline-none border-none w-full" type="text" name="email"
                                value={email}
                                placeholder="Email or name"
                                required
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <RiLockPasswordFill/>
                            <input
                                className="pl-2 outline-none border-none w-full"
                                type="password"
                                name="password"
                                value={password}
                                id="" placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                            <input type="checkbox" id="rememberMeCheckbox" name="rememberMe" className="mr-2"/>
                            <span className="text-xs font-semibold">Remember me?</span>
                        </p>
                    </div>

                    <button type="submit" value="login" id="login"
                            className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Login
                    </button>
                    <hr/>
                    <div className="flex justify-center items-center mt-4">
                        <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <span className="ml-2">You don't have an account?
                            <Link to="/register"
                                  className="text-xs ml-2 text-blue-500 font-semibold">Register now &rarr;</Link>
                        </span>
                        </p>
                    </div>
                </div>
                <div className="pt-6 text-base font-semibold leading-7">
                    <p className="font-sans text-red-500 text-md hover:text-red-800">
                        <Link to="/" className="absolute">&larr; Home</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default loginScreen
