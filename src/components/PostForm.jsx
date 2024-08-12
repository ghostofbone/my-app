import React, { useState } from "react";
import MyButton from "./UI/Button/MyButton";
import MyInput from "./UI/Input/MyInput";

const PostForm = ({ create }) => {
	const [post, setPost] = useState({ title: "", body: "" });

	const addNewPost = (e) => {
		e.preventDefault();
		const newPost = {
			...post,
			id: Date.now(),
		};
		create(newPost);
		setPost({ title: "", body: "" });
	};

	return (
		<form>
			<MyInput
				value={post.title}
				onChange={(e) => setPost({ ...post, title: e.target.value })}
				type="text"
				placeholder="Name of the post"
			/>
			<MyInput
				type="text"
				placeholder="Desription of the post"
				value={post.body}
				onChange={(e) => setPost({ ...post, body: e.target.value })}
			/>
			<MyButton onClick={addNewPost}>Create a post</MyButton>
		</form>
	);
};

export default PostForm;
