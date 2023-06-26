import axios from 'axios';

class PostsService {
	static getAllPosts = () => axios.get('/posts/all');
	static addLike = (id) => axios.post(`/likes/addRemove/${id}`);
	static removePost = (id) => axios.delete(`/posts/singlePost/${id}`);
}

export default PostsService;
