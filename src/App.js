import React, { useState, useEffect } from "react";
import { setDoc, getFirestore, doc } from "firebase/firestore";
import AppRouter from "router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
	const auth = authService;
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserObj(user);
			} else {
				setUserObj(false);
			}
			setInit(true);
		});
	}, []);
	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObj({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => user.updateProfile(args),
		});
	};

	return (
		<div className="grid max-w-full">
			{init ? (
				<AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
			) : (
				<span>Initializing..."</span>
			)}
		</div>
	);
}
export default App;
