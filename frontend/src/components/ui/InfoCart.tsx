import {Link} from "react-router-dom";

const InfoCart = ({link}: { link: string }) => {
    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div x-show="cartItems.length === 0" className="bg-white rounded-lg shadow-md p-6 text-center">
                <i className="fas fa-shopping-cart text-gray-300 text-5xl mb-4"></i>
                <p className="text-xl text-gray-500">Your cart is empty</p>
                <Link to={link}
                      className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default InfoCart
