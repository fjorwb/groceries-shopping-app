import React from 'react'

import PropTypes from 'prop-types'

const RecipeViewIngredients = ({ ingredients }) => {
  return (
    ingredients?.map((ingredient, index) => {
      return (
                <div key={ index }>
                    <h4>
                        { ingredient.ingredient } / { ingredient.unit } / { ingredient.amount }
                    </h4>
                </div>
      )
    }))
}

RecipeViewIngredients.propTypes = {
  ingredients: PropTypes.array
}

export default RecipeViewIngredients
