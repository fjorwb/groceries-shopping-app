import { TO_LOGIN, TO_LOGOUT } from '../types'

export const login = data => ({ type: TO_LOGIN, payload: data })

export const logout = () => ({ type: TO_LOGOUT })
