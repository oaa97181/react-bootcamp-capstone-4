import {createContext} from "react";

const CartContext = createContext({
    state: {
        products: [],
    },
    dispatch: () => {
    },
});

export default CartContext;
