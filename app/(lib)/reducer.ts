

export default function productReducer(state, action) {
    if (action.type === "added") {
        return [
            ...state,
            {
                product_id: action.product_id
            }
        ]
    }
}