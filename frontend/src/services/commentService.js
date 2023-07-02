import axios from 'axios';

class CommentService {
	static addNewComment = (body) => axios.post('/comments/add', body);

	static removeOldComment = (id) => axios.delete(`/comments/${id}`);

	static updateComment = (body, id) =>
		axios.put(`/comments/${id}`, body);
}

export default CommentService;
