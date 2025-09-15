const CheckoutSteps = ({step}: { step: string }) => {

    return (
        <div className="flex justify-between items-center mb-8 gap-4 mx-auto align-center">
            <div className="w-full  rounded-full h-2 mb-8 align-center">
                <div id="progress-bar"
                     className="bg-blue-600 h-2 rounded-full transition-all duration-300 "
                     style={{width: step === 'cart' ? '25%' : step === 'shipping' ? '50%' : step === 'payment' ? '75%' : step === 'confirm' ? '100%' : '0%'}}
                ></div>

            </div>

        </div>
    )
}

export default CheckoutSteps
