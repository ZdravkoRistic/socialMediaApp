import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// logo
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loggOutUser } from '../../store/userSlice';

function Navbar(props) {
	const { user } = useSelector((state) => state.userStore);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// console.log(user);

	const handleLoggOut = () => {
		dispatch(loggOutUser());
		navigate('/login');
	};

	return (
		<div className='border border-primary mt-[30px] p-[10px] rounded-lg flex h-[90px] items-center justify-between'>
			{/* logo */}

			<img src={logo} alt='logo-image' />

			{localStorage.hasOwnProperty('sm_user') ? (
				<div className='flex justify-between w-full border'>
					<div className='flex gap-3 text-lg'>
						<NavLink to='/'>Home</NavLink>
						<NavLink to='/posts'>Posts</NavLink>
						<NavLink to='/ads'>Ads</NavLink>
					</div>

					{/* profile settings */}
					<div className='flex gap-3'>
						<img
							src={user.image}
							alt='profile-img'
							className='w-[40px] h-[40px] object-cover rounded-full cursor-pointer'
						/>
						<button onClick={handleLoggOut}>Logout</button>
					</div>
				</div>
			) : (
				<div className='flex gap-3'>
					<NavLink
						to='/register'
						className='bg-primary text-white px-[14px] py-[7px] rounded-lg'>
						Register
					</NavLink>
					<NavLink
						to='/login'
						className='bg-primary text-white px-[14px] py-[7px] rounded-lg'>
						Login
					</NavLink>
				</div>
			)}
		</div>
	);
}

export default Navbar;
