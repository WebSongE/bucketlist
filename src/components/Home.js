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
		<div>
			<form>
				<input
					type="text"
					placeholder="Write your bucketlist"
					maxLength={120}
				/>
			</form>
			<ShowBucket userObj={userObj} />
		</div>
	);
};

export default Home;
