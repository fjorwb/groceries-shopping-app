import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer'
import urlReducer from '../reducers/urlReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer
  }
})

export default store
