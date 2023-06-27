import { useFormik } from 'formik';
import React from 'react';
import UserService from '../../services/userService';
import { useDispatch } from 'react-redux';
import { loggedUser } from '../../store/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HeadingTitle from "../../components/HeadingTitle/HeadingTitle";
import LinkInfo from "../../components/LinkInfo/LinkInfo";

import loginImage from '../../assets/login-img.png';

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
		<div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-2 lg:mt-[53px] mt-[15px] mb-[23px]">
			<div>
				<img src={loginImage} className="object-cover lg:h-[707px] lg:w-[672px]" alt="reg-image"/>
			</div>
			<div className="lg:ml-[26px]">
				<HeadingTitle title="Login"/>
				<div className="w-full lg:mt-[103px] mt-[23px] border-[0.5px] rounded-lg border-primary mt-[52px]">
					<form
						onSubmit={formik.handleSubmit}
						className=' flex flex-col mx-auto p-[26px] mt-[14px]'>
						<div className="mt-[10px]">
							<input
								type='email'
								name='email'
								value={formik.values.email}
								onChange={formik.handleChange}
								placeholder='Email'
								className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							/>
							<p className="text-red-500 text-xs italic"> </p>
						</div>
						<div className="mt-[26px]">
							<input
								type='password'
								name='password'
								placeholder='Password'
								value={formik.values.password}
								onChange={formik.handleChange}
								className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							/>
							<p className="text-red-500 text-xs italic"> </p>
						</div>

						<div className="mt-[26px]">
							<button
								type='submit'
								className='bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
								Sign in
							</button>
						</div>
					</form>
				</div>
				<LinkInfo title="Don't have an account?" linkTitle="Click here to Register." link="/register"  />
			</div>
		</div>
	);
}

export default Login;
