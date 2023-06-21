import axios from 'axios';

class UserService {
	static registerUser = (body) => axios.post('/auth/register', body);
}

export default UserService;
