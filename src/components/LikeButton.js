import heart from "pic/heart.svg";
import emptyHeart from "pic/emptyHeart.svg";
import { useState, useLayoutEffect } from "react";
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
	const [count, setCount] = useState(0);
	const isClick = () => setClick((click) => !click);
	const currentUser = getAuth().currentUser;

	useLayoutEffect(() => {
		const setClicked = async () => {
			const userRef = doc(getFirestore(), `users/${currentUser.uid}`);
			const temp = await getDoc(userRef);
			const likedArray = temp.data().userLiked;
			//사용자가 좋아요를 누른 리스트에 버킷이 있다면 true 아니면 false
			setClick(likedArray.find((e) => e === bucket) !== undefined);
		};
		const setHowManyLiked = async () => {
			const bucketRef = doc(
				getFirestore(),
				`users/${user}/buckets/${bucket}`
			);
			const temp = await getDoc(bucketRef);
			const likedUser = temp.data().like;
			try {
				setCount(likedUser.length);
			} catch (error) {
				setCount(0);
			}
		};
		setClicked();
		setHowManyLiked();
	}, []);

	const onLikeClick = (e) => {
		isClick();
		if (click) unlike(e.target.value);
		else like(e.target.value);
	};

	const like = async () => {
		const bucketRef = doc(
			getFirestore(),
			`users/${user}/buckets/${bucket}`
		);
		await updateDoc(bucketRef, {
			like: arrayUnion(currentUser.uid),
		});
		await updateDoc(doc(getFirestore(), `users/${currentUser.uid}`), {
			userLiked: arrayUnion(bucket),
		});
		setCount(count + 1);
	};

	const unlike = async () => {
		const bucketRef = doc(
			getFirestore(),
			`users/${user}/buckets/${bucket}`
		);
		await updateDoc(bucketRef, {
			like: arrayRemove(currentUser.uid),
		});
		await updateDoc(doc(getFirestore(), `users/${currentUser.uid}`), {
			userLiked: arrayRemove(bucket),
		});
		setCount(count - 1);
	};
	return (
		<div className="flex flex-auto items-center gap-x-3">
			<img
				style={{ width: "1em", height: "1em" }}
				src={click ? heart : emptyHeart}
				alt="heart"
				onClick={onLikeClick}
			/>
			<span>{count !== 0 ? count : ""}</span>
		</div>
	);
};

export default LikeButton;
