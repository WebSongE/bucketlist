import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pen from "pic/pen.png";

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
		<div className="md:flex flex-col items-center mt-[10rem]">
			<div className="font-bold text-center px-5 py-3 text-2xl ">
				다른 사람들의 버킷리스트를 구경해보세요!
			</div>
			<div className="flex flex-col">
				{userArray.map((user) => (
					<div
						key={user.userId}
						className="flex flex-auto items-center ml-10 my-3"
					>
						<img src={pen} alt="user_image" />
						{user.user_name == null ? (
							<Link
								to={`/user_detail/${user.userId}`}
								className="pl-3 py-10"
							>
								<span className="font-extrabold">익명</span>
							</Link>
						) : (
							<Link
								to={`/user_detail/${user.userId}`}
								className="pl-3 py-10"
							>
								<span className="font-extrabold">
									{user.user_name}
								</span>
							</Link>
						)}
					</div>
				))}
			</div>
			
		</div>
	);
};
export default Explore;
