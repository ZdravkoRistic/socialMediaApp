import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FileParser } from '../../utils/FileParser';
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
	const navigate = useNavigate();

	const VALID_TYPE = ['image/jpeg', 'image/png', 'image/jpg'];
	let KB = 1024;
	let MB = KB * 1024;

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			gender: '',
			image: '',
			birthDate: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required('Field is required'),
			lastName: Yup.string().required('Field is required'),
			email: Yup.string().required('Field is required'),
			password: Yup.string().required('Field is required'),
			gender: Yup.string().required('Field is required'),
			birthDate: Yup.string().required('Field is required'),
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
			FileParser(values.image)
				.then((res) => {
					UserService.registerUser({ ...values, image: res })
						.then((data) => {
							if (data.status === 200) {
								toast.success('User registration successful');
								setTimeout(() => navigate('/login'), 3000);
							} else {
								toast.warning('User already registered');
							}
						})
						.catch((err) => toast.warning(err.response.data.msg));
				})
				.catch((err) => console.log(err));

			formik.resetForm();
			// console.log(values);
		},
	});

	const showError = (name) =>
		formik.errors[name] &&
		formik.touched[name] &&
		formik.errors[name];

	return (
		<div>
			<form
				onSubmit={formik.handleSubmit}
				className='w-[70%] mx-auto mt-[30px] p-[10px] border border-primary flex flex-col'>
				<label className='text-[15px] text-gray-600'>
					Firstname:{' '}
					<span className='text-[14px] text-red-600'>
						{showError('firstName')}
					</span>
				</label>
				<input
					type='text'
					name='firstName'
					placeholder='Insert firstname'
					value={formik.values.firstName}
					onChange={formik.handleChange}
					className='border p-[7px]'
				/>

				<label className='text-[15px] text-gray-600'>
					Lastname:{' '}
					<span className='text-[14px] text-red-600'>
						{showError('lastName')}
					</span>
				</label>
				<input
					type='text'
					name='lastName'
					placeholder='Insert lastname'
					value={formik.values.lastName}
					onChange={formik.handleChange}
					className='border p-[7px]'
				/>
				<label className='text-[15px] text-gray-600'>
					Email:{' '}
					<span className='text-[14px] text-red-600'>
						{showError('email')}
					</span>
				</label>
				<input
					type='email'
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					placeholder='Insert email'
					className='border p-[7px]'
				/>

				<label className='text-[15px] text-gray-600'>
					Password:{' '}
					<span className='text-[14px] text-red-600'>
						{showError('password')}
					</span>
				</label>
				<input
					type='password'
					name='password'
					placeholder='Insert password'
					value={formik.values.password}
					onChange={formik.handleChange}
					className='border p-[7px]'
				/>
				<label className='text-[15px] text-gray-600'>
					Gender:{' '}
					<span className='text-[14px] text-red-600'>
						{showError('gender')}
					</span>
				</label>
				<select
					name='gender'
					value={formik.values.gender}
					onChange={formik.handleChange}
					className='border p-[7px]'>
					<option value='' defaultChecked>
						Gender
					</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</select>

				<label className='text-[15px] text-gray-600'>
					Image:{' '}
					<span className='text-[14px] text-red-600'>
						{showError('image')}
					</span>
				</label>
				<input
					type='file'
					name='image'
					onChange={(e) =>
						formik.setFieldValue(e.target.name, e.target.files[0])
					}
				/>

				<label className='text-[15px] text-gray-600'>
					Brithdate:{' '}
					<span className='text-[14px] text-red-600'>
						{showError('birthDate')}
					</span>
				</label>
				<input
					type='date'
					name='birthDate'
					value={formik.values.birthDate}
					onChange={formik.handleChange}
					className='border p-[7px]'
				/>

				<button
					type='submit'
					className='bg-primary text-white p-[5px] mt-[20px] rounded-lg'>
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
