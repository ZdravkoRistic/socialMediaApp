import axios from 'axios';

class UserService {
	static registerUser = (body) => axios.post('/auth/register', body);
	static loginUser = (body) => axios.post('/auth/login', body);
}

export default UserService;
