export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                products: state.products.concat(action.payload),
            };

        case "UPDATE_PRODUCT":
            let index = state.products.findIndex((product) =>
                product.singleProduct.sku === action.payload.singleProduct.sku)

            state.products[index].units = action.payload.NEWunits
            return {...state};

        case "REMOVE_FROM_CART":
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.singleProduct.sku !== action.payload.singleProduct.sku
                ),
            };

        case "CLEAR_CART":
            return {
                ...state,
                products: [],
            };

        default:
            return state;
    }
}