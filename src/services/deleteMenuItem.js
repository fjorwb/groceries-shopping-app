import axios from 'axios'

export const deleteMenuItem = async ({ id, token, setIsDeleted, closeMenuCrudModal }) => {
  await axios.delete(`https://groceries-shopping.herokuapp.com/menus/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  setIsDeleted(true)
  closeMenuCrudModal()
}
export default deleteMenuItem
