/* eslint-disable space-before-function-paren */
/* eslint-disable multiline-ternary */
/* eslint-disable camelcase */
// import axios from 'axios'
import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useFetch } from '../customHooks/useFetch'

import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

import Loader from './Loader'

import './RecipesCard.css'

import RecipeDetails from './RecipeDetails'
import deleteRecipe from '../services/deleteRecipe'
// import MenuAddRecipe from './MenuAddRecipe'

const MenuAddRecipe = lazy(() => import('./MenuAddRecipe'))

function RecipesCard() {
  const auth = useSelector((state) => state.auth.user)

  const token = auth.accessToken
  const user_id = auth.id

  const [recipeName, setRecipeName] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [form, setForm] = useState('')
  const [recipesBook, setRecipesBook] = useState('external book')
  const [extid, setExtid] = useState(null)
  const [recipe, setRecipe] = useState()
  const [url, setUrl] = useState('recipes')

  const [isOpen, openModal, closeModal] = useModal(false)
  const [isOpenMenu, openMenuModal, closeMenuModal] = useModal(false)

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setRecipeName(form.recipeName)
    setCuisine(form.cuisine)
    setRecipesBook(form.recipesBook)
    setForm({
      recipeName: '',
      cuisine: '',
      recipesBook: 'own book'
    })
  }

  const handleExtermalId = (id) => {
    setExtid(id)
    openModal()
  }

  const handleAddToMenu = (recipe) => {
    setRecipe(recipe)
    // setExtMenuId(recipe.id)
    // console.log(extMenuId)
    openMenuModal()
  }

  useEffect(() => {
    if (recipesBook === 'own book') {
      // url = `recipes`
      setUrl('recipes')
    } else if (recipesBook === 'external book') {
      switch (recipeName && cuisine) {
        case recipeName && cuisine:
          // url = `recipes/recipes?recipe=${recipeName}&cuisine=${cuisine}`
          setUrl(`recipes/recipes?recipe=${recipeName}&cuisine=${cuisine}`)
          break
        case recipeName:
          // url = `recipes/recipes?recipe=${recipeName}`
          setUrl(`recipes/recipes?recipe=${recipeName}`)
          break
        case cuisine:
          // url = `recipes/recipes?cuisine=${cuisine}`
          setUrl(`recipes/recipes?cuisine=${cuisine}`)
          break
        default:
          // url = `recipes/${user_id}`
          setUrl(`recipes/${user_id}`)
          break
      }
    }
  }, [url, recipesBook, recipeName, cuisine, user_id])

  const { fetchData, loading } = useFetch(url, token)

  return (
    <div>
      <section>
        <form onSubmit={handleSearch} className='recipe-form'>
          <select
            className='recipe-select'
            name='recipesBook'
            id='recipesBook'
            onChange={handleChange}
            value={form.recipesBook}
            autoComplete='off'
            defaultValue='own book'
          >
            <option value='own book'>own book</option>
            <option value='external book'>external book</option>
          </select>
          <input
            className='recipe-input'
            type='text'
            name='recipeName'
            value={form.recipeName}
            onChange={handleChange}
            placeholder='ingredients or recipe name'
            autoComplete='on'
          />
          <input
            className='recipe-input'
            type='text'
            name='cuisine'
            value={form.cuisine}
            onChange={handleChange}
            placeholder='cuisine'
            autoComplete='on'
          />
          <button className='recipe-btn' onClick={handleSearch}>
            search
          </button>
        </form>
        <div>{loading && <Loader />}</div>
        <div className='recipe-container'>
          {fetchData?.length === 0 ? (
            <h1 className='recipe-message'>no recipes found</h1>
          ) : (
            fetchData?.map((recipe) => {
              return (
                <article className='recipe-card' key={recipe.id}>
                  <div className='recipe-img-container'>
                    <img src={`${recipe.image}`} className='recipe-img' alt={recipe.title} />
                    <h2 className='recipe-title'>{recipe.title}</h2>
                  </div>
                  {/* <h3>{recipe.description}</h3> */}
                  {recipesBook === 'own book' ? (
                    <h4 className='recipe-servings'>servings: {recipe.servings}</h4>
                  ) : null}
                  {recipesBook === 'own book' ? null : (
                    <button
                      className='recipe-btn'
                      onClick={() => handleExtermalId({ id: recipe.id })}
                    >
                      view recipe
                      {/* add to book */}
                    </button>
                  )}
                  {recipesBook === 'own book' ? (
                    <button
                      className='recipe-btn'
                      onClick={() => deleteRecipe({ id: recipe.id, token, setRecipesBook })}
                    >
                      delete recipe
                    </button>
                  ) : null}
                  {recipesBook === 'own book' ? (
                    <button className='recipe-btn' onClick={() => handleAddToMenu({ recipe })}>
                      add to menu
                    </button>
                  ) : null}
                </article>
              )
            })
          )}
        </div>
      </section>

      {extid !== null ? (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          {/* <h1>Modal</h1> */}
          <RecipeDetails extid={extid} user_id={user_id} token={token} closeModal={closeModal} />
        </Modal>
      ) : null}

      <Modal isOpen={isOpenMenu} closeModal={closeMenuModal}>
        {/* <h1>Modal</h1> */}
        <Suspense>
          <MenuAddRecipe
            recipe={recipe}
            // serves={recipe.recipe.servings}
            user_id={user_id}
            token={token}
            closeMenuModal={closeMenuModal}
          />
        </Suspense>
      </Modal>
    </div>
  )
}

export default RecipesCard
