import React from "react";
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PostsList = ({ posts, title, remove }) => {
	if (!posts.length) {
		return <h1 style={{ textAlign: "center" }}>Posts not found</h1>;
	}
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>{title}</h1>
			<TransitionGroup>
				{posts.map((post, index) => (
					<CSSTransition
						key={post.id}
						timeout={500}
						classNames="post"
					>
						<PostItem
							remove={remove}
							number={index + 1}
							post={post}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default PostsList;
