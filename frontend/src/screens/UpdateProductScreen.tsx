import {useNavigate, useParams} from "react-router-dom";
import {useGetProductQuery, useGetProductsQuery, useUpdateProductMutation} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {useEffect, useState} from "react";
import type {Product} from "../types.ts";

const UpdateProductScreen = () => {
    const {id} = useParams()
    const [product, setProduct] = useState<Product>()
    const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const {data, isLoading, error} = useGetProductQuery(id)
    const navigate = useNavigate()
    const {refetch} = useGetProductsQuery(user.token)
    useEffect(() => {
        if (!data) return;
        setProduct(data)
    }, [data]);
    if (isLoading || isUpdating) return <Loading/>


    return (
        <div className="container mx-auto h-screen flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-bold mb-2 text-center">Update Product</h1>
            {product ? <form
                className="flex flex-col gap-2 h-full mb-4"
                onSubmit={async (e) => {
                    e.preventDefault()
                    await updateProduct({id, product, token: user.token})
                    refetch()
                    navigate(`/products`)


                }}>
                <label htmlFor="name">Name</label>
                <input className="border border-gray-300 rounded px-2 py-1" type="text" value={product.name} id="name"
                       required
                       onChange={(e) => setProduct({...product, name: e.target.value})}/>
                <label htmlFor="price">Price</label>
                <input type="text" className="border border-gray-300 rounded px-2 py-1" value={product.price} id="price"
                       required
                       onChange={(e) => setProduct({...product, price: Number(e.target.value)})}/>
                <label htmlFor="category">Category</label>
                <input type="text" className="border border-gray-300 rounded px-2 py-1" value={product.category}
                       id="category" required
                       onChange={(e) => setProduct({...product, category: e.target.value})}/>
                <label htmlFor="brand">Brand</label>
                <input type="text" className="border border-gray-300 rounded px-2 py-1" value={product.brand} id="brand"
                       required
                       onChange={(e) => setProduct({...product, brand: e.target.value})}/>
                <label htmlFor="countInStock">Count In Stock</label>
                <input type="text" className="border border-gray-300 rounded px-2 py-1" value={product.countInStock}
                       id="countInStock" required
                       onChange={(e) => setProduct({...product, countInStock: Number(e.target.value)})}/>
                <label htmlFor="description">Description</label>
                <input type="text" className="border border-gray-300 rounded px-2 py-1" value={product.description}
                       id="description" required
                       onChange={(e) => setProduct({...product, description: e.target.value})}/>
                <label htmlFor="image">Image</label>
                <input type="file" className="border border-gray-300 rounded px-2 py-1" value={product.image} id="image"
                       required
                       onChange={(e) => setProduct({...product, image: e.target.value})}/>
                <div className="flex gap-2">
                    <button onClick={() => navigate(`/products`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-40 self-center mt-2 cursor-pointer hover:bg-blue-600">Back
                        to Products
                    </button>
                    <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded w-40 self-center mt-2 cursor-pointer hover:bg-blue-600">Update
                    </button>
                </div>

            </form> : <p>Loading...</p>}

        </div>
    )
}

export default UpdateProductScreen
