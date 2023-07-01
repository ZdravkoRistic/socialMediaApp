import React, { useEffect, useState } from 'react';
import TagsService from '../../services/tagsService';
import { FileParser } from '../../utils/FileParser';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PostsService from '../../services/postsService';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/postsSlice';

function CreatePost() {
	const [allTags, setAllTags] = useState([]);

	const dispatch = useDispatch();

	let user = JSON.parse(localStorage.getItem('sm_user'));

	const VALID_TYPE = ['image/jpeg', 'image/png', 'image/jpg'];
	let KB = 1024;
	let MB = KB * 1024;

	useEffect(() => {
		TagsService.getAllTags()
			.then((res) => setAllTags(res.data))
			.catch((err) => console.log(err));
	}, []);

	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
			tags: [],
			image: '',
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Field is required'),
			body: Yup.string().required('Field is required'),
			tags: Yup.array().min(1).required('Field is required'),
			image: Yup.mixed()
				.required('Field is required')
				.test(
					'fileSize',
					'Wrong file size',
					(value) => value.size < MB * 2
				)
				.test('fileType', 'Wrong file type', (value) =>
					VALID_TYPE.includes(value.type)
				),
		}),
		onSubmit: (values) => {
			values.tags = values.tags.map((el) => {
				return { name: el };
			});
			FileParser(values.image)
				.then((res) => {
					PostsService.createNewPost({
						...values,
						image: res,
						userId: user._id,
					})
						.then((res) => dispatch(createPost()))
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));

			// console.log(values);
			formik.resetForm();
		},
	});

	return (
		<div className='border border-primary p-[10px] rounded-lg mt-[20px]'>
			<h2 className='text-center mb-[10px]'>Create A Memory</h2>

			<form
				onSubmit={formik.handleSubmit}
				className='flex flex-col gap-3'>
				<label className='text-[14px] text-gray-600 '>
					Insert Title:
				</label>
				<input
					type='text'
					name='title'
					value={formik.values.title}
					onChange={formik.handleChange}
					placeholder='Insert Title'
					className='border px-[14px] py-[8px] rounded-md placeholder:text-[14px]'
				/>

				<label className='text-[14px] text-gray-600'>
					Insert Message:
				</label>
				<input
					type='text'
					name='body'
					value={formik.values.body}
					onChange={formik.handleChange}
					placeholder='Insert Message'
					className='border px-[14px] py-[8px] rounded-md placeholder:text-[14px]'
				/>

				<label className='text-[14px] text-gray-600'>Tags:</label>
				<div className='grid grid-cols-3 gap-2 mb-[10px]'>
					{allTags.map((tag, i) => {
						return (
							<div
								key={i}
								className='flex gap-1 items-center bg-gray-300 p-[5px] rounded-md'>
								<input
									type='checkbox'
									name='tags'
									value={tag.name}
									onChange={formik.handleChange}
								/>
								<p>#{tag.name}</p>
							</div>
						);
					})}
				</div>

				<label className='text-[14px] text-gray-600'>
					Insert Image:
				</label>
				<input
					type='file'
					name='image'
					onChange={(e) =>
						formik.setFieldValue(e.target.name, e.target.files[0])
					}
				/>

				<button className='p-[10px] bg-primary text-white rounded-lg'>
					Create Post
				</button>
				<button className='p-[10px] bg-red-600 text-white rounded-lg'>
					Clear
				</button>
			</form>
		</div>
	);
}

export default CreatePost;
