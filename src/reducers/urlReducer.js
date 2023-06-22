const urlenv = process.env.REACT_APP_URL
console.log(urlenv)

const urlInitialStore = {
  url: 'https://groceries-shopping.herokuapp.com/' || 'http://localhost:5000/'
}

export default function urlReducer(state = urlInitialStore) {
  return state
}
