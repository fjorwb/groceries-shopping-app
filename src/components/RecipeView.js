import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import Loader from './Loader'

import RecipeImage from './RecipeImage'
import RecipeViewIngredients from './RecipeViewIngredients'

import getRecipe from '../services/getRecipe'
// import useFetch from '../customHooks/useFetch'

import './RecipeView.css'

import placeholderImage from '../images/emptyImg.jpg'

const RecipeView = ( { id, url, token, closeViewModal } ) => {

  const [ recipe, setRecipe ] = useState( { image: placeholderImage } )
  // const [ ingredients, setIngredients ] = useState( [] )
  const [ loading, setLoading ] = useState( false )

  useEffect( () => {
    setLoading( true )
    getRecipe( { id, url, token, setRecipe } )
    // setRecipe( {} )
    setTimeout( () => {
      setLoading( false )
    }, 1000 )
  }, [ id ] )

  const handleCloseView = () => {
    closeViewModal()
  }

  const separateInstructions = ( text ) => {
    // const re = /(\d+)\.+(\D+)/

    let arr = []

    text.replaceAll( '.)', '). ' ).replaceAll( ( 'Instructions' || 'instructions' ), '' ).split( '.' ).map( ( word ) => { arr.push( word ) } )

    // arr.forEach( ( word ) => console.log( word ) )

    return arr.filter( ( word ) => word !== 'Instructions' )
  }

  const text = separateInstructions( recipe.instructions || '' )


  return (
    <section>
      <div className='recipe-view-container'>
        <h2 className='recipe-view-title'>
          { recipe?.title }
        </h2>
        <div className='recipe-view-subcontainer'>
          <div className='recipe-view-img-container'>
            { loading ? <Loader /> : <RecipeImage image={ recipe.image } /> }
          </div>
          <div className='recipe-view-ingredients'>
            <h4 style={ { textDecoration: 'underline', marginBottom: '.5rem' } }>ingredients:</h4>
            <RecipeViewIngredients ingredients={ recipe?.ingredients } />
            <h3 className='recipe-servings'>servings: { recipe?.servings }</h3>
          </div>
        </div>
        <div className='recipe-view-instructions-container'>
          <h5>instructions:</h5>
          <ul>
            { text[ 0 ] === '' && <li style={ { color: 'red', fontStyle: 'italic', margin: '1rem 0' } } >no instructions available</li> || '' }
            { text.map( ( word, index ) => {
              return (
                <div key={ index }>
                  <li className='recipe-view-instructions'>{ ( word !== '' ) ? `${ word.trim() }.` : '' }</li>
                </div>
              )
            }
            ) }
          </ul>
        </div>
        <button className='recipe-view-btn btn' onClick={ handleCloseView }>
          close view
        </button>
      </div>
    </section>
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
