let ItemsReducer = (state,action) => {
	switch(action.type){
		case 'SET_ITEMS':
			return action.payload
			break
		case 'ADD_FAV':
			state[action.payload.index].favedByUser = true 
			break	
		case 'REMOVE_FAV':
			state[action.payload.index].favedByUser = false 
			break			
		default:
			return state
			break	
	}
}

export default ItemsReducer