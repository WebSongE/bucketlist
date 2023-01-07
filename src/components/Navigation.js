import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navigation = ({ userObj }) => {
	const [path, setPath] = useState(window.location.pathname);
	const clickPath = (clicked) => {
		console.log(path);
		setPath(clicked);
	};
	return (
		<nav className="w-screen flex justify-end mt-[2.2rem] border-b-[3px] border-black">
			<ul className="flex flex-row gap-x-4 text-center h-10">
				<Link to="/">
					<li
						onClick={() => clickPath("/")}
						className={`${
							path === "/" ? "bg-lime-400" : "bg-white"
						} hover:bg-lime-200 active:bg-lime-500 border-black border-x-[3px] border-t-[3px] rounded-t-2xl py-[5px] text-xl font-bold flex-1 w-48`}
					>
						Home
					</li>
				</Link>
				<Link to="/bucket">
					<li
						onClick={() => clickPath("/bucket")}
						className={`${
							path === "/bucket" ? "bg-lime-400" : "bg-white"
						}  hover:bg-lime-200 active:bg-lime-500 border-black border-x-[3px] border-t-[3px] rounded-t-2xl py-[5px] text-xl font-bold flex-1 w-48`}
					>
						add Bucket
					</li>
				</Link>
				<Link to="/profile">
					<li
						onClick={() => clickPath("/profile")}
						className={`${
							path === "/profile" ? "bg-lime-400" : "bg-white"
						} hover:bg-lime-200 active:bg-lime-500 border-black border-x-[3px] border-t-[3px] rounded-t-2xl py-[5px] text-xl font-bold flex-1 w-48`}
					>
						{userObj
							? `${userObj.displayName}의 Profile`
							: "Profile"}
					</li>
				</Link>
				<Link to="/explore">
					<li
						onClick={() => clickPath("/explore")}
						className={`${
							path === "/explore" ? "bg-lime-400" : "bg-white"
						} hover:bg-lime-200 active:bg-lime-500 border-black border-x-[3px] border-t-[3px] rounded-t-2xl py-[5px] text-xl font-bold flex-1 w-48`}
					>
						explore3
					</li>
				</Link>
			</ul>
		</nav>
	);
};

export default Navigation;
