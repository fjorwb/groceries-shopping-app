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
// import deleteRecipe from '../services/deleteRecipe'

// const MenuAddRecipe = lazy( () => import( './MenuAddRecipe' ) )
// const RecipeView = lazy( () => import( './RecipeView' ) )

import RecipeView from './RecipeView'

function RecipesCard ( { recipeBook, urlRecipe } ) {

    const state = useSelector( ( state ) => state )
    const token = state.auth.user.accessToken
    const user_id = state.auth.user.id

    const [ extid, setExtid ] = useState( null )
    const [ recipe, setRecipe ] = useState()


    const url = useSelector( ( state ) => state.url.url )

    const [ isOpenView, openViewModal, closeViewModal ] = useModal( false )
    const [ isOpenMenu, openMenuModal, closeMenuModal ] = useModal( false )

    const handleViewRecipe = ( id ) => {
        setExtid( id.id )
        openViewModal()
    }

    const handleAddToMenu = ( recipe ) => {
        setRecipe( recipe )
        openMenuModal()
    }

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
                            <RecipeDet recipe={ recipe } fetchData={ fetchData } recipeBook={ recipeBook } handleViewRecipe={ handleViewRecipe } handleAddToMenu={ handleAddToMenu } />
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
                    // serves={recipe.recipe.servings}
                    user_id={ user_id }
                    url={ url }
                    token={ token }
                    closeMenuModal={ closeMenuModal }
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
