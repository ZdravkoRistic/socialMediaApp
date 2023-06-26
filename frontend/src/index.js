import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppLayout from './AppLayout';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// components/pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <div>ERROR PAGE 404</div>,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/posts',
				element: <Posts />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
