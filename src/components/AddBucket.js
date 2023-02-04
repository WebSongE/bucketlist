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
	const [buckets,  setBuckets] =useState([]);

	const db = getFirestore();
	const bucketRef = collection(db, "users/" + userObj.uid + "/buckets");

	useEffect(() => {
		const getTags = async () => {
			const tagRef = doc(getFirestore(), "users/" + userObj.uid);
			const temp = await getDoc(tagRef);

			if (temp.data().userAllTags) {
				setTagArray(temp.data().userAllTags);
			}
		};
		getTags();
	}, []);
	const getTags = async () => {
		const tagRef = doc(getFirestore(), "users/" + userObj.uid);
		const temp = await getDoc(tagRef);

		//console.log("getTags");
		if (temp.data().userAllTags) {
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
			complete: false,
		});
		console.log("successed");
		allInit();
		window.location.reload();
	};

	return (
		<>
			<section className="flex flex-col items-center mt-[10rem]">
				<div className="flex-1">
					<form
						onSubmit={onSubmit}
						className="flex flex-col items-center gap-y-3"
					>
						<input
							className="border-b-[3px] border-black w-[30rem] flex-1  text-center"
							value={newBucket}
							type="text"
							onChange={onChange}
							required
							placeholder="이루고싶은 일을 적어보세요!"
						/>
						<div className="bg-[#d9d9d9] w-96 py-1 text-center flex flex-row">
							<span className="w-10 mt-1 ml-2">태그</span>
							<input
								className="bg-[#d9d9d9] w-96 py-1 text-center inline-block"
								type="text"
								placeholder="공백없이 '#'으로 태그를 추가해보세요"
								tagindex={2}
								onChange={(e) => setNewTags(e.target.value)}
								value={tags}
								onKeyPress={onKeyPress}
							/>
						</div>
						<input
							className="bg-[#d9d9d9] w-96 py-1 text-center"
							value={expiredDate}
							type="date"
							onChange={onChangeDate}
							required
							placeholder="마감 기한"
						/>
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
						</div>
						<div className="flex gap-x-3">
							<button
								className="w-28 py-1 rounded-xl border-[3px] border-black bg-buttonColor"
								type="button"
							>
								취소
							</button>
							<button
								className="w-28 py-1 rounded-xl border-black border-[3px] bg-buttonColor2"
								type="submit"
							>
								제출
							</button>
						</div>
					</form>
				</div>
			</section>
			<div>
				{buckets.map((bucket) => (
					<div key={bucket.id}>
						<ShowBucket userObj={userObj} bucket={bucket} />
					</div>
				))}
			</div>
		</>
	);
};

export default AddBucket;
