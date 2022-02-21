const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.actualPrice + sum, 0)

const cart = (state = initialState, action) => {
    switch(action.type) {

        case 'ADD_ITEM_TO_CART':
            const currentItems = !state.items[action.payload.id] 
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload]

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                   items: currentItems,
                   totalPrice: getTotalPrice(currentItems),
                }   
            }
            
            const items = Object.values(newItems).map((obj) => obj.items)
            const allItems = [].concat.apply([], items)
            const totalPrice = getTotalPrice(allItems)

            return {
                ...state,
                items: newItems,
                totalCount: allItems.length,
                totalPrice, 
            } 

        case 'CLEAR_CART':

            return{
                ...state,
                items: {},
                totalPrice: 0,
                totalCount: 0
            }

        default:
            return state
    }
}

export default cart