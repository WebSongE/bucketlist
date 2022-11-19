import heart from "static/images/heart.svg";
import emptyHeart from "static/images/emptyHeart.svg";
import { useState } from "react";
import {
	getFirestore,
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";

const LikeButton = ({ bucket, user }) => {
	const [click, setClick] = useState(false);
	const isClick = () => setClick((click) => !click);

	const onLikeClick = (e) => {
		isClick();
		if (click) like(e.target.value);
		else unlike(e.target.value);
	};

	const like = async () => {
		console.log("click");
		const bucketRef = doc(
			getFirestore(),
			`users/${user}/buckets/${bucket}`
		);
		await updateDoc(bucketRef, {
			like: arrayUnion({ user }),
		});
	};

	const unlike = async () => {
		console.log("unclick");
		const bucketRef = doc(
			getFirestore(),
			`users/${user}/buckets/${bucket}`
		);
		await updateDoc(bucketRef, {
			like: arrayRemove({ user }),
		});
	};
	return (
		<img
			style={{ width: "1em", height: "1em" }}
			src={like ? heart : emptyHeart}
			alt="heart"
			onClick={onLikeClick}
		/>
	);
};

export default LikeButton;
