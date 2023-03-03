
export function getRecipesUrl ( url, form ) {

    const { recipeName, cuisine, recipesBook } = form

    let urlRecipe = ''

    recipesBook === 'own book' && ( urlRecipe = ( `${ url }recipes` ) )

    recipesBook === 'external book' && recipeName === '' && cuisine === '' && ( urlRecipe = ( `${ url }recipes/recipes` ) )

    recipesBook === 'external book' && recipeName !== '' && cuisine !== '' && ( urlRecipe = ( `${ url }recipes/recipes?recipe=${ recipeName }&cuisine=${ cuisine }` ) )

    recipesBook === 'external book' && recipeName && cuisine === '' && ( urlRecipe = ( `${ url }recipes/recipes?recipe=${ recipeName }` ) )

    recipesBook === 'external book' && recipeName === '' && cuisine && ( urlRecipe = ( `${ url }recipes/recipes?cuisine=${ cuisine }` ) )

    // if ( recipesBook === 'own book' ) {
    //     urlRecipe = ( `${ url }recipes` )
    // } else if ( recipesBook === 'external book' ) {
    //     switch ( recipeName && cuisine ) {
    //         case recipeName && cuisine:
    //             urlRecipe = ( `${ url }recipes/recipes?recipe=${ recipeName }&cuisine=${ cuisine }` )
    //             break
    //         case recipeName:
    //             urlRecipe = ( `${ url }recipes/recipes?recipe=${ recipeName }` )
    //             break
    //         case cuisine:
    //             urlRecipe = ( `${ url }recipes/recipes?cuisine=${ cuisine }` )
    //             break
    //         default:
    //             urlRecipe = ( `${ url }recipes` )
    //             break
    //     }

    return urlRecipe
}

export default getRecipesUrl