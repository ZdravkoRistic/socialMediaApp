import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaTimes} from 'react-icons/fa';

// logo
import logo from '../../assets/logo.png';
import {useDispatch, useSelector} from 'react-redux';
import {loggOutUser, restoreUser} from '../../store/userSlice';
import DropDownSelect from "../DropDown/DropDownSelect.jsx";


function Navbar(props) {

	const {user} = useSelector((state) => state.userStore);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLoggOut = () => {
		dispatch(loggOutUser());
		navigate('/login');
	};

	const [state, changeState] = useState(false);

	const handleClick = () => {
		changeState(!state);
	}

	const [dropdown, changeDropdown] = useState(false);
	let handleDropdown = () => {
		changeDropdown(!dropdown);
	}

	return (
		<>
			<nav className="relative px-4 py-4 flex justify-between border border-primary items-center bg-white">
				<a className="text-3xl font-bold leading-none" href="#">
					<img src={logo} alt="logo"/>
				</a>
				<div className="lg:hidden">
					<button className="navbar-burger flex items-center text-blue-600 p-3" onClick={handleClick}>
						<GiHamburgerMenu className="block h-4 w-4 fill-current"/>
					</button>
				</div>
				{localStorage.hasOwnProperty('sm_user') ? (
					<div className='flex justify-between w-full'>
						<div className='flex gap-1 text-md ml-4'>
							<NavLink to='/'
									 className='navbar_link hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-primary text-white px-[14px] py-[7px] rounded-lg'>Home</NavLink>
							<NavLink to='/posts'
									 className='navbar_link hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-primary text-white px-[14px] py-[7px] rounded-lg'>Posts</NavLink>
							<NavLink to='/ads'
									 className='navbar_link hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-primary text-white px-[14px] py-[7px] rounded-lg'>Ads</NavLink>
						</div>
						{/* profile settings */}
						<div className='flex gap-3'>
							{(user.image) ? (
								<img
									onClick={ handleDropdown }
									src={user.image}
									alt='profile-img'
									className='w-[40px] h-[40px] object-cover rounded-full cursor-pointer'
								/>
							) : (
								<div
									onClick={ handleDropdown }
									className={`rounded-full flex bg-primary w-[40px] h-[40px] justify-center items-center cursor-pointer`}>
									{/* <span className="text-white">{ user.firstName.charAt(0) }</span>*/}
									<span className="text-white">{user.firstName?.charAt(0)}</span>
								</div>
							)
							}
							<button onClick={handleLoggOut}>Logout</button>
							<DropDownSelect dropdown={ dropdown }  handleDropdown={ handleDropdown }/>
						</div>

					</div>
				) : (
					<div className='flex gap-3'>
						<NavLink
							to='/'
							className='navbar_link hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-primary text-white px-[14px] py-[7px] rounded-lg'>
							Home
						</NavLink>
						<NavLink
							to='/register'
							className='navbar_link hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-primary  bg-primary text-white px-[14px] py-[7px] rounded-lg'>
							Register
						</NavLink>
						<NavLink
							to='/login'
							className='navbar_link hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-primary  bg-primary text-white px-[14px] py-[7px] rounded-lg'>
							Login
						</NavLink>
					</div>
				)}
			</nav>

			<div className={`navbar-menu relative z-50 ${state ? '' : 'hidden'}`}>
				<div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
				<nav
					className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
					<div className="flex items-center mb-8">
						<a className="mr-auto text-3xl font-bold leading-none" href="#">
							<img src={logo} alt="logo"/>
						</a>
						<button className="navbar-burger flex gap-3 text-lg text-black" onClick={handleClick}>
							<FaTimes className="block h-4 w-4 fill-current"/>
							<title>Mobile menu</title>
						</button>
					</div>
					<div className="pt-6">
						<NavLink
							to='/'
							className='navbar_link block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-primary text-white px-[14px] py-[7px] rounded-lg'>
							Home
						</NavLink>
						<NavLink
							to='/register'
							className='navbar_link block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-primary  bg-primary text-white px-[14px] py-[7px] rounded-lg'>
							Register
						</NavLink>
						<NavLink
							to='/login'
							className='navbar_link block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-primary  bg-primary text-white px-[14px] py-[7px] rounded-lg'>
							Login
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}

export default Navbar;
