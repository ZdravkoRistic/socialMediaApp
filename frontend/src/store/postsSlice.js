import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		count: null,
		posts: [],

		removePost: false,
	},
	reducers: {
		storeAllPosts: (state, action) => {
			state.count = action.payload.count;
			state.posts = action.payload.posts;
		},
		removeSinglePost: (state, action) => {
			state.removePost = !state.removePost;
		},
	},
});

export const { storeAllPosts, removeSinglePost } = postsSlice.actions;
export default postsSlice.reducer;
