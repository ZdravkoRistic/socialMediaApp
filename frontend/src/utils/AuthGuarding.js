import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthGuarding({ children }) {
	function isLoaggedUser() {
		if (localStorage.hasOwnProperty('sm_user')) {
			return localStorage.getItem('sm_user');
		}
	}

	return isLoaggedUser() ? children : <Navigate to={'/login'} />;
}

export default AuthGuarding;
