import { dbService, storageService } from "fbase";
import { useState } from "react";

const Bucket = ({ user }) => {
    const [buckets, setBuckets] = useState([]);

    useEffect(() => { dbService
        .collection("buckets")
        .orderBy("dateAt", "desc");
        .onSnapshot((snapshot) => {
                const newArray = snapshot.docs.map((document) => {
                    id: document.id,
                        ...document.data(),
}));
    setBuckets(newArray);
});
}, []);
    return (
        <div>
            <AddBucket user={user} />
            <div>
                {buckets.map((bucket) => (
                    <ShowList key={bucket.id} bucketObject={bucket}/>
            </div>
        </div>
        );
}