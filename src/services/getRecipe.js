import axios from 'axios'

export const getRecipe = async ( { url, token, id, setRecipe } ) => {

  await axios
    .get( `${ url }recipes/recipes/${ id }`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${ token }`
      }
    } )
    .then( ( resp ) => {
      setRecipe( resp.data )
    } )
    .catch( ( err ) => {
      console.log( err )
    } )
}

export default getRecipe
