import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://localhost:4000/api';

function AppLayout() {
	return (
		<div className='container mx-auto'>
			<Navbar />
			<Outlet />
			<ToastContainer />
		</div>
	);
}

export default AppLayout;
