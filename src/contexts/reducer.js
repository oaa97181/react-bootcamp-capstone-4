export const reducer = (state, action) => {
    switch (action.type) {
        case "home":
            return {
                ...state,
                page: 'home',
            }

        case "productList":
            return {
                ...state,
                page: 'productList',
            }

        default:
            return state
    }
}

export const initialState = {
    page: 'home',
}