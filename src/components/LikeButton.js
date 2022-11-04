import { useState, useEffect } from "react";
import {
	doc,
	updateDoc,
	getFirestore,
	collection,
	query,
	updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import heart from "static/images/heart.svg";

const LikeButton = () => {
	const [click, setClick] = useState(false);
	const isClick = () => setClick((click) => !click);
	const onButtonClick = async ({ userId, currentUserId, bucketId }) => {
		const bucketRef = doc(
			getFirestore(),
			`users/${userId}/buckets/${bucketId}`
		);
		await updateDoc(bucketRef, {
			like: bucketRef.data().liked.exist()
				? bucketRef.data().liked + 1
				: 1,
		});
	};
	return (
		<button onClick={onButtonClick(userId, currentUserId, bucketId)}>
			<img src={heart} />
		</button>
	);
};

export default LikeButton;
