const urlenv = process.env.REACT_APP_URL
const urlInitialStore = {
  // url: 'https://groceries-shopping.herokuapp.com/'
  // url: 'http://localhost:5000/'
  url: urlenv || 'http://localhost:5000/'
}

export default function urlReducer(state = urlInitialStore) {
  return state
}
