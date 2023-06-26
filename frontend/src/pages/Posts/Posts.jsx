import React, { useEffect } from 'react';
import PostsService from '../../services/postsService';
import { useDispatch, useSelector } from 'react-redux';
import { storeAllPosts } from '../../store/postsSlice';
import Card from '../../components/Card/Card';

function Posts() {
	const dispatch = useDispatch();

	const { posts, removePost } = useSelector(
		(state) => state.postsStore
	);

	useEffect(() => {
		PostsService.getAllPosts().then((res) =>
			dispatch(storeAllPosts(res.data))
		);
	}, [removePost]);

	return (
		<div className='flex mt-[30px]'>
			<div className='w-[70%]'>
				{/* posts */}
				<div className='grid grid-cols-3 gap-3'>
					{posts.map((post) => {
						return <Card key={post._id} post={post} />;
					})}
				</div>
			</div>
			<div className='w-[30%]'>sidebar</div>
		</div>
	);
}

export default Posts;
