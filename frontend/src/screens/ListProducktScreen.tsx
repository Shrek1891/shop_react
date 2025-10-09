import {FaEdit, FaTrashAlt} from "react-icons/fa";
import SimpleBtn from "../components/ui/simpleBtn.tsx";
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
} from "../store/api.ts";
import Loading from "../components/Loading.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {saveUsersList} from "../features/addCart.ts";
import Paginate from "../components/Paginate.tsx";
import Table from "../components/Table.tsx";
import type {Product} from "../types.ts";

const ListProductScreen = () => {
    const [user, _] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const navigate = useNavigate()
    const query = new URLSearchParams(location.search)
    const keyword = query.get('keyword')
    const page = Number(query.get('page'))
    const {data, isLoading, refetch} = useGetProductsQuery(
        {
            keyword: keyword || '',
            page: page || 1,
        },
        {
            refetchOnMountOrArgChange: true
        }
    )
    const [deleteUser, {isLoading: isDeleting}] = useDeleteProductMutation()
    const [createProduct, {isLoading: isCreating}] = useCreateProductMutation()
    const [productsList, setProductsList] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (!data) return;
        setProductsList(data.products)
    }, [data]);
    const deleteHandler = async (id: string) => {
        if (!user.is_admin) {
            navigate('/login')
            return;
        }
        try {
            await deleteUser({id, token: user.token})
            setProductsList(productsList.filter((user: any) => user.id !== id))
            dispatch(saveUsersList(productsList.filter((user: any) => user.id !== id)))
            refetch()
        } catch (error) {
            console.log(error)
        }
    }
    if (isLoading || isDeleting || isCreating) {
        return <Loading/>
    }
    const head = ['ID', 'Name', 'Price', 'Category', 'Brand', 'Action']
    const body = productsList.map((product: Product) => {
        return {
            _id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            brand: product.brand,
            action: (
                <div className="flex gap-2 items-center justify-between">
                    <Link
                        className="text-blue-500 hover:text-blue-600"
                        to={`/product/${product._id}/update`}
                    >
                        <FaEdit/>
                    </Link>
                    <button
                        onClick={async () => await deleteHandler(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        <FaTrashAlt/>
                    </button>
                </div>
            )
        }
    })
    return (
        <div className="container mx-auto h-[calc(100vh-5rem)]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Products List</h1>
                <SimpleBtn
                    type="button"
                    text="Add Product"
                    onClick={async () => {
                        const data = await createProduct({token: user.token})
                        navigate(`/product/${data.data._id}/update`)
                    }}
                />
            </div>
            <div className="gap-6 flex flex-col">
                <Table
                    head={head}
                    body={body}

                />
                {data && <Paginate
                    pages={data.pages}
                    page={data.page}
                    keyword={keyword || ''}
                    isAdmin={true}
                />}
            </div>
        </div>
    )
}
export default ListProductScreen
