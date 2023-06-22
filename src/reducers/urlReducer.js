const urlenv = process.env.REACT_APP_URL
console.log('URL env', urlenv)

const urlInitialStore = {
  url: urlenv || 'http://localhost:5000/'
}

export default function urlReducer(state = urlInitialStore) {
  return state
}
