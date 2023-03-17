/* eslint-disable space-before-function-paren */
import axios from 'axios'

export async function deleteRecipe ( { id, url, token, setRecipeBook } ) {
  // export async function deleteRecipe ( { id, url, token } ) {

  console.log( id )

  try {
    const resp = await axios.delete( `${ url }recipes/${ id }`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${ token }`
      }
    } )

    const resp2 = await axios.delete( `${ url }ingredients/${ id }`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${ token }`
      }
    } )

    if ( resp.status === 200 && resp2.status === 200 ) {
      console.log( 'recipe & ingredients successfully deleted' )
      setRecipeBook( 'external book' )
    }
  } catch ( error ) {
    console.log( error )
  }
}

export default deleteRecipe
