const infoTablet = ({info, text}: { info: number, text: string }) => {
    return (
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center">
            <span x-text="cartItems.length"> {info}</span>
            <span className="hidden sm:inline ml-1">{text}</span>
        </div>
    )
}

export default infoTablet;