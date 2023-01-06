import { useState, useEffect } from "react";
import AddBucket from "components/AddBucket";
import {
	collection,
	orderBy,
	query,
	getFirestore,
	getDocs,
	getDoc,
} from "firebase/firestore";

const Bucket = ({ userObj }) => {
	const [buckets, setBuckets] = useState([]);
	const bucketsRef = collection(
		getFirestore(),
		"users/" + userObj.uid + "/buckets"
	);
	useEffect((bucketsRef) => {
		const q = getDocs(query(bucketsRef, orderBy("dateAt", "desc")));
		console.log("print");
		const newArray = q.docs.map((document) => ({
			id: document.id,
			...document.data(),
		}));
		setBuckets(newArray);
	}, []);

	const temp = getDoc(bucketsRef);
	const tempBuckets = [];
	temp.forEach((doc) => {
		tempBuckets.push({
			id: doc.id,
			text: doc.data().text,
			dateAt: doc.data().dateAt,
			expiredAt: doc.data().expiredAt,
			tags: doc.data().tags,
			userId: doc.data().userId,
			complete: doc.data().complete,
		});
	});

	return (
		<div>
			<AddBucket userObj={userObj} />
			<div>
				{buckets.map((bucket) => (
					<div key={bucket.id}>
						<div>{bucket.text}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Bucket;
