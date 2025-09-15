const ButtonQuantity = ({children, func, disabled = false}: {
    children: React.ReactNode,
    func: () => void,
    disabled: boolean
}) => {
    return (
        <button
            className="px-2 py-1 text-gray-500 cursor-pointer"
            disabled={disabled}
            onClick={() => func()}
        >
            {children}
        </button>
    )
}

export default ButtonQuantity