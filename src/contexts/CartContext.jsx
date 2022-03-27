import {reducer} from "./reducer"
import PropTypes from "prop-types";
import {createContext, useReducer} from "react";

export const CartContext = createContext({
    state: null,
    dispatch: () => null,
});

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {page: 'home'})

    return (
        <CartContext.Provider value={[state, dispatch]}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.array,
};