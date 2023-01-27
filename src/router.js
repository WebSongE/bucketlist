import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth.js";
import AddBucket from "components/AddBucket.js";
import Navigation from "components/Navigation";
import Profile from "routes/Profile.js";
import Home from "components/Home";
import Explore from "components/Explore";
import OpenUser from "components/openUser";
import "tailwindcss/tailwind.css";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
	return (
		<BrowserRouter basename="/bucketlist">
			{isLoggedIn && (
				<div>
					<Navigation userObj={userObj} />
				</div>
			)}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route
							exact
							path="/"
							element={<Home userObj={userObj} />}
						/>
						<Route
							exact
							path="/profile"
							element={<Profile userObj={userObj} />}
						/>
						<Route
							path="/bucket"
							element={<AddBucket userObj={userObj} />}
						/>
						<Route path="/explore" element={<Explore />} />
						<Route
							path="/user_detail/:userId"
							element={<OpenUser />}
						/>
					</>
				) : (
					<Route exact path="/" element={<Auth />} />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
