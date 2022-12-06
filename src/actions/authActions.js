import { TO_LOGIN, TO_LOGOUT, TO_REGISTER } from '../types'

export const login = data => ({ type: TO_LOGIN, payload: data })

export const logout = () => ({ type: TO_LOGOUT })

export const register = data => ({ type: TO_REGISTER, payload: data })
