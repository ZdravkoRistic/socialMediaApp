import axios from 'axios';

class CommentService {
	static addNewComment = (body) => axios.post('/comments/add', body);

	static removeOldComment = (id) => axios.delete(`/comments/${id}`);
}

export default CommentService;
