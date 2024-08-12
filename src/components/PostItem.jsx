import React from "react";
import MyButton from "./UI/Button/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
	const router = useNavigate();
	return (
		<div>
			<div className="post">
				<div className="post__content">
					<strong>
						{props.post.id}. {props.post.title}
					</strong>
					<div>{props.post.body}</div>
				</div>
				<div className="post__button">
					<MyButton onClick={() => router(`/posts/${props.post.id}`)}>
						Open
					</MyButton>
				</div>
				<div className="post__button">
					<MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
