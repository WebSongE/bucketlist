import React from "react";
import { Link } from "react-router-dom";
const Navigation = ({ userObj }) => {
	return (
		<nav className="w-screen flex justify-end mt-10">
			<ul className="flex flex-row gap-x-4 text-center h-10">
				<li className="hover:bg-lime-200 active:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold bg-white flex-1 w-48">
					<Link to="/explore">explore</Link>
				</li>
				<li className="hover:bg-lime-200  active:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold bg-white flex-1 w-48">
					<Link to="/">Home</Link>
				</li>
				<li className="hover:bg-lime-200  focus:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold bg-white flex-1 w-48">
					<Link to="/profile">
						{userObj
							? `${userObj.displayName}의 Profile`
							: "Profile"}
					</Link>
				</li>
				<li className="hover:bg-lime-200  focus:bg-lime-500 outline outline-4 rounded-t-2xl outline-black pt-2 text-xl font-bold bg-white flex-1 w-48">
					<Link to="/bucket">add Bucket</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
