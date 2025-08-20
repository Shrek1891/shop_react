const Header = () => {
    return (
        <header className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-2xl font-bold">Vanilla Shop </a>
                    </div>
                    <nav className="hidden md:flex space-x-10 text-lg">
                        <a href="#" className="hover:text-gray-300 transition-all">Cart</a>
                        <a href="#services" className="hover:text-gray-300 transition-all">Login</a>
                    </nav>
                    <div className="hidden md:block">
                        <a href="#contact"
                           className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-6 rounded-full text-lg transition-all">
                            Get in Touch
                        </a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button id="menu-button" className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinejoin="round"  strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" className="md:hidden mt-5 hidden space-y-4" >
                    <a href="#" className="block text-lg hover:text-gray-300 transition-all">Cart</a>
                    <a href="#services" className="block text-lg hover:text-gray-300 transition-all">Login</a>
                </div>
            </div>
        </header>
    );
}

export default Header