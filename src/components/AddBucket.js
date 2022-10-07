import React, { useEffect, useState } from "react";
import {
	collection,
	orderBy,
	query,
	updateDoc,
	getFirestore,
	getDocs,
	getDoc,
	setDoc,
	addDoc,
	doc,
} from "firebase/firestore";
import { dbService } from "fbase";
import ShowBucket from "./ShowBucket";

const AddBucket = ({ userObj }) => {
	const [newBucket, setNewBucket] = useState("");
	const [tags, setNewTags] = useState("");
	const [tagArray, setTagArray] = useState([]);
	const [userTags, setUserTags] = useState(new Map());
	const [expiredDate, setNewExpiredDate] = useState(new Date());
	const [buckets, setBuckets] = useState([]);

	const db = getFirestore();
	const bucketRef = collection(db, "users/" + userObj.uid + "/buckets");

	useEffect(() => {
		const getTags = async () => {
			const tagRef = doc(getFirestore(), "users/" + userObj.uid);
			const temp = await getDoc(tagRef);

			if(temp.data().userAllTags){
            	setTagArray(temp.data().userAllTags);
        	}
		};
		getTags();
	}, []);
	const getTags = async () => {
		const tagRef = doc(getFirestore(), "users/" + userObj.uid);
		const temp = await getDoc(tagRef);

		//console.log("getTags");
        if(temp.data().userAllTags){
            setTagArray(temp.data().userAllTags);
        }
		
	};
	const onKeyPress = (e) => {
		if (e.target.value.length !== 0 && e.key === "#") {
			submitTag();
		}
	};

	const onChange = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;
		setNewBucket(value);
	};
	const onChangeDate = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;
		setNewExpiredDate(value);
	};
	const allInit = () => {
		console.log("all init");
		setNewBucket("");
		setNewTags("");
		getTags();
		setUserTags(new Map());
	};
	const submitTag = () => {
		let updatedTagList = [...tagArray];
		updatedTagList.push(tags);
		setTagArray(updatedTagList);
		setNewTags("");
	};
	const deleteTag = (e) => {
		const deleteTag = e.target.parentElement.firstChild.innerText;
		const filteredTagList = tagArray.filter((tags) => tags !== deleteTag);
		setTagArray(filteredTagList);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		console.log("onSubmit");
		console.log(tagArray);
		await addDoc(bucketRef, {
			text: newBucket,
			dateAt: Date.now(),
			expiredAt: expiredDate,
			userId: userObj.uid,
			tags: tagArray,
		});
		console.log("successed");
		allInit();
		window.location.reload();
	};

	return (
		<>
			<section>
				<div className="AddBucket">
					<form onSubmit={onSubmit}>
						<input
							value={newBucket}
							type="text"
							onChange={onChange}
							required
							placeholder="이루고싶은 일을 적어보세요!"
						/>
						<input
							value={expiredDate}
							type="date"
							onChange={onChangeDate}
							required
							placeholder="마감 기한"
						/>
						<input type="submit" />
						<div>
							{tagArray.map((tags, index) => {
								return (
									<div key={index}>
										{tags}
										<button
											type="button"
											onClick={deleteTag}
										>
											X
										</button>
									</div>
								);
							})}
							<input
								type="text"
								placeholder="공백없이 '#'으로 태그를 추가할 수 있습니다."
								tagindex={2}
								onChange={(e) => setNewTags(e.target.value)}
								value={tags}
								onKeyPress={onKeyPress}
							/>
						</div>
						<button type="button">Cancel</button>
						<button type="button">Cancel</button>
					</form>
				</div>
			</section>
			<section>
				<ShowBucket userObj={userObj} />
			</section>
		</>
	);
};

export default AddBucket;
