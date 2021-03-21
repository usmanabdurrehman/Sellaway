let UserReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_USER":
			return action.payload;
			break;
		case "LOGOUT":	
			return {};
			break;
		default:
			return state;
			break;
	}
};

export default UserReducer;
