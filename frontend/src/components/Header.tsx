import {FaOpencart} from "react-icons/fa6";
import {CgLogIn} from "react-icons/cg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {logout} from "../features/users.ts";
import {clearCart} from "../features/addCart.ts";


const openMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

const Header = () => {
    const navigate = useNavigate();
    const locate = useLocation();
    const dispatch = useDispatch()
    const userLogin = useSelector((state: RootState) => state.users.user)
    const logoutHandler = () => {
        dispatch(clearCart())
        dispatch(logout())

    }
    const chooseHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value)
            if (e.target.value === 'Profile') {

                navigate('/profile');
            } else if (e.target.value === 'Logout') {
                logoutHandler();
                navigate('/login');
            }
    }
    return (
        <header className="bg-blue-900 text-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold">Vanilla Shop </Link>
                    </div>
                    <nav className="hidden md:flex space-x-10 text-lg">
                        <Link to="/cart"
                              className="hover:text-gray-300 transition-all flex items-center gap-2"><FaOpencart/>Cart</Link>
                        {userLogin !== null ?
                            <select name="current-user" id="current-user" onChange={chooseHandler}
                                    className="bg-blue-900 text-white"
                                    value={locate.pathname === '/profile' ? 'Profile' : userLogin.name}>
                                <option>{userLogin.name}</option>
                                <option value="Profile">
                                    Profile
                                </option>
                                <option value="Logout">
                                    Logout
                                </option>
                            </select>

                            : <Link to="/login"
                                    className="hover:text-gray-300 transition-all flex items-center gap-2"><CgLogIn/>Login</Link>}


                    </nav>
                    <div className="hidden md:block">
                        <Link to="/contact"
                              className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-6 rounded-full text-lg transition-all">
                            Get in Touch
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            id="menu-button"
                            className="text-white focus:outline-none focus:text-gray-300 cursor-pointer"
                            onClick={openMenu}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" className="md:hidden mt-5 hidden space-y-4">
                    <Link to="/cart" className="block text-lg hover:text-gray-300 transition-all">Cart</Link>
                    {userLogin !== null ?
                        <Link to="/logout" className="block text-lg hover:text-gray-300 transition-all">Logout</Link>
                        : <Link to="/login" className="block text-lg hover:text-gray-300 transition-all">Login</Link>}
                </div>
            </div>
        </header>
    );
}

export default Header