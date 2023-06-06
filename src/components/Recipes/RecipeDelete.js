import React, { useState } from 'react'

import PropTypes from 'prop-types'

import deleteRecipe from '../../services/deleteRecipe'

export const RecipeDelete = ({ recipe, url, token, setRecipeBook, closeDeleteRecipeModal }) => {
  const [delRecipe, setDelRecipe] = useState(true)

  function deleteFromBook () {
    setDelRecipe(true)
    deleteRecipe({ url, token, id: recipe.recipe.idext, setRecipeBook })
    console.log('delete recipe')
    // setTimeout( () => {
    //     setDelRecipe( false )
    // }, 1000 )
    closeDeleteRecipeModal()
    // deleteRecipe( { url, token, id: recipe?.recipe.id } )
  }

  return (
    <div>
      <div>
        {delRecipe && (
          <div>
            <h3> recipe & ingredients of</h3>
            <h3>{recipe?.recipe.title}</h3>
            <h3>will be delete from recipe book</h3>
          </div>
        )}
        <button className='btn' onClick={deleteFromBook}>
          confirm
        </button>
        <button className='btn' onClick={closeDeleteRecipeModal}>
          cancel
        </button>
      </div>
      {/* <div>
                { dataRecipe?.idext ? <p>{ dataRecipe.message }</p> : null }
                { dataIngredient?.idext ? <p>{ dataIngredient.message }</p> : null }
            </div> */}
    </div>
  )
}

RecipeDelete.propTypes = {
  recipe: PropTypes.object,
  url: PropTypes.string,
  token: PropTypes.string,
  setRecipeBook: PropTypes.func,
  closeDeleteRecipeModal: PropTypes.func
}

export default RecipeDelete
