import ItemsReducer from './ItemsReducer'
import UserReducer from './UserReducer'
import {combineReducers} from 'redux'

export default combineReducers({
	items:ItemsReducer,
	user:UserReducer
})
