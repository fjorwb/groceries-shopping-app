
export function getRecipesUrl ( url, form ) {

    const { recipeName, cuisine, recipesBook } = form

    let urlRecipe = ''

    recipesBook === 'own book' && ( urlRecipe = ( `${ url }recipes` ) )

    recipesBook === 'external book' && recipeName === undefined && cuisine === undefined && ( urlRecipe = ( `${ url }recipes/recipes` ) )

    recipesBook === 'external book' && recipeName !== undefined && cuisine !== undefined && ( urlRecipe = ( `${ url }recipes/recipes?recipe=${ recipeName }&cuisine=${ cuisine }` ) )

    recipesBook === 'external book' && recipeName && cuisine === undefined && ( urlRecipe = ( `${ url }recipes/recipes?recipe=${ recipeName }` ) )

    recipesBook === 'external book' && recipeName === undefined && cuisine && ( urlRecipe = ( `${ url }recipes/recipes?cuisine=${ cuisine }` ) )

    return urlRecipe
}

export default getRecipesUrl