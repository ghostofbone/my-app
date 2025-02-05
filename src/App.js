import { React, useEffect, useState } from "react";

import './styles/App.css';

import { BrowserRouter, Navigate, } from "react-router-dom";
import About from "./Pages/About";
import Posts from "./Pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import PostIdPage from "./Pages/PostIdPage";
import { privateRoutes, publicRoutes } from "./router/routes";
import { AuthContext } from "./context";
import AppRouter from "./components/AppRouter";


function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true)


		}
		setIsLoading(false)
	}, []);
	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>

		</AuthContext.Provider>

	)
}

export default App;
