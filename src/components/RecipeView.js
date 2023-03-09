import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import Loader from './Loader'

import getRecipe from '../services/getRecipe'
// import useFetch from '../customHooks/useFetch'

import './RecipeView.css'

const RecipeView = ( { id, url, token, closeViewModal } ) => {

  const [ recipe, setRecipe ] = useState( {} )
  const [ ingredients, setIngredients ] = useState( [] )
  const [ loading, setLoading ] = useState( false )

  useEffect( () => {
    setLoading( true )
    getRecipe( { id, url, token, setRecipe } )
    setIngredients( recipe.ingredients )
    setLoading( false )
  }, [ id ] )

  const handleCloseView = () => {

    closeViewModal()
  }

  return (
    <>
      { loading && <Loader /> }
      <div className='recipe-view-container'>
        <h2 className='recipe-view-title'>
          { recipe?.title }
        </h2>
        <div className='recipe-view-subcontainer'>
          <div className='recipe-view-img-container'>
            <img
              src={ `${ recipe.image }` }
              alt='recipe image'
              loading='lazy'
              width={ 300 }
              height={ 300 }
              className='recipe-view-img'
            />
          </div>
          <div className='recipe-view-ingredients'>
            <h4 style={ { textDecoration: 'underline', marginBottom: '.5rem' } }>ingredients:</h4>
            { ingredients?.map( ( ingredient, index ) => {
              return (
                <div key={ index }>
                  <h4>
                    { ingredient.ingredient } / { ingredient.unit } / { ingredient.amount }
                  </h4>
                </div>
              )
            } ) }
            <h3 className='recipe-servings'>servings: { recipe?.servings }</h3>
          </div>
        </div>
        <div className='recipe-view-instructions'>
          <h5>instructions:</h5>
          <h5>{ recipe?.instructions }</h5>
        </div>
        <button className='recipe-view-btn btn' onClick={ handleCloseView }>
          close view
        </button>
      </div>
    </>
  )
}

RecipeView.propTypes = {
  id: PropTypes.number,
  user_id: PropTypes.number,
  url: PropTypes.string,
  token: PropTypes.string,
  closeViewModal: PropTypes.func,
  loading: PropTypes.bool
}

export default RecipeView
