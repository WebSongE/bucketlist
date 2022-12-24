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
	let { userId } = useParams();

	useEffect(() => {
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
	}, [props, userId]);

	return (
		<div>
			<form>
				<input
					type="text"
					placeholder="Write your bucketlist"
					maxLength={120}
				/>
			</form>
			<div>
				{buckets.map((bucket) => (
					<div key={bucket.id}>
						<div>{bucket.user_name}</div>
						<div>{bucket.text}</div>
						<div>{bucket.tags}</div>
						<div>created {bucket.dateAt}</div>
						<div>expired {bucket.expiredAt}</div>
						<LikeButton bucket={bucket.id} user={userId} />
					</div>
				))}
			</div>
		</div>
	);
}
export default OpenUser;
