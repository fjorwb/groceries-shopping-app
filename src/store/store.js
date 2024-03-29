import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer'
import urlReducer from '../reducers/urlReducer'
import productsReducer from '../reducers/productsReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
    products: productsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})

export default store
