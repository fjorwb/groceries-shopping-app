import axios from 'axios'
const BASE_URL = 'https://groceries-shopping.herokuapp.com/'

export default axios.create({
	baseURL: BASE_URL
})
