import { React, useEffect, useMemo, useRef, useState } from "react";
import Counter from "../components/counter";
import "../styles/App.css";
import PostItem from "../components/PostItem";
import PostsList from "../components/postsList";
import MyButton from "../components/UI/Button/MyButton";
import MyInput from "../components/UI/Input/MyInput";
import PostForm from "../components/PostForm";
import MySelect from "../components/UI/Select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import axios from "axios";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/Pagination/Pagination";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [modal, setModal] = useState(false);
	const [filter, setFilter] = useState({ sort: "", query: "" });

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [fetchPosts, isPostLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page);
			setPosts(response.data);
			const totalCount = response.headers["x-total-count"];
			setTotalPages(getPageCount(totalCount, limit));
		}
	);

	useEffect(() => {
		fetchPosts(limit, page);
	}, []);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};

	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page);
	};

	return (
		<div className="App">
			<MyButton
				style={{ marginTop: 30 }}
				onClick={() => setModal(true)}
			>
				{" "}
				Open Modal Window
			</MyButton>
			<MyModal
				visible={modal}
				setVisible={setModal}
			>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: "15px 0" }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{isPostLoading ? (
				<div
					style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
				>
					<Loader />
				</div>
			) : (
				<PostsList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title={"Posts List 1"}
				/>
			)}
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	);
}

export default Posts;
