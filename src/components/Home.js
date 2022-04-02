import React from "react";
import { orderBy, query, onSnapshot,getFirestore,collection } from "firebase/firestore";
import { useState} from "react";
import ShowList from "./showList";


const Home = ({userObj}) => {
    const [buckets, setBuckets] = useState([]);
    
    const db=getFirestore();
    const bucketsRef=collection(db,"users/"+userObj.uid+"/buckets");
    const q = query(bucketsRef, orderBy('dateAt','desc'));
    const unsubscribe=onSnapshot(q, (snapshot) => {
        const newArray=[];
        snapshot.forEach((doc)=>{
            newArray.push(doc.data());
        });
        setBuckets(newArray);
    });
 
    unsubscribe();   
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