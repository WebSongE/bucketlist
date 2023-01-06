import React from "react";
import ShowBucket from "./ShowBucket";

const Home = ({ userObj }) => {
	return (
		<div class="md:flex flex-col">
			<form  class=" w-screen text-center">
				<input
					className="m-10 place-self-center rounded-md border border-3 border-black text-center w-10/12"
					type="text"
					placeholder="Write your bucketlist"
					maxLength={120}
				/>
			</form>
			<div>
				<ShowBucket userObj={userObj} />
			</div>
		</div>
	);
};

export default Home;
