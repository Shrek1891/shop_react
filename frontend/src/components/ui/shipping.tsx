import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";

const Shipping = ({isFull, isDelivered}: { isFull?: boolean, isDelivered?: boolean }) => {
    const shippingAddress = useSelector((state: RootState) => state.addCart.shippingAddress)
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (shippingAddress) {
        return (
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping : </h2>
                <span>{shippingAddress.address}</span> <span>{shippingAddress.city}</span>
                <span>{shippingAddress.zip}</span> <span>{shippingAddress.country}</span>
                <span>{shippingAddress.phone}</span>
                {isFull && (
                    <div className="flex flex-col gap-2">
                        <div>name : {user.name}</div>
                        <div>email : {user.email}</div>
                        {isDelivered ? <div className="text-green-500">delivered</div> :
                            <div className="text-red-500">not delivered</div>}
                    </div>
                )}

            </div>
        )
    }
}

export default Shipping

