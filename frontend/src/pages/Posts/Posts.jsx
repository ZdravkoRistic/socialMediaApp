import React, { useEffect, useState } from 'react';
import PostsService from '../../services/postsService';
import { useDispatch, useSelector } from 'react-redux';
import { storeAllPosts } from '../../store/postsSlice';
import Card from '../../components/Card/Card';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import LoadingAnim from '../../components/LoadingAnim/LoadingAnim';
import SearchPost from '../../components/SearchPost/SearchPost';
import CreatePost from '../../components/CreatePost/CreatePost';

function Posts() {
	const [isLoading, setIsLoading] = useState(true);

	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useDispatch();

	const { posts, removePost, addRemoveLike, createPostNew } =
		useSelector((state) => state.postsStore);

	useEffect(() => {
		let page = searchParams.get('page')
			? searchParams.get('page')
			: 1;
		let limit = searchParams.get('limit')
			? searchParams.get('limit')
			: 9;

		PostsService.getAllPosts(page, limit).then((res) => {
			dispatch(storeAllPosts(res.data));
			setIsLoading(false);
		});
	}, [removePost, addRemoveLike, searchParams, createPostNew]);

	return (
		<div className='flex mt-[30px] gap-5'>
			<div className='w-[70%]'>
				{isLoading ? (
					<LoadingAnim />
				) : (
					<>
						<div className='grid grid-cols-3 gap-3'>
							{posts.map((post) => {
								return <Card key={post._id} post={post} />;
							})}
						</div>
						<Pagination />
					</>
				)}
			</div>
			<div className='w-[30%]'>
				<SearchPost />
				<CreatePost />
			</div>
		</div>
	);
}

export default Posts;
