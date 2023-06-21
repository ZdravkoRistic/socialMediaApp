import React from 'react';
import { NavLink } from 'react-router-dom';

// logo
import logo from '../../assets/logo.png';

function Navbar(props) {
	return (
		<div className='border border-primary mt-[30px] p-[10px] rounded-lg flex h-[90px] items-center justify-between'>
			{/* logo */}
			<img src={logo} alt='logo-image' />

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
		</div>
	);
}

export default Navbar;
