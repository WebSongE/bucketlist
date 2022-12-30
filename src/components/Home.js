import React, { useEffect } from "react";
import {
	orderBy,
	query,
	getDocs,
	getFirestore,
	collection,
	toDate,
} from "firebase/firestore";
import { useState } from "react";
import ShowBucket from "./ShowBucket";
import ShowList from "./showList";

const Home = ({ userObj }) => {
	return (
<<<<<<< HEAD
		<div className="w-150 bg-cyan-200">
			<form className="bg-cyan-300 flex justify-center">
=======
		<div class="md:flex flex-col">
			<form  class=" w-screen">
>>>>>>> 6006a391e6d82ba0960512019f26bcad2e20433b
				<input
					class="m-10 place-self-center rounded-md border border-3 border-black text-center w-10/12"
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
