import React from "react";
import { dbService } from "fbase";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { useState,useEffect } from "react";

import ShowList from "./showList";


const Home = ({userObj}) => {
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
            <form>
                <input type="text" placeholder="Write your bucketlist" maxLength={120} />
            </form>
            <div>
                {buckets.map((bucket) => (
                    <ShowList key={bucket.id} bucketObject={bucket}/>
                ))}
            </div>
        </div>
    );
};

export default Home;