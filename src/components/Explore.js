import {
	getFirestore,
	collection,
	query,
	where,
	onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Explore = ({ user }) => {
	const [userArray, setUserArray] = useState([]);

	useEffect(() => {
		const db = getFirestore();
		const userRef = collection(db, "users");
		const q = query(userRef, where("userId", "!=", null));
		console.log("explore");
		return onSnapshot(
			q,
			(querySnapshot) => {
				const userTempArray = [];
				querySnapshot.forEach((doc) => {
					userTempArray.push(doc.data());
				});
				setUserArray(userTempArray);
			},
			[]
		);
	}, [userArray]);

	return (
		<div className="md:flex flex-col ">
			<div className="font-bold text-center px-5 py-3 text-2xl ">
				다른 사람들의 버킷리스트를 구경해보세요!
			</div>
			{userArray.map((user) => (
				<div key={user.userId}>
					{user.user_name == null ? (
						<Link to={`/user_detail/${user.userId}`}>
							<span>익명</span>
						</Link>
					) : (
						<span>{user.user_name}</span>
					)}
				</div>
			))}
		</div>
	);
};
export default Explore;
