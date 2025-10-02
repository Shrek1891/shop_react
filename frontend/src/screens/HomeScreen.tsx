import Card from "../components/Card.tsx";
import {Link} from "react-router-dom";
import Loading from "../components/Loading.tsx";
import {useGetProductsQuery} from "../store/api.ts";
import type {Product} from "../resources.ts";
import Error from "../components/Error404.tsx";

const HomeScreen = () => {
    const {data: products, isLoading, error} = useGetProductsQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    if (!products || isLoading) {
        return <Loading/>
    }
    if (error) {
        return <Error/>
    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-8 text-center">List of products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {products.map((product: Product) => {
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