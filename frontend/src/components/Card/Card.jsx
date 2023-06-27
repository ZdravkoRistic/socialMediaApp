import React from 'react';
import moment from 'moment';

// icons
import { AiFillLike } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';
import PostsService from '../../services/postsService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
	addRemoveLikeToggle,
	removeSinglePost,
} from '../../store/postsSlice';

function Card({ post }) {
	let user = JSON.parse(localStorage.getItem('sm_user'));

	const dispatch = useDispatch();

	const handleAddLike = () => {
		PostsService.addLike(post._id)
			.then((res) => dispatch(addRemoveLikeToggle()))
			.catch((err) => console.log(err));
	};

	// delete
	const handleRemovePost = () => {
		PostsService.removePost(post._id)
			.then((res) => {
				toast.success('Post deleted successfully');
				dispatch(removeSinglePost());
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='flex flex-col border border-primary rounded-lg overflow-hidden'>
			<div className='relative'>
				<div className='absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20 hover:opacity-0 transition-all' />
				<img
					src={post.image}
					alt='card-img'
					className='h-[150px] w-full object-cover'
				/>
				<h3 className='absolute top-[5px] left-[10px] text-white'>
					{post.user.firstName} {post.user.lastName}
				</h3>
				<p className='absolute top-[22px] left-[10px] text-white'>
					{moment(post.createdAt).format('dddd,Ah')}
				</p>
			</div>

			{/* text section */}
			<div className='p-[7px] grow flex flex-col justify-between'>
				<ul className='flex gap-1'>
					{post.tags.map((tag, i) => {
						return (
							<li key={i} className='text-gray-600'>
								#{tag.name}
							</li>
						);
					})}
				</ul>
				<h4 className='font-bold'>{post.title}</h4>

				<p>{post.body.substring(0, 50)}...</p>

				<div className='flex justify-between'>
					<div className='flex items-center gap-[2px]'>
						<AiFillLike
							className='text-primary text-[20px] cursor-pointer'
							onClick={handleAddLike}
						/>
						{/* LIKE, task: finish style for like button */}

						{post.likeInfo?.usersId.includes(user._id) ? (
							<span className='text-red-400 text-[17px]'>
								{post.likeInfo?.users.length}
							</span>
						) : (
							<span className='text-primary text-[17px]'>
								{post.likeInfo?.users.length}
							</span>
						)}
					</div>

					{post.user._id === user._id ? (
						<div className='flex items-center gap-[2px]'>
							<ImBin
								className='text-red-700'
								onClick={handleRemovePost}
							/>
							<span className='text-red-700'>Remove</span>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Card;
