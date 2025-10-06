const SimpleBtn = ({
                       onClick = () => {
                       },
                       text = 'Button',
                       type = 'button'
                   }: { onClick: () => void, text: string, type: 'button' | 'submit' | 'reset' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer">
            {text}
        </button>
    )
}

export default SimpleBtn
