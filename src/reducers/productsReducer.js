import { TO_GET_PRODUCTS } from '../types'

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case TO_GET_PRODUCTS: {
      return { ...state, products: action.payload }
    }
    // case 'SET_SEARCH':
    //   return { ...state, search: action.payload }
    // case 'SET_IS_UPDATED':
    //   return { ...state, isUpdated: action.payload }

    default:
      return state
  }
}
