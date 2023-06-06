import { TO_GET_PRODUCTS } from '../types'

export const getProducts = (products) => ({ type: TO_GET_PRODUCTS, payload: products })
