import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		count: null,
		posts: [],

		removePost: false,
		addRemoveLike: false,
	},
	reducers: {
		storeAllPosts: (state, action) => {
			state.count = action.payload.count;
			state.posts = action.payload.posts;
		},
		removeSinglePost: (state, action) => {
			state.removePost = !state.removePost;
		},
		addRemoveLikeToggle: (state, action) => {
			state.addRemoveLike = !state.addRemoveLike;
		},
	},
});

export const {
	storeAllPosts,
	removeSinglePost,
	addRemoveLikeToggle,
} = postsSlice.actions;
export default postsSlice.reducer;
