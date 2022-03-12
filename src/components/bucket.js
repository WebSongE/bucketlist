import  dbService from "fbase";
import { useState,useEffect } from "react";
import AddBucket from "./AddBucket";
import ShowList from "./showList";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";


const Bucket = ({ userObj }) => {
    const [buckets, setBuckets] = useState([]);
    useEffect(() => {
        const q = query(collection(dbService, "buckets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
          const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));
          setBuckets(newArray);
        });
      }, [dbService]);
    
    return (
        <div>
            <AddBucket userObj={userObj} />
            <div>
                {buckets.map((bucket) => (
                    <ShowList key={bucket.id} bucketObject={bucket}/>
                ))}
            </div>
        </div>
        );
}

export default Bucket;
