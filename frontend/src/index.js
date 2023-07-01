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
import AuthGuarding from './utils/AuthGuarding';
import Error from './pages/Error/Error';
import DetailPost from './pages/DetailPost/DetailPost';

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <Error />,
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
				element: (
					<AuthGuarding>
						<Posts />
					</AuthGuarding>
				),
			},
			{
				path: '/profile',
				element: <Posts />,
			},
			{
				path: '/detailPost/:id',
				element: <DetailPost />,
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
