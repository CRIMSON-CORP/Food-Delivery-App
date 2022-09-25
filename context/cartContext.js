import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { childrenPropType } from "../utils/constants";
import data from "../utils/data";

const cartContext = createContext();

/**
 * @typedef CartItem
 * @property {number} id
 * @property {number} amount,
 * @property {number} price,
 * @property {number} calories,
 */

/**
 *
 * @returns {{
 *  cart: CartItem[],
 *  setCart: React.Dispatch<React.SetStateAction<never[]>>
 *  savedItems: [],
 *  setSavedItems: React.Dispatch<React.SetStateAction<never[]>>
 *  addToCart: (id:string)=>void
 * }}
 */
export function useCart() {
    return useContext(cartContext);
}

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [savedItems, setSavedItems] = useState([]);

    const addToCart = useCallback(
        (id) => {
            const foodInCart = cart.findIndex((food) => food.id === id);
            const foodAlreadyExist = foodInCart !== -1;

            if (foodAlreadyExist) {
                const updatedCart = cart.map((item) => {
                    if (item.id === id) {
                        item.amount = item.amount + 1;
                    }
                    return item;
                });
                setCart(updatedCart);
            } else {
                const food = data.foods.find((food) => food.id === id);
                const foodCartItem = {
                    id,
                    amount: 1,
                    price: food.price,
                    calories: food.calories,
                };
                setCart((prev) => [...prev, foodCartItem]);
            }
        },
        [cart]
    );

    const removeFromCart = useCallback(
        (id) => {
            const updatedCart = cart.map((item) => {
                if (item.id === id) {
                    item.amount = item.amount - 1;
                }
                return item;
            });

            setCart(updatedCart.filter((item) => item.amount !== 0));
        },
        [cart]
    );

    const contextValues = useMemo(
        () => ({
            cart,
            setCart,
            addToCart,
            savedItems,
            setSavedItems,
            removeFromCart,
        }),
        [cart, savedItems]
    );

    return <cartContext.Provider value={contextValues}>{children}</cartContext.Provider>;
}

CartProvider.propTypes = childrenPropType;

export default CartProvider;
