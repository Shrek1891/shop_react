const OrderSummary = ({itemsPrice, shippingPrice, taxPrice, totalPrice}: {
    itemsPrice: string,
    shippingPrice: string,
    taxPrice: string,
    totalPrice: number
}) => {
    return (
        <div className="flex flex-col gap-4 mb-4 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary : </h2>
            <div className="flex justify-between items-center">
                <span>Items : </span>
                <span>{itemsPrice} $</span>
            </div>
            <div className="flex justify-between items-center">
                <span>Shipping  :</span>
                <span> {shippingPrice} $</span>
            </div>
            <div className="flex justify-between items-center">
                <span>Tax  :</span>
                <span> {taxPrice} $</span>
            </div>
            <div className="flex justify-between items-center">
                <span>Total  :</span>
                <span> {totalPrice} $</span>
            </div>
        </div>
    )
}

export default OrderSummary

