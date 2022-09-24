import { useState } from "react";
import AddBucket from "components/AddBucket";
import ShowList from "components/showList";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  getFirestore,
  getDoc,
} from "firebase/firestore";

const Bucket = ({ userObj }) => {
  const [buckets, setBuckets] = useState([]);
  const q = query(
    collection(getFirestore(), "buckets"),
    orderBy("dateAt", "desc")
  );
  onSnapshot(q, (snapshot) => {
    const newArray = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    setBuckets(newArray);
  });
  const bucketsRef = collection(
    getFirestore(),
    "users/" + userObj.uid + "/buckets"
  );
  //const q = query(bucketsRef, orderBy('dateAt','desc'));
  const temp = getDoc(bucketsRef);
  const tempBuckets = [];
  temp.forEach((doc) => {
    tempBuckets.push({
      id: doc.id,
      text: doc.data().text,
      dateAt: doc.data().dateAt,
      expiredAt: doc.data().expiredAt,
      tags: doc.data().tags,
      userId: doc.data().userId,
    });
  });

  setBuckets(tempBuckets);

    return (
        <div>
            <AddBucket userObj={userObj} />
            <div>
                {buckets.map((bucket) => (
                    <div key={bucket.id}>
                        <div>{bucket.text}</div>
                        
                    </div>
                ))}
            </div>
        </div>
        );
}

export default Bucket;
