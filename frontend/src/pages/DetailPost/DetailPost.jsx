import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsService from '../../services/postsService';

import { toast } from 'react-toastify';
import moment from 'moment';
import CommentService from '../../services/commentService';

function DetailPost() {
	const [postDetail, setPostDetail] = useState({});
	const [addComment, setAddComment] = useState('');

	const [updateComm, setUpdateComm] = useState({
		isEdit: false,
		updateId: '',
		onUpdateComm: false,
	});

	let user = JSON.parse(localStorage.getItem('sm_user'));

	// flags
	const [commentNew, setCommentNew] = useState(false);
	const [removeOldComm, setRemoveOldComm] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		PostsService.getSinglePost(id)
			.then((res) => setPostDetail(res.data))
			.catch((err) => console.log(err));
	}, [commentNew, removeOldComm, updateComm.onUpdateComm]);

	const handleInputComment = (e) => {
		setAddComment(e.target.value);
	};

	const handleSubmitComment = () => {
		CommentService.addNewComment({
			body: addComment,
			postId: postDetail._id,
		})
			.then((res) => {
				setCommentNew((prev) => !prev);
				toast.success('Comment added successfully');
			})
			.catch((err) => console.log(err));

		console.log(addComment);
		setAddComment('');
	};

	// remove comment function

	const handleRemoveComment = (commId) => {
		CommentService.removeOldComment(commId)
			.then((res) => {
				setRemoveOldComm((prev) => !prev);
				toast.success('Removing comment is successful');
			})
			.catch((err) => console.log(err));
	};

	// update comment

	const handleUpdateComment = (bodyInfo) => {
		setUpdateComm({
			...updateComm,
			isEdit: true,
			updateId: bodyInfo.commId,
		});
		setAddComment(bodyInfo.bodyDesc);
	};

	const submitUpdate = () => {
		CommentService.updateComment(
			{ body: addComment, user },
			updateComm.updateId
		)
			.then((res) => {
				setUpdateComm({
					...updateComm,
					isEdit: false,
					onUpdateComm: (prev) => !prev,
				});
				setAddComment('');
				toast.success(res.data.message);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='flex gap-5 mt-[50px] border border-primary p-[10px] rounded-lg'>
			{/* left side */}
			<div className='w-[50%]'>
				<h3>{postDetail.title}</h3>
				<ul className='flex gap-2'>
					{postDetail.tags &&
						postDetail.tags.map((el, i) => {
							return <li key={i}>#{el.name}</li>;
						})}
				</ul>
				<p>{postDetail.body}</p>
				<h2>
					Create By: {postDetail.user?.firstName}{' '}
					{postDetail.user?.lastName}
				</h2>
				<p>{moment(postDetail.createdAt).format('dddd, hA')}</p>

				<hr className='mt-[10px]' />

				{/* comment section */}
				<div className='flex flex-col'>
					<h4 className='mt-[20px]'>Write A Comment</h4>

					<input
						type='text'
						placeholder='Add Comment'
						value={addComment}
						className='border px-[16px] py-[8px] rounded-lg mt-[10px] outline-none'
						onChange={handleInputComment}
					/>

					{updateComm.isEdit ? (
						<button
							className='mt-5 bg-primary text-white px-[16px] py-[8px] rounded-lg cursor-pointer'
							onClick={submitUpdate}>
							Update Comment
						</button>
					) : (
						<button
							className='mt-5 bg-primary text-white px-[16px] py-[8px] rounded-lg cursor-pointer'
							onClick={handleSubmitComment}>
							Add Comment
						</button>
					)}

					{/* comment */}
					<div className='mt-[20px] flex flex-col gap-2'>
						{postDetail.comments?.map((comm) => {
							return (
								<div
									key={comm._id}
									className='border border-gray-600 bg-[#bcbcbc] p-[10px] rounded-lg'>
									<h3>{comm.user.firstName}</h3>
									<p>
										Posted:{' '}
										<span className='text-primary'>
											{moment(comm.createdAt).format('dddd, hA')}
										</span>
									</p>

									<p className='bg-[#D9D9D9] p-[5px] rounded-md'>
										{comm.body}
									</p>

									<div className='flex gap-3'>
										<button
											className='mt-5 bg-red-700 text-white px-[16px] py-[8px] rounded-lg cursor-pointer'
											onClick={() => handleRemoveComment(comm._id)}>
											Delete
										</button>
										<button
											className='mt-5 bg-orange-400 text-white px-[16px] py-[8px] rounded-lg cursor-pointer'
											onClick={() =>
												handleUpdateComment({
													commId: comm._id,
													bodyDesc: comm.body,
												})
											}>
											Edit
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* right side */}
			<div className='w-[50%]'>
				<img src={postDetail.image} alt='imagePost' />
			</div>
		</div>
	);
}

export default DetailPost;
