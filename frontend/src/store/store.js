import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import postsSlice from './postsSlice';

const store = configureStore({
	reducer: {
		userStore: userSlice,
		postsStore: postsSlice,
	},
});

export default store;
