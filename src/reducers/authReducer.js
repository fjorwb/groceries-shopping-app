import { TO_LOGIN, TO_LOGOUT, TO_REGISTER } from '../types'

const authInitialState = {
	user: null,
	register: null,
	isLogedIn: false
}

export default function authReducer(state = authInitialState, action) {
	switch (action.type) {
		case TO_LOGIN: {
			console.log('PAYLOAD>>>', action.payload.err ? console.log('ERROR') : console.log('SUCCESS'))

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
		case TO_REGISTER: {
			break
		}
		default:
			return state
	}
}
