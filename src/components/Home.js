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
		<div class="md:flex flex-col ">
			<form  class=" w-screen text-center">
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
