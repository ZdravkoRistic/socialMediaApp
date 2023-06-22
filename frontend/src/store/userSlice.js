import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
	},
	reducers: {
		loggedUser: (state, action) => {
			state.user = action.payload;
			localStorage.setItem('sm_user', JSON.stringify(action.payload));
			// console.log(action.payload);
		},

		restoreUser: (state, action) => {
			state.user = action.payload;
		},
		loggOutUser: (state, action) => {
			state.user = {};
			localStorage.removeItem('sm_user');
			localStorage.removeItem('sm_token');
		},
	},
});

export const { loggedUser, restoreUser, loggOutUser } =
	userSlice.actions;
export default userSlice.reducer;
