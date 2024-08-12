import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Loader />;
	}
	return (
		<div>
			{isAuth ? (
				<Routes>
					{privateRoutes.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							exact={route.exact}
							element={<route.component />}
						/>
					))}
					<Route
						path="*"
						element={
							<Navigate
								to="/posts"
								replace
							/>
						}
					/>
				</Routes>
			) : (
				<>
					<Routes>
						{publicRoutes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								exact={route.exact}
								element={<route.component />}
							/>
						))}
					</Routes>
					<Navigate
						to="/login"
						replace
					/>
				</>
			)}
		</div>
	);
};

export default AppRouter;
