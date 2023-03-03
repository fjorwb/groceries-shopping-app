import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import Loader from './Loader'

import getRecipe from '../services/getRecipe'
// import useFetch from '../customHooks/useFetch'

const RecipeView = ( { id, url, token, closeViewModal } ) => {
  const extid = 582897

  const [ recipe, setRecipe ] = useState( {} )
  const [ ingredients, setIngredients ] = useState( [] )
  const [ loading, setLoading ] = useState( false )

  useEffect( () => {
    setLoading( true )
    getRecipe( { id: extid, url, token, setRecipe } )
    setIngredients( recipe?.ingredients )
    setLoading( false )
  }, [ id, url, token ] )

  const handleCloseView = () => {
    closeViewModal()
  }

  return (
    <div>
      <div>{ loading && <Loader /> }</div>
      <div>
        <div>
          <h2 style={ { marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1rem' } }>
            { recipe?.title }
          </h2>
          <div className='recipe-cont'>
            <img
              src={ `${ recipe?.image }` }
              alt='recipe image'
              style={ {
                width: '300px',
                height: '200px',
                borderRadius: '15px'
              } }
            />
            <div className='recipe-ingredients'>
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
          <div className='recipe-other'>
            <h5>instructions:</h5>
            <h5>{ recipe?.instructions }</h5>
          </div>
        </div>
        <button className='recipe-btn' onClick={ handleCloseView }>
          close view
        </button>
      </div>
    </div>
  )
}

RecipeView.propTypes = {
  id: PropTypes.number,
  user_id: PropTypes.number,
  url: PropTypes.string,
  token: PropTypes.string,
  closeViewModal: PropTypes.func
  //   loading: PropTypes.bool
}

export default RecipeView
