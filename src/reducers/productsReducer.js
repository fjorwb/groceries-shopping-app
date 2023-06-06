import { TO_GET_PRODUCTS } from '../types'

const initialState = {}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case TO_GET_PRODUCTS:
      return { ...state, products: action.payload }
    // case 'SET_SEARCH':
    //   return { ...state, search: action.payload }
    // case 'SET_IS_UPDATED':
    //   return { ...state, isUpdated: action.payload }
    default:
      return state
  }
}
