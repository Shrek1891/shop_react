import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../features/users.ts";
import {useLoginMutation, useRegisterMutation} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {SiNamemc} from "react-icons/si";
import {MdOutlineAlternateEmail} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import {GiConfirmed} from "react-icons/gi";

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const [registerData, {isLoading, error}] = useRegisterMutation();
    const [userLogin, {isLoading: isLoadingLogin, isSuccess: isLoginSuccess}] = useLoginMutation();
    const navigate = useNavigate();
    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setIsConfirmPassword(true)
        } else {
            setIsConfirmPassword(false)
            await registerData({name, email, password})
            if (!error) {
                const response = await userLogin({email, password})
                if (isLoginSuccess) {
                    dispatch(login(response.data))
                    navigate('/');
                }
            }
        }
    }
    return isLoading || isLoadingLogin ? (
        <Loading/>
    ) : (
        <div className=" mt-5 bg-gradient-to-br  flex justify-center items-center w-full h-screen ">
            <form onSubmit={(e) => registerHandler(e)}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                        <hr/>
                        {isConfirmPassword && <p className="text-red-500">{"Passwords do not match"}</p>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <SiNamemc/>
                            <input className="pl-2 outline-none border-none w-full" type="text" name="name"
                                   value={name}
                                   placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <MdOutlineAlternateEmail/>
                            <input className="pl-2 outline-none border-none w-full" type="email" name="email"
                                   value={email}
                                   placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>

                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <RiLockPasswordFill/>
                            <input className="pl-2 outline-none border-none w-full" type="password" name="password"
                                   value={password}
                                   id="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>

                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <GiConfirmed/>
                            <input className="pl-2 outline-none border-none w-full" type="password"
                                   name="confirmPassword"
                                   value={confirmPassword}
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
                    <button type="submit" value="login" id="login"
                            className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Register
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

    )
}

export default RegisterScreen
