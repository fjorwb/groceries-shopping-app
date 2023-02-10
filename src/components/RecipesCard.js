import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'

import { useFetch } from '../customHooks/useFetch'

import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

import Loader from './Loader'

import './RecipesCard.css'

import RecipeDetails from './RecipeDetails'
import deleteRecipe from '../services/deleteRecipe'

const MenuAddRecipe = lazy( () => import( './MenuAddRecipe' ) )
const RecipeView = lazy( () => import( './RecipeView' ) )

function RecipesCard () {
  const state = useSelector( ( state ) => state )

  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id

  const url = state.url.url

  const [ recipeName, setRecipeName ] = useState( '' )
  const [ cuisine, setCuisine ] = useState( '' )
  const [ form, setForm ] = useState( '' )
  const [ recipesBook, setRecipesBook ] = useState( 'external book' )
  const [ extid, setExtid ] = useState( null )
  const [ recipe, setRecipe ] = useState()
  const [ urlRecipe, setRecipeUrl ] = useState( 'recipes' )

  const [ isOpen, openModal, closeModal ] = useModal( false )
  const [ isOpenMenu, openMenuModal, closeMenuModal ] = useModal( false )
  const [ isOpenView, openViewModal, closeViewModal ] = useModal( false )

  const handleChange = ( e ) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm( {
      ...form,
      [ name ]: value
    } )
  }

  const handleSearch = ( e ) => {
    e.preventDefault()
    setRecipeName( form.recipeName )
    setCuisine( form.cuisine )
    setRecipesBook( form.recipesBook )
    setForm( {
      recipeName: '',
      cuisine: '',
      recipesBook: 'own book'
    } )
  }

  const handleExtermalId = ( id ) => {
    setExtid( id )
    openModal()
  }

  const handleViewRecipe = ( e, id ) => {
    e.preventDefault()
    setExtid( id.id )
    openViewModal()
  }

  const handleAddToMenu = ( recipe ) => {
    setRecipe( recipe )
    openMenuModal()
  }

  useEffect( () => {
    if ( recipesBook === 'own book' ) {
      // url = `recipes`
      setRecipeUrl( 'recipes' )
    } else if ( recipesBook === 'external book' ) {
      switch ( recipeName && cuisine ) {
        case recipeName && cuisine:
          // url = `recipes/recipes?recipe=${recipeName}&cuisine=${cuisine}`
          setRecipeUrl( `recipes/recipes?recipe=${ recipeName }&cuisine=${ cuisine }` )
          break
        case recipeName:
          // url = `recipes/recipes?recipe=${recipeName}`
          setRecipeUrl( `recipes/recipes?recipe=${ recipeName }` )
          break
        case cuisine:
          // url = `recipes/recipes?cuisine=${cuisine}`
          setRecipeUrl( `recipes/recipes?cuisine=${ cuisine }` )
          break
        default:
          // url = `recipes/${user_id}`
          setRecipeUrl( `recipes/${ user_id }` )
          break
      }
    }
  }, [ url, recipesBook, recipeName, cuisine, user_id ] )

  const urlX = `${ url }${ urlRecipe }`

  const { fetchData, loading } = useFetch( urlX, token )

  return (
    <div>
      <section>
        <form onSubmit={ handleSearch } className='recipe-form'>
          <select
            className='recipe-select'
            name='recipesBook'
            id='recipesBook'
            onChange={ handleChange }
            value={ form.recipesBook }
            autoComplete='off'
            defaultValue='own book'
          >
            <option value='own book'>own book</option>
            <option value='external book'>external book</option>
          </select>
          <input
            className='recipe-input'
            type='text'
            name='recipeName'
            value={ form.recipeName }
            onChange={ handleChange }
            placeholder='ingredients or recipe name'
            autoComplete='on'
          />
          <input
            className='recipe-input'
            type='text'
            name='cuisine'
            value={ form.cuisine }
            onChange={ handleChange }
            placeholder='cuisine'
            autoComplete='on'
          />
          <button className='recipe-btn' onClick={ handleSearch }>
            search
          </button>
        </form>
        <div>{ loading && <Loader /> }</div>
        <div className='recipe-container'>
          { fetchData?.length === 0 ? (
            <h1 className='recipe-message'>no recipes found</h1>
          ) : (
            fetchData?.map( ( recipe ) => {
              return (
                <article className='recipe-card' key={ recipe.id }>
                  <div className='recipe-img-container'>
                    <img src={ `${ recipe.image }` } className='recipe-img' alt={ recipe.title } />
                    <div>
                      <h2 className='recipe-title'>{ recipe.title }</h2>
                      { recipesBook === 'own book' ? (
                        <h4 className='recipe-servings'>servings: { recipe.servings }</h4>
                      ) : null }
                    </div>
                  </div>
                  <div className='recipe-buttons'>
                    { recipesBook === 'own book' ? (
                      <button
                        className='recipe-btn'
                        onClick={ ( e ) => handleViewRecipe( e, { id: recipe.idext } ) }
                      >
                        view
                      </button>
                    ) : (
                      <button
                        className='recipe-btn ext-btn'
                        onClick={ () => handleExtermalId( { id: recipe.id } ) }
                      >
                        view
                      </button>
                    ) }

                    { recipesBook === 'own book' ? (
                      <button
                        className='recipe-btn'
                        onClick={ () => deleteRecipe( { id: recipe.id, url, token, setRecipesBook } ) }
                      >
                        delete
                      </button>
                    ) : null }
                    { recipesBook === 'own book' ? (
                      <button className='recipe-btn' onClick={ () => handleAddToMenu( { recipe } ) }>
                        add to menu
                      </button>
                    ) : null }
                  </div>
                </article>
              )
            } )
          ) }
        </div>
      </section>

      { extid !== null ? (
        <Modal isOpen={ isOpen } closeModal={ closeModal }>
          <RecipeDetails extid={ extid } url={ url } user_id={ user_id } token={ token } closeModal={ closeModal } />
        </Modal>
      ) : null }

      <Modal isOpen={ isOpenMenu } closeModal={ closeMenuModal }>
        <Suspense>
          <MenuAddRecipe
            recipe={ recipe }
            // serves={recipe.recipe.servings}
            user_id={ user_id }
            url={ url }
            token={ token }
            closeMenuModal={ closeMenuModal }
          />
        </Suspense>
      </Modal>
      { extid !== null ? (
        <Modal isOpen={ isOpenView } closeModal={ closeViewModal }>
          <Suspense>
            <RecipeView
              id={ extid }
              user_id={ user_id }
              url={ url }
              token={ token }
              closeViewModal={ closeViewModal }
            />
          </Suspense>
        </Modal>
      ) : null }
    </div>
  )
}

export default RecipesCard
