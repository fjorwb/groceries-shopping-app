import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { useFetch } from '../customHooks/useFetch'

import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

import Loader from './Loader'

import './RecipesCard.css'

// import RecipeDetails from './RecipeDetails'
import RecipeDet from './RecipeDet'
import MenuAddRecipe from './MenuAddRecipe'
import RecipeAdd from './RecipeAdd'

// import deleteRecipe from '../services/deleteRecipe'

// const MenuAddRecipe = lazy( () => import( './MenuAddRecipe' ) )
// const RecipeView = lazy( () => import( './RecipeView' ) )

import RecipeView from './RecipeView'
import { RecipeDelete } from './RecipeDelete'

function RecipesCard ( { recipeBook, urlRecipe, setRecipeBook } ) {

    const state = useSelector( ( state ) => state )
    const token = state.auth.user.accessToken
    const user_id = state.auth.user.id

    const [ extid, setExtid ] = useState( null )
    const [ recipe, setRecipe ] = useState( null )

    const url = useSelector( ( state ) => state.url.url )

    const [ isOpenView, openViewModal, closeViewModal ] = useModal( false )
    const [ isOpenMenu, openMenuModal, closeMenuModal ] = useModal( false )
    const [ isOpenAddRecipe, openAddRecipeModal, closeAddRecipeModal ] = useModal( false )
    const [ isOpenDeleteRecipe, openDeleteRecipeModal, closeDeleteRecipeModal ] = useModal( false )

    const handleViewRecipe = ( id ) => {
        setExtid( id.id )
        openViewModal()
    }

    const handleAddToMenu = ( recipe ) => {
        setRecipe( recipe )
        openMenuModal()
    }

    const handleAddToBook = ( recipe ) => {
        setRecipe( recipe )
        openAddRecipeModal()

    }

    const handleDeleteRecipe = ( recipe ) => {
        setRecipe( recipe )
        // deleteRecipe( { id: id.id, url, token } )
        openDeleteRecipeModal()
        setRecipeBook( 'own book' )
    }


    // console.log( fetchData )
    const { fetchData, loading, error } = useFetch( urlRecipe, token )


    return (
        <section>

            { error && <h1 style={ { background: 'red', color: 'yellow', fontSize: '3rem' } }>{ error.message }</h1> }
            { loading && <Loader /> }

            <div className="recipe-container">
                { fetchData?.length === 0 ? (
                    <h1 className='recipe-message'>no recipes found</h1>
                ) : (
                    fetchData?.map( ( recipe ) => (
                        <div key={ recipe.id } >
                            <RecipeDet recipe={ recipe } fetchData={ fetchData } recipeBook={ recipeBook } handleViewRecipe={ handleViewRecipe } handleAddToMenu={ handleAddToMenu } handleAddToBook={ handleAddToBook } handleDeleteRecipe={ handleDeleteRecipe } setRecipeBook={ setRecipeBook } url={ url } token={ token } />
                        </div>
                    ) )
                ) }
            </div>

            <Modal isOpen={ isOpenView } closeModal={ closeViewModal }>
                <RecipeView
                    id={ extid }
                    user_id={ user_id }
                    url={ url }
                    token={ token }
                    closeViewModal={ closeViewModal }
                />
            </Modal>

            { <Modal isOpen={ isOpenMenu } closeModal={ closeMenuModal }>
                <MenuAddRecipe
                    recipe={ recipe }
                    // serves={ recipe?.recipe.servings }
                    user_id={ user_id }
                    url={ url }
                    token={ token }
                    closeMenuModal={ closeMenuModal }
                />
            </Modal> }

            { <Modal isOpen={ isOpenAddRecipe } closeModal={ closeAddRecipeModal }>
                <RecipeAdd
                    recipe={ recipe }
                    user_id={ user_id }
                    url={ url }
                    token={ token }
                    closeAddRecipeModal={ closeAddRecipeModal }
                    setRecipe={ setRecipe }
                />
            </Modal> }

            { <Modal isOpen={ isOpenDeleteRecipe } closeModal={ closeDeleteRecipeModal }>
                <RecipeDelete
                    recipe={ recipe }
                    url={ url }
                    token={ token }
                    setRecipeBook={ setRecipeBook }
                    closeDeleteRecipeModal={ closeDeleteRecipeModal }
                />
            </Modal> }




        </section >
    )

}

RecipesCard.propTypes = {
    urlRecipe: PropTypes.string.isRequired,
    recipeBook: PropTypes.string.isRequired,
    setRecipeBook: PropTypes.func.isRequired,
    // extid: PropTypes.number,
    // setExtid: PropTypes.func.isRequired
}

export default RecipesCard
