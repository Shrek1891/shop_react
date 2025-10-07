import Card from "../components/Card.tsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Loading from "../components/Loading.tsx";
import {useGetProductsQuery} from "../store/api.ts";
import {type Product, products} from "../resources.ts";
import Error from "../components/Error404.tsx";
import Paginate from "../components/Paginate.tsx";
import {useEffect, useState} from "react";

const HomeScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const keyword = query.get('keyword')
    const page = Number(query.get('page'))

    const {data: products, isLoading, error} = useGetProductsQuery(
        {
            keyword: keyword || '',
            page: page || 1,
        },
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

    if (products.products.length === 0) {
        return <div className="flex items-center justify-center h-full text-3xl font-bold">No products found</div>
    }
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <h1 className="text-3xl font-bold mb-8 text-center">List of products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {products.products.map((product: Product) => {
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
            <Paginate
                pages={products.pages}
                page={products.page}
                keyword={keyword || ''}
            />
        </div>
    )
}

export default HomeScreen