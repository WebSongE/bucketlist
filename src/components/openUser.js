import { useState } from "react";
import { getDocs, getFirestore, collection } from "firebase/firestore";

const OpenUser = ({ user }) => {
  const [buckets, setBuckets] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bucketsRef = collection(
    getFirestore(),
    "users/" + user.uid + "/buckets"
  );
  //const q = query(bucketsRef, orderBy('dateAt','desc'));
  const temp = getDocs(bucketsRef);
  const tempBuckets = [];
  temp.forEach((doc) => {
    var created = new Date(doc.data().dateAt);
    created =
      created.getFullYear() +
      "-" +
      created.getMonth() +
      "-" +
      created.getDate();
    tempBuckets.push({
      id: doc.id,
      text: doc.data().text,
      dateAt: created,
      expiredAt: doc.data().expiredAt,
      tags: doc.data().tags,
      userId: doc.data().userId,
      user_name: doc.data().user_name,
    });
  });

  setBuckets(tempBuckets);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Write your bucketlist"
          maxLength={120}
        />
      </form>
      <div>
        {buckets.map((bucket) => (
          <div key={bucket.id}>
            <div>{bucket.user_name}</div>
            <div>{bucket.text}</div>
            <div>{bucket.tags}</div>
            <div>created {bucket.dateAt}</div>
            <div>expired {bucket.expiredAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OpenUser;
