import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/userSlice';

axios.defaults.baseURL = 'http://localhost:4000/api';

axios.interceptors.request.use((config) => {
	if (localStorage.hasOwnProperty('sm_token')) {
		config.headers.authorization = localStorage.getItem('sm_token');
	}
	return config;
});

function AppLayout() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			restoreUser(JSON.parse(localStorage.getItem('sm_user')))
		);
	}, []);

	return (
		<div className='container mx-auto px-4 sm:px-6 md:px-8 lg:w-[1370px] mt-[20px]'>
			<Navbar />
			<Outlet />
			<ToastContainer />
		</div>
	);
}

export default AppLayout;
