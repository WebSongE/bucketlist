import { dbService } from "fbase";
import { useState,useEffect } from "react";
import AddBucket from "./AddBucket";
import ShowList from "./showList";

const Bucket = ({ userObj }) => {
    const [buckets, setBuckets] = useState([]);
    useEffect(() => {
        dbService
            .collection("buckets")
            .orderBy("expiredAt")
            .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setBuckets(newArray);
        });
    }, []);
    
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
