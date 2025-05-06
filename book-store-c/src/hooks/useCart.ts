import { useEffect, useState } from "react"
import { Cart } from "../models/cart.model"
import { deleteCart, fetchCart } from "../api/cart.api";

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const deleteCartItem = (id: number) => {
        deleteCart(id).then(() => {
            setCarts(carts.filter((cart) => cart.id !== id));
        })
    }

    useEffect(() => {
        fetchCart().then((carts)=> {
            setCarts(carts);
            setIsEmpty(carts.length === 0);
        })
    }, []);

    return {carts, isEmpty, deleteCartItem};
}