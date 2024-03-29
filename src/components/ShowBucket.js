import React, { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	getFirestore,
	doc,
	updateDoc,
} from "firebase/firestore";
import ShowList from "./showList";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const ShowBucket = ({ userObj, bucket }) => {
	const [buckets, setBuckets] = useState([]);
	const [checkedbuckets, setCheckedbuckets] = useState(new Set());

	useEffect(() => {
		const bucketLoad = async () => {
			const bucketsRef = collection(
				getFirestore(),
				"users/" + userObj.uid + "/buckets"
			);
			const temp = await getDocs(bucketsRef);
			const tempBuckets = [];
			temp.forEach((doc) => {
				var created = new Date(doc.data().dateAt);
				created =
					created.getFullYear() +
					"-" +
					created.getMonth() +
					"-" +
					created.getDate();
				tempBuckets.push({
					id: doc.id,
					text: doc.data().text,
					dateAt: created,
					expiredAt: doc.data().expiredAt,
					tags: doc.data().tags,
					userId: doc.data().userId,
					complete: doc.data().complete,
				});
			});

			setBuckets(tempBuckets);
		};
		bucketLoad();
	}, [userObj]);

	const checkedbucketHandler = async (id, bucketid, isChecked) => {
		const bucketRef = doc(
			getFirestore(),
			"users/" + userObj.uid + "/buckets/" + bucketid
		);
		if (isChecked) {
			checkedbuckets.add(id);
			setCheckedbuckets(checkedbuckets);
			await updateDoc(bucketRef, { complete: true });
			window.location.reload();
		} else if (!isChecked) {
			checkedbuckets.delete(id);
			await updateDoc(bucketRef, { complete: false });
			setCheckedbuckets(checkedbuckets);

			window.location.reload();
		}
		return checkedbuckets;
	};

	return (
		<div className="flex flex-wrap justify-start cursor-default">
			{buckets.map((bucket) => (
				<div
					key={bucket.id}
					className="ml-5 my-2.5 p-3 bg-yellow-200 space-y-1.5"
				>
					<div className=" float-right">
						<ShowList userObj={userObj} bucket={bucket} />
					</div>
					<div>{bucket.text}</div>
					<div>태그: {bucket.tags}</div>
					<div className="flex flex-auto justify-items-start space-x-3">
						<div>생성일자: {bucket.dateAt}</div>
						<div>만료일자: {bucket.expiredAt}</div>
					</div>
					<div>
						완료
						<label className="innerBox">
							<input
								type="checkbox"
								checked={bucket.complete ? true : false}
								onChange={(e) =>
									checkedbucketHandler(
										e,
										bucket.id,
										e.target.checked
									)
								}
							/>
						</label>
					</div>
					<div>작성자 {userObj.displayName}</div>
				</div>
			))}
		</div>
	);
};

export default ShowBucket;
