import heart from "static/images/heart.svg";
import emptyHeart from "static/images/emptyHeart.svg";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";

const LikeButton = ({ bucket, user }) => {
	const [click, setClick] = useState(false);
	const isClick = () => setClick((click) => !click);
	const currentUser = getAuth().currentUser;

	// useEffect(() => {
	// 	const setClicked = async () => {
	// 		const userRef = doc(getFirestore(), `users/${currentUser.uid}`);
	// 		const temp = await getDoc(userRef);
	// 		const likedArray = temp.data().userLiked;
	// 		//사용자가 좋아요를 누른 리스트에 버킷이 있다면 true 아니면 false
	// 		setClick(likedArray.find((e) => e === bucket) !== undefined);
	// 	};
	// 	setClicked();
	// }, []);

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
			like: arrayUnion(currentUser.uid),
		});
		await updateDoc(doc(getFirestore(), `users/${currentUser.uid}`), {
			like: arrayUnion(bucket),
		});
		console.log(bucket);
	};

	const unlike = async () => {
		console.log("unclick");
		const bucketRef = doc(
			getFirestore(),
			`users/${user}/buckets/${bucket}`
		);
		await updateDoc(bucketRef, {
			like: arrayRemove(currentUser.uid),
		});
		await updateDoc(doc(getFirestore(), `users/${currentUser.uid}`), {
			like: arrayRemove(bucket),
		});
	};
	return (
		<img
			style={{ width: "1em", height: "1em" }}
			src={click ? heart : emptyHeart}
			alt="heart"
			onClick={onLikeClick}
		/>
	);
};

export default LikeButton;
