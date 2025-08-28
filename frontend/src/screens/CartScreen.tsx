import type {RootState} from "../store/store.ts";
import {useSelector} from "react-redux";


const CartScreen = () => {
    const {cartItems} = useSelector((state: RootState) => state.addCart)
    return (
        <div>CartScreen {cartItems.length} {cartItems.map((item) => item.name + " " + item.qty + " ").join(", ")} </div>
    )
}

export default CartScreen

