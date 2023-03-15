import axios from "axios"

export const addIngredient = async ( { url, token, data, setDataIngredient } ) => {
    axios.post( `${ url }ingredients`, data, {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${ token }`
        }
    } ).then( ( resp ) => {
        setDataIngredient( resp.data )
    } ).catch( ( err ) => {
        setDataIngredient( err )
    } )
}

export default addIngredient