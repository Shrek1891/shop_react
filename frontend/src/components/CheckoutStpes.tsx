import {Link} from "react-router-dom";

const CheckoutSteps = ({step}: { step: string }) => {

    return (
        <div className="flex justify-between items-center mb-8 gap-4 mx-auto align-center gap-4">
            <div className="w-full  rounded-full h-2 mb-8 align-center gap-6">
                <div className="flex justify-between items-center">
                    <div className="w-1/4 h-2 rounded-full  flex items-center justify-center">
                        <Link to="/cart"
                              className={step === 'cart' ? 'text-blue-600 justify-center text-center' : 'text-gray-500'}>Cart</Link>
                    </div>
                    <div className="w-1/4 h-2 rounded-full flex items-center justify-center">
                        <Link to="/shipping"
                              className={step === 'shipping' ? 'text-blue-600 justify-center text-center' : 'text-gray-500'}>Shipping</Link>
                    </div>
                    <div className="w-1/4 h-2 rounded-full flex items-center justify-center">
                        <Link to="/payment"
                              className={step === 'payment' ? 'text-blue-600 justify-center text-center' : 'text-gray-500'}>Payment</Link>
                    </div>
                    <div className="w-1/4 h-2 rounded-full flex items-center justify-center">
                        <Link to="/confirm"
                              className={step === 'confirm' ? 'text-blue-600 justify-center text-center' : 'text-gray-500'}>Confirm</Link>
                    </div>
                </div>
                <div className="w-full h-2 rounded-full "></div>
                <div id="progress-bar"
                     className="bg-blue-600 h-2 rounded-full transition-all duration-300 "
                     style={{width: step === 'cart' ? '25%' : step === 'shipping' ? '50%' : step === 'payment' ? '75%' : step === 'confirm' ? '100%' : '0%'}}
                ></div>

            </div>

        </div>
    )
}

export default CheckoutSteps
