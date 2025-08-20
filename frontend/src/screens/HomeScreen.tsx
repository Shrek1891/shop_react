import products from "../resources.ts";
import Card from "../components/Card.tsx";

const HomeScreen = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">List of products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {products.map((product) => {
                    return (
                        <div key={product._id}>
                            <a href={`/product/${product._id}`}>
                                <Card
                                    description={product.description}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                    rating={product.rating}
                                />
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomeScreen