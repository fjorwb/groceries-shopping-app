import { TO_LOGIN, TO_LOGOUT } from '../types'

const authInitialState = {
	user: null,
	isLogedIn: false
}

export default function authReducer(state = authInitialState, action) {
	switch (action.type) {
		case TO_LOGIN: {
			if (action.payload.err) {
				return authInitialState
			}

			return {
				...state,
				user: action.payload,
				isLogedIn: true
			}
		}
		case TO_LOGOUT: {
			return authInitialState
		}
		default:
			return state
	}
}
