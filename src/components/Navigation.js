import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navigation = ({ userObj }) => {
	const [path, setPath] = useState(window.location.pathname);
	const clickPath = (clicked) => {
		console.log(path);
		setPath(clicked);
	};
	return (
		<nav className="w-screen flex justify-end mt-10">
			<ul className="flex flex-row gap-x-4 text-center h-10">
				<li
					onClick={() => clickPath("/explore")}
					className={`${
						path === "/explore" ? "bg-lime-400" : "bg-white"
					} hover:bg-lime-200 active:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold flex-1 w-48`}
				>
					<Link to="/explore">explore</Link>
				</li>
				<li
					onClick={() => clickPath("/")}
					className={`${
						path === "/" ? "bg-lime-400" : "bg-white"
					} hover:bg-lime-200 active:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold flex-1 w-48`}
				>
					<Link to="/">Home</Link>
				</li>
				<li
					onClick={() => clickPath("/profile")}
					className={`${
						path === "/profile" ? "bg-lime-400" : "bg-white"
					} hover:bg-lime-200 active:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold flex-1 w-48`}
				>
					<Link to="/profile">
						{userObj
							? `${userObj.displayName}의 Profile`
							: "Profile"}
					</Link>
				</li>
				<li
					onClick={() => clickPath("/bucket")}
					className={`${
						path === "/bucket" ? "bg-lime-400" : "bg-white"
					} hover:bg-lime-200 active:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold flex-1 w-48`}
				>
					<Link to="/bucket">add Bucket</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
