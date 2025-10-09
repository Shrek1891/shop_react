import ButtonQuantity from "./ui/buttonQuantity.tsx";
import {FaMinus, FaPlus} from "react-icons/fa";
import {MdDeleteSweep} from "react-icons/md";
import {addToCart, removeCart} from "../features/addCart.ts";
import type {OrderItem} from "../types.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

const CartCard = ({item}: { item: OrderItem }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state: RootState) => state.users)
    const changeHandle = (item: OrderItem, qty: number) => {
        const updatedItem = {
            ...item,
            qty,
        };
        dispatch(addToCart(updatedItem));
    };
    const handleClick = (item: OrderItem, action: "+" | "-") => {
        if (!item.qty) {
            item.qty = 1;
        }
        const qty = item.qty + (action === "+" ? 1 : -1);
        changeHandle(item, qty);
    };
    return (
        <div key={item.product} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between  aleign-center items-center">
                <div className="flex  space-x-3 align-center items-center">
                    <img src={item.image || 'https://via.placeholder.com/80'} alt="Product" className="w-20
                                    h-20 object-cover rounded"/>
                    <div className="w-64">
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                    </div>
                </div>
                <div className="flex justify-between font-medium">
                    <span>Price :</span>
                    <span> {" " + item.price} $</span>
                </div>
                {userLogin.user &&
                    <div className="flex justify-center align-center items-center">
                        <span className="text-gray-600">Quantity : </span>
                        <div className="flex items-center border rounded mx-2">
                            <ButtonQuantity
                                children={<FaPlus/>}
                                func={() => handleClick(item, "+")}
                                disabled={item.qty === item.countInStock}
                            />
                            <input
                                onChange={(e) => {
                                    const qty = parseInt(e.target.value);
                                    changeHandle(item, qty)
                                }}
                                type="number"
                                min="1"
                                max={item.countInStock}
                                value={item.qty || 1}
                                className="w-12 text-center border-x text-gray-500 cursor-pointer"
                            />
                            <ButtonQuantity
                                children={<FaMinus/>}
                                func={() => handleClick(item, "-")}
                                disabled={item.qty === 1}
                            />
                        </div>
                    </div>
                }
                < ButtonQuantity
                    children={<MdDeleteSweep/>}
                    func={() => dispatch(removeCart(item))}
                    disabled={item.qty === 0}
                />
            </div>
        </div>
    )
}

export default CartCard