import { searchRecipe } from '../types'

const searchRecipeInitialState = {
  recipes: ''
}

export default function searchRecipeReducer (state = searchRecipeInitialState, action) {
  if (action.type === searchRecipe) {
    return {
      ...state,
      recipes: action.payload
    }
  }
}
