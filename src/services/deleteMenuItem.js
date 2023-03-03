import axios from 'axios'

export const deleteMenuItem = async ({ id, url, token, setIsDeleted, closeMenuCrudModal }) => {
  await axios.delete(`${url}menus/${id}`, {
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
