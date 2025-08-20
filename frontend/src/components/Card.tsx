import Rating from "./Rating.tsx";

type CardProps = {
    description: string
    name: string
    price: number
    image: string
    category: string
    rating: number
}

const Card = ({description, name, price, image, category, rating}: CardProps) => {
    return (
        <div
            className="testimonial-card relative rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 glow-effect h-full">
            <div className="absolute top-4 left-4 quote-mark">"</div>
            <div className="p-8 pt-16">
                <div className="flex mb-6 star-rating items-center gap-2">
                    <Rating startRating={rating}/>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                    {description}
                </p>
                <div className="flex items-center">
                    <div className="relative">
                        <img
                            src={image}
                            alt={name}
                            className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"/>
                    </div>
                    <div className="ml-4">
                        <h4 className="font-semibold text-gray-900">{name}</h4>
                        <p className="text-sm text-gray-500">{price}</p>
                    </div>
                </div>
                <div
                    className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {category}
                </div>
            </div>
        </div>

    )
}

export default Card