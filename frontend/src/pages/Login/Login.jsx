import { useFormik } from 'formik';
import React from 'react';
import UserService from '../../services/userService';
import { useDispatch } from 'react-redux';
import { loggedUser } from '../../store/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		// validacija
		onSubmit: (values) => {
			UserService.loginUser(values)
				.then((res) => {
					if (res.status === 200) {
						toast.success('User successfully logged in');
						localStorage.setItem('sm_token', res.data.token);
						dispatch(loggedUser(res.data.user));

						setTimeout(() => navigate('/'), 2000);
					} else {
						toast.warning('User not logged in');
					}
				})
				.catch((err) => toast.error(err.response.data.msg));
		},
	});

	return (
		<div>
			<form
				onSubmit={formik.handleSubmit}
				className='w-[60%] border border-primary flex flex-col mx-auto p-[10px] mt-[50px]'>
				<label>Email: </label>
				<input
					type='email'
					name='email'
					placeholder='Insert email'
					value={formik.values.email}
					onChange={formik.handleChange}
					className='border p-[5px] placeholder:text-[14px]'
				/>

				<label>Password: </label>
				<input
					type='password'
					name='password'
					placeholder='Insert password'
					value={formik.values.password}
					onChange={formik.handleChange}
					className='border p-[5px] placeholder:text-[14px]'
				/>

				<button
					type='submit'
					className='bg-primary text-white p-[5px] mt-[20px] rounded-lg'>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
