import {useGetTopProductsQuery} from "../store/api.ts";
import {Carousel, Image} from "react-bootstrap";
import Loading from "./Loading.tsx";
import Error from "./Error404.tsx";
import type {Product} from "../types.ts";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "./Card.tsx";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";

const ProductCarousel = () => {
    const {data, isLoading, error} = useGetTopProductsQuery({
        refetchOnMountOrArgChange: true,
    })
    const [topProducts, setProducts] = useState<Product[]>([])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data) {
            setProducts(data)
        }
    }, [data])

    if (isLoading) return <Loading/>
    if (error) return <Error/>


    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === topProducts.length - 1 ? 0 : prevIndex + 1));
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? topProducts.length - 1 : prevIndex - 1));
    };
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);
    return (
        <div className="flex flex-col gap-8 bg-gray-100 border-2 border-gray-200 container">
            <div className="flex transition-transform duration-500 ease-in-out overflow-hidden">
                {topProducts && topProducts.map((item, index) => (
                    <Link to={`/product/${item._id}`} key={index}
                          className={index === currentIndex ? 'w-[100vw] h-[100%]' : 'w-0 h-0'}>
                        <Card
                            key={index}
                            description={item.description}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            category={item.category}
                            rating={item.rating}
                        />
                    </Link>
                ))}
            </div>
            <div className="flex justify-center gap-4 my-4">
                <button className="carousel-button prev hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" onClick={goToPrevious}><FaArrowAltCircleLeft/></button>
                <button className="carousel-button next hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" onClick={goToNext}><FaArrowAltCircleRight/></button>
            </div>

        </div>
    );
}

export default ProductCarousel;