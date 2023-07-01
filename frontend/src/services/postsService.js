import axios from 'axios';

class PostsService {
	static getAllPosts = (page, limit) =>
		axios.get(`/posts/all?page=${page}&limit=${limit}&public=0`);
	static addLike = (id) => axios.post(`/likes/addRemove/${id}`);
	static removePost = (id) => axios.delete(`/posts/singlePost/${id}`);

	static createNewPost = (body) => axios.post('/posts/add', body);

	static getSinglePost = (id) => axios.get(`/posts/singlePost/${id}`);
}

export default PostsService;
