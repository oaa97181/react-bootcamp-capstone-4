export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
          console.log('inside', state,action)
            return {
                ...state,
                products: state.products.concat(action.payload),
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload.id
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