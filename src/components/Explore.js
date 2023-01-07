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
		<div className="md:flex flex-col ">
			<div className="font-bold text-center px-5 py-3 text-2xl ">
				다른 사람들의 버킷리스트를 구경해보세요!
			</div>
			{userArray.map((user) => (
				<div key={user.userId} class="flex flex-auto justify-items-start ml-10 my-3">
					<img src="pic/pen.png" />
					{user.user_name == null ? (
						<Link to={`/user_detail/${user.userId}`} class="py-10">
							<span class= "font-extrabold">익명</span>
						</Link>
					) : (
						<span class= "py-10 font-extrabold">{user.user_name}</span>
					)}
				</div>
			))}
		</div>
	);
};
export default Explore;
