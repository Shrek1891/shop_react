import type {RootState} from "../store/store.ts";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import type {OrderItem} from "../types.ts";
import InfoTablet from "../components/ui/InfoTablet.tsx";
import InfoCart from "../components/ui/InfoCart.tsx";
import CheckoutSteps from "../components/CheckoutStpes.tsx";
import CartCard from "../components/CartCard.tsx";


const CartScreen = () => {
    const {cartItem} = useSelector((state: RootState) => state.addCart)
    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            <CheckoutSteps step="cart"/>
            <div className="container mx-auto p-4 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Shopping Cart</h1>
                    <InfoTablet info={cartItem.length} text="items"/>
                    <InfoTablet
                        info={cartItem.reduce((acc: number, item: OrderItem) => acc + Number(item.price) * (item.qty || 0), 0)}
                        text="$ Amount"/>
                </div>
            </div>
            {!cartItem.length && <InfoCart link={"/"}/>}
            <div>
                {
                    cartItem.map((item: OrderItem, index: number) => (
                        <CartCard item={item} key={index}/>
                    ))
                }
            </div>
            {cartItem.length ? (
                <div className="flex justify-center mt-4">
                    <Link to="/shipping"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Buy Now
                    </Link>
                </div>
            ) : null}

        </div>
    )
}

export default CartScreen

