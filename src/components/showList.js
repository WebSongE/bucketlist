import { useState } from "react";
import {
	deleteDoc,
	collection,
	getFirestore,
	updateDoc,
	doc,
	getDoc,
} from "firebase/firestore";
import Bucket from "./bucket";

const ShowList = ({ userObj, bucket }) => {
	const [edit, setEdit] = useState(false);
	const [newBucket, setNewBucket] = useState([]);
	const [expiredDate, setNewExpiredDate] = useState(new Date());
	const db = getFirestore();

	const bucketRef = doc(db, "users/" + userObj.uid + "/buckets/" + bucket.id);

	const onClickDelete = async (event) => {
		const confirm = window.confirm("정말로 삭제하시겠습니까?");
		if (confirm) {
			await deleteDoc(bucketRef);
			window.location.reload();
		}
	};
	const onChange = (event) => {
		/*const {
            target: { value },
        } = event;*/
		setNewBucket(event.target.value);
	};
	const onChangeDate = (event) => {
		event.preventDefault();
		/*const {
            target: { value },
        } = event;*/
		setNewExpiredDate(event.target.value);
	};
	//const isEditing = () => setEdit((prev) => !prev);
	const onSubmit = async (event) => {
		console.log(bucketRef);
		event.preventDefault();
		await updateDoc(bucketRef, { text: newBucket, expiredAt: expiredDate });
		window.location.reload();

		setEdit(false);
	};

	return (
		<section>
			<div>
				<button
					className="bg-white p-1 border border-black rounded-md"
					type="submit"
					onClick={() => {
						setEdit(!edit);
					}}
				>
					{edit ? "취소" : "수정"}
				</button>
				<button
					className="bg-white p-1 mx-1 border border-black rounded-md"
					type="button"
					onClick={onClickDelete}
				>
					삭제
				</button>
				{edit && (
					<form onSubmit={onSubmit}>
						<input
							className=" border border-black"
							onChange={onChange}
							value={newBucket}
							required
							placeholder="내용 수정"
							autoFocus
						/>
						<input
							className=" border border-black"
							onChange={onChangeDate}
							value={expiredDate}
							type="date"
							required
							placeholder="마감 기한"
						/>
						<input
							className="bg-white p-1 mx-1 border border-black rounded-md"
							type="submit"
							value="업데이트"
						/>
					</form>
				)}
			</div>
		</section>
	);
};

export default ShowList;
