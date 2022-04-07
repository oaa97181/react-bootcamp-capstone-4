import {add, clear, remove, update} from "./actionTypes";

export const CartReducer = (state, action) => {
    switch (action.type) {
        case add:
            return {
                ...state,
                products: state.products.concat(action.payload),
            };

        case update:
            let index = state.products.findIndex((product) =>
                product.singleProduct.sku === action.payload.singleProduct.sku)

            state.products[index].units = action.payload.NEWunits
            return {...state};

        case remove:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.singleProduct.sku !== action.payload.singleProduct.sku
                ),
            };

        case clear:
            return {
                ...state,
                products: [],
            };

        default:
            return state;
    }
}