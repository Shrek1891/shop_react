import CheckoutSteps from "../components/CheckoutStpes.tsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {useState} from "react";
import {savePaymentMethod} from "../features/addCart.ts";

const PaymentScreen = () => {
    const navigate = useNavigate()
    const shippingAddress = useSelector((state: RootState) => state.addCart.shippingAddress)
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/confirm')
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl h-screen">
            <CheckoutSteps step="payment"/>
            <div className="w-full max-w-3xl mx-auto p-8 h-full">
                <div className="bg-white  p-8 rounded-lg shadow-md border ">
                    <h1 className="text-2xl font-bold text-gray-800  mb-4">Payment</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700  mb-2">Select Method</h2>
                        <div className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label>PayPal</label>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="MasterCard"
                                checked={paymentMethod === 'MasterCard'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label>MasterCard</label>
                        </div>

                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 ">
                            next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentScreen