import axios from 'axios';

class PostsService {
	static getAllPosts = (page, limit) =>
		axios.get(`/posts/all?page=${page}&limit=${limit}&public=1`);
	static addLike = (id) => axios.post(`/likes/addRemove/${id}`);
	static removePost = (id) => axios.delete(`/posts/singlePost/${id}`);
}

export default PostsService;
