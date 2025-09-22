const PayMethod = ({paymentMethod, isPaid}:{paymentMethod:string,isPaid:boolean}  ) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment : </h2>
            <div className="text-gray-800">{paymentMethod}</div>
            {isPaid && <div className="text-green-500">paid</div>}
            {!isPaid && <div className="text-red-500">not paid</div>}
        </div>
    )
}

export default PayMethod