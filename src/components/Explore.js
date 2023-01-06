import { async } from "@firebase/util";
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Explore = ({ user }) => {
	const [userArray, setUserArray] = useState([]);

	useEffect(() => {
		const getUser = async () => {
			const q = await getDocs(collection(getFirestore(), "users"));
			const userTempArray = [];
			q.forEach((doc) => userTempArray.push(doc.data()));
			setUserArray(userTempArray);
			console.log(userTempArray);
		};
		getUser();
	}, []);

	return (
		<div>
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
