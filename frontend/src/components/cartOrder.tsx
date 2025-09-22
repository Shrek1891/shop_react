import type {OrderItem} from "../types.ts";

const CartOrder = (item: OrderItem) => {
    return (
        <div key={item.product}
             className="flex justify-between items-center mb-4 gap-4 align-center border-b pb-4 w-full ">
            <img src={item.image} alt={item.name} className="w-20 h-20 flex-1"/>
            <span className="flex-1">{item.name}</span>
            <span className="flex-1">{item.price} $</span>
            <span className="flex-1">{item.qty}</span>
            <span className="flex-1">{item.qty ? item.qty * item.price : 0}</span>
        </div>
    )
}

export default CartOrder

