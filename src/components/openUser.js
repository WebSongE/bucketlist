import { useState, useEffect } from "react";
import {
	getDocs,
	getFirestore,
	collection,
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import LikeButton from "./LikeButton";

function OpenUser(props) {
	const [buckets, setBuckets] = useState([]);
	const [userLiked, setUserLiked] = useState([]);
	let { userId } = useParams();

	useEffect(() => {
		const getUserLikedList = async () => {
			const userRef = doc(getFirestore(), `users/${userId}`);
			const temp = await getDocs(userRef);
			setUserLiked(temp.data().userLiked);
		};
		const getBuckets = async () => {
			const bucketsRef = collection(
				getFirestore(),
				"users/" + userId + "/buckets/"
			);
			const temp = await getDocs(bucketsRef);
			const tempBuckets = [];
			temp.forEach((doc) => {
				var created = new Date(doc.data().dateAt);
				created = `
          ${created.getFullYear()}-
          ${created.getMonth()}-
          ${created.getDate()}
          `;
				tempBuckets.push({
					id: doc.id,
					text: doc.data().text,
					dateAt: created,
					expiredAt: doc.data().expiredAt,
					tags: doc.data().tags,
					userId: doc.data().userId,
					user_name: doc.data().user_name,
				});
			});
			return setBuckets(tempBuckets);
		};
		getBuckets();
		getUserLikedList();
	}, [props, userId]);

	return (
		<div class="md:flex flex-col">
			<form class=" w-screen text-center">
				<input
					className="m-10 place-self-center rounded-md border border-3 border-black text-center w-10/12"
					type="text"
					placeholder="Write your bucketlist"
					maxLength={120}
				/>
			</form>
			<div className="flex flex-wrap justify-start">
				{buckets.map((bucket) => (
					<div key={bucket.id}
						className="ml-5 my-2.5 p-3 bg-yellow-200 space-y-1.5">
						<div>{bucket.user_name}</div>
						<div>{bucket.text}</div>
						<div>태그: {bucket.tags}</div>
						<div className="flex flex-auto justify-items-start space-x-3">
							<div>생성일자: {bucket.dateAt}</div>
							<div>만료일자: {bucket.expiredAt}</div>
						</div>
						<LikeButton
							click={bucket.user_liked}
							bucket={bucket.id}
							user={userId}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
export default OpenUser;
