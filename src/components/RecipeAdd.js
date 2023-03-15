import React, { useEffect, useState } from "react"

import PropTypes from "prop-types"

import getRecipe from "../services/getRecipe"
import addRecipe from "../services/addRecipe"
import addIngredient from "../services/addIngredient"


export const RecipeAdd = ( { recipe, url, token, user_id, closeAddRecipeModal } ) => {

    const [ recipeToBook, setRecipeToBook ] = useState( {} )
    const [ dataRecipe, setDataRecipe ] = useState( {} )
    const [ dataIngredient, setDataIngredient ] = useState( {} )

    console.log( 'User Id', user_id )

    useEffect( () => {
        console.log( recipe )
        console.log( recipeToBook )
    }, [ recipe ] );

    console.log( dataRecipe )
    console.log( dataIngredient )

    // const style = { background: 'red', color: 'yellow', margin: 0, padding: '0.5rem 0' }

    useEffect( () => {
        getRecipe( { url, token, id: recipe.recipe.id, setRecipe: setRecipeToBook } )
    }, [ recipe ] )

    function addToBook () {

        addRecipe( {
            url, token, data: {
                idext: recipe.recipe.id,
                title: recipeToBook.title,
                image: recipeToBook.image,
                servings: recipeToBook.servings,
                instructions: recipeToBook.instructions,
                user_id
            },
            setDataRecipe
        } )

        addIngredient( {
            url, token, data: {
                idext: recipe.recipe.id,
                ingredients: recipeToBook.ingredients || 'no ingredients',
                servings: recipeToBook.servings,
                instructions: recipeToBook.instructions,
                user_id
            },
            setDataIngredient
        } )
        setRecipeToBook( {} )
    }

    return (
        <div>
            <h1>add recipe</h1>
            <div>
                <h3>{ recipe?.recipe.title }</h3>
                <img src={ recipe?.recipe.image } alt={ `recipe image of ${ recipe?.recipe.image }` } />
                <button className="btn" onClick={ addToBook }>accept</button>
                <button className="btn" onClick={ closeAddRecipeModal }>cancel</button>
            </div>
            <div>
                { dataRecipe?.idext ? <p>{ dataRecipe.message }</p> : null }
                { dataIngredient?.idext ? <p>{ dataIngredient.message }</p> : null }
            </div>
        </div>
    )
}

RecipeAdd.propTypes = {
    recipe: PropTypes.object,
    user_id: PropTypes.number,
    url: PropTypes.string,
    token: PropTypes.string,
    closeAddRecipeModal: PropTypes.func
}

export default RecipeAdd