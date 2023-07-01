import axios from 'axios';

class TagsService {
	static getAllTags = () => axios.get('/tags');
}

export default TagsService;
