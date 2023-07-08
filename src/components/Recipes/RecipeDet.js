import React from 'react'

import PropTypes from 'prop-types'

import './RecipesCard.css'

export const RecipeDet = ({
  recipe,
  recipeBook,
  handleViewRecipe,
  handleAddToMenu,
  handleAddToBook,
  handleDeleteRecipe
}) => {
  // console.log(recipe)

  return (
    <article className='recipe-card'>
      <div className='recipe-img-container'>
        <img
          src={`${recipe.image}`}
          className='recipe-img'
          // alt={`${recipe.title}`}
          decoding='async'
        />
        <div className='recipe-title'>
          <h2>{recipe.title}</h2>
        </div>
      </div>
      {recipeBook === 'own book' ? (
        <h5 className='recipe-servings'>servings: {recipe.servings}</h5>
      ) : null}
      <div className='recipe-buttons'>
        {recipeBook === 'own book' ? (
          <div>
            <button className='recipe-btn' onClick={() => handleViewRecipe({ id: recipe.idext })}>
              view
            </button>
            <button className='recipe-btn' onClick={() => handleDeleteRecipe({ recipe })}>
              delete
            </button>
            <button className='recipe-btn' onClick={() => handleAddToMenu({ recipe })}>
              add to menu
            </button>
          </div>
        ) : (
          <div>
            <button
              className='recipe-btn ext-btn'
              onClick={() => handleViewRecipe({ id: recipe.id })}
            >
              view
            </button>
            <button className='recipe-btn ext-btn' onClick={() => handleAddToBook({ recipe })}>
              add to book
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

RecipeDet.propTypes = {
  recipe: PropTypes.object,
  recipeBook: PropTypes.string,
  handleViewRecipe: PropTypes.func,
  handleExtermalId: PropTypes.func,
  handleAddToMenu: PropTypes.func,
  handleAddToBook: PropTypes.func,
  handleDeleteRecipe: PropTypes.func,
  setRecipeBook: PropTypes.func,
  url: PropTypes.string,
  token: PropTypes.string
}

export default RecipeDet
