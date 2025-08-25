import Card from "../components/Card.tsx";
import {Link} from "react-router-dom";
import {type Product,} from "../resources.ts";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";

const HomeScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/products/");
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);
    if (!products.length) {
        return <Loading/>
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">List of products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {products.map((product) => {
                    return (
                        <div key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Card
                                    description={product.description}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                    rating={product.rating}
                                />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomeScreen