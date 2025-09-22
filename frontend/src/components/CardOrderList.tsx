import type {OrderItem} from "../types.ts";
import CartOrder from "./cartOrder.tsx";

const CardOrderList = ({cartItems}: {cartItems: OrderItem[]}) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Items : </h2>
            <div className="flex flex-col gap-4">
                {cartItems.length === 0 ? <div>Cart is empty</div> : (
                    cartItems.map((item: OrderItem) => (
                            CartOrder(item)
                        )
                    ))}
            </div>
        </div>)
}

export default CardOrderList