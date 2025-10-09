import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import {saveShippingAddress} from "../features/addCart.ts";
import CheckoutSteps from "../components/CheckoutStpes.tsx";

const ShippingScreen = () => {
    const navigate = useNavigate()
    const shippingAddress = useSelector((state: RootState) => state.addCart.shippingAddress)
    const [name, setName] = useState(shippingAddress && shippingAddress.name ? shippingAddress.name : '')
    const [lastName, setLastName] = useState(shippingAddress && shippingAddress.lastName ? shippingAddress.lastName : '')
    const [address, setAddress] = useState(shippingAddress && shippingAddress.address ? shippingAddress.address : '')
    const [city, setCity] = useState(shippingAddress && shippingAddress.city ? shippingAddress.city : '')
    const [state, setState] = useState(shippingAddress && shippingAddress.state ? shippingAddress.state : '')
    const [zip, setZip] = useState(shippingAddress && shippingAddress.zip ? shippingAddress.zip : '')
    const dispatch = useDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(saveShippingAddress({name, lastName, address, city, state, zip}))
        navigate('/payment')
    }
    return (
        <div className=" h-screen ">
            <CheckoutSteps step="shipping"/>
            <div className="w-full max-w-3xl mx-auto p-8 h-full">
                <div className="bg-white  p-8 rounded-lg shadow-md border ">
                    <h1 className="text-2xl font-bold text-gray-800  mb-4">Checkout</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700  mb-2">Shipping Address</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-gray-700  mb-1">First
                                    Name</label>
                                <input type="text" id="first_name"
                                       className="w-full rounded-lg border py-2 px-3"
                                       onChange={(e) => setName(e.target.value)}
                                       value={name}
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-gray-700  mb-1">Last
                                    Name</label>
                                <input type="text" id="last_name"
                                       className="w-full rounded-lg border py-2 px-3 "
                                       onChange={(e) => setLastName(e.target.value)}
                                       value={lastName}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="address"
                                   className="block text-gray-700  mb-1">Address</label>
                            <input type="text" id="address"
                                   className="w-full rounded-lg border py-2 px-3  "
                                   onChange={(e) => setAddress(e.target.value)}
                                   value={address}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="city" className="block text-gray-700  mb-1">City</label>
                            <input type="text" id="city"
                                   className="w-full rounded-lg border py-2 px-3   "
                                   onChange={(e) => setCity(e.target.value)}
                                   value={city}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor="state"
                                       className="block text-gray-700  mb-1">State</label>
                                <input type="text" id="state"
                                       className="w-full rounded-lg border py-2 px-3  "
                                       onChange={(e) => setState(e.target.value)}
                                       value={state}
                                />
                            </div>
                            <div>
                                <label htmlFor="zip" className="block text-gray-700  mb-1">ZIP
                                    Code</label>
                                <input type="text" id="zip"
                                       className="w-full rounded-lg border py-2 px-3 "
                                       onChange={(e) => setZip(e.target.value)}
                                       value={zip}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 ">Place
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingScreen
