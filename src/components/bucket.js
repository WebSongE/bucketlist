import { dbService } from "fbase";
import { useState,useEffect } from "react";
import AddBucket from "./AddBucket";
import ShowList from "./showList";

const Bucket = ({ userObject }) => {
    const [buckets, setBuckets] = useState([]);
    useEffect(() => {
        dbService
            .collection("buckets")
            .orderBy("dateAt", "desc")
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
            <AddBucket userObject={userObject} />
            <div>
                {buckets.map((bucket) => (
                    <ShowList key={bucket.id} bucketObject={bucket}/>
                ))}
            </div>
        </div>
        );
}

export default Bucket;
