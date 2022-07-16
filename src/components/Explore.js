import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import openUser from "./openUser";
const Explore = () => {
  const [userArray, setUserArray] = useState([]);

  const db = getFirestore();
  const userRef = collection(db, "users");
  const q = query(userRef, where("userId", "!=", null));
  onSnapshot(q, (querySnapshot) => {
    const userTempArray = [];
    querySnapshot.forEach((doc) => {
      userTempArray.push(doc.data());
    });
    setUserArray(userTempArray);
  });
  return (
    <div>
      {userArray.map((user) => (
        <div key={user.userId}>
          {user.user_name == null ? (
            <span>익명</span>
          ) : (
            <div>
              <span>{user.user_name}</span>
              <div onClick={openUser({ user })}>click</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Explore;
