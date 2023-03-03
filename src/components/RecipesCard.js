import React from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'


import { useFetch } from '../customHooks/useFetch'

// import { Modal } from './Modal'
// import { useModal } from '../customHooks/useModal'

import Loader from './Loader'

import './RecipesCard.css'

// import RecipeDetails from './RecipeDetails'
// import deleteRecipe from '../services/deleteRecipe'

// const MenuAddRecipe = lazy( () => import( './MenuAddRecipe' ) )
// const RecipeView = lazy( () => import( './RecipeView' ) )

function RecipesCard ( { extid, recipeBook, urlRecipe } ) {

    console.log( extid )

    // const [ extid, setExtid ] = useState( null )
    // const [ recipe, setRecipe ] = useState()

    const state = useSelector( ( state ) => state )
    const token = state.auth.user.accessToken
    // const user_id = state.auth.user.id

    // const [ isOpen, openModal, closeModal ] = useModal( false )
    // const [ isOpenMenu, openMenuModal, closeMenuModal ] = useModal( false )
    // const [ isOpenView, openViewModal, closeViewModal ] = useModal( false )

    // const handleViewRecipe = ( e, id ) => {
    //     e.preventDefault()
    //     setExtid( id.id )
    //     openViewModal()
    // }

    // const handleExtermalId = ( id ) => {
    //     setExtid( id )
    //     openModal()
    // }

    // const handleAddToMenu = ( recipe ) => {
    //     setRecipe( recipe )
    //     openMenuModal()
    // }

    const { fetchData, loading, error } = useFetch( urlRecipe, token )

    return (
        <section>

            { error && <h1 style={ { background: 'red', color: 'yellow', fontSize: '3rem' } }>{ error.message }</h1> }
            { loading && <Loader /> }

            {
                <div className="recipe-container">

                    { fetchData?.length === 0 ? (
                        <h1 className='recipe-message'>no recipes found</h1>
                    ) : (
                        fetchData?.map( ( recipe ) => {
                            return (
                                <article className='recipe-card' key={ recipe.id }>
                                    <div className="recipe-img-container">
                                        <div>

                                            <img src={ `${ recipe.image }` } className='recipe-img' alt={ recipe.title } />

                                        </div>
                                        <div className="recipe-title">
                                            <h2>{ recipe.title }</h2>
                                            { recipeBook === 'own book' ? (
                                                <h4 className='recipe-servings'>servings: { recipe.servings }</h4>
                                            ) : null }
                                        </div>
                                    </div>
                                    <div className='recipe-buttons'>
                                        { recipeBook === 'own book' ? (
                                            <button
                                                className='recipe-btn'
                                            // onClick={ ( e ) => handleViewRecipe( e, { id: recipe.idext } ) }
                                            >
                                                view
                                            </button>
                                        ) : (
                                            <button
                                                className='recipe-btn ext-btn'
                                            // onClick={ () => handleExtermalId( { id: recipe.id } ) }
                                            >
                                                view
                                            </button>
                                        ) }
                                        { recipeBook === 'own book' ? (
                                            <button
                                                className='recipe-btn'
                                            // onClick={ () => deleteRecipe( { id: recipe.id, url, token, setRecipeBook } ) }
                                            >
                                                delete
                                            </button>
                                        ) : null }
                                        { recipeBook === 'own book' ? (
                                            <button
                                                className='recipe-btn'
                                            // onClick={ () => handleAddToMenu( { recipe } ) }
                                            >
                                                add to menu
                                            </button>
                                        ) : null }
                                    </div>
                                </article>
                            )
                        } )
                    ) }
                </div>
            }

            {/* { extid === null ? ( <Modal isOpen={ isOpen } closeModal={ closeModal }>
                <RecipeDetails extid={ extid } url={ url } user_id={ user_id } token={ token } closeModal={ closeModal } />
            </Modal> ) : null
            } */}

            {/* <Modal isOpen={ isOpenMenu } closeModal={ closeMenuModal }>
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
            */}

            {/* <Modal isOpen={ isOpenView } closeModal={ closeViewModal }>
                <Suspense>
                    <RecipeView
                        id={ extid }
                        user_id={ user_id }
                        url={ url }
                        token={ token }
                        closeViewModal={ closeViewModal }
                    />
                </Suspense>
            </Modal> */}

        </section >
    )

}

RecipesCard.propTypes = {
    urlRecipe: PropTypes.string.isRequired,
    recipeBook: PropTypes.string.isRequired,
    setRecipeBook: PropTypes.func.isRequired,
    setExtid: PropTypes.func.isRequired,
    extid: PropTypes.string,
}

export default RecipesCard
