import React, { useEffect } from "react";
import { orderBy, query, getDocs,getFirestore,collection } from "firebase/firestore";
import { useState} from "react";


const Home = ({userObj}) => {
    const [buckets, setBuckets] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        const bucketsRef=collection(getFirestore(),"users/"+userObj.uid+"/buckets");
        //const q = query(bucketsRef, orderBy('dateAt','desc'));
        const temp=await getDocs(bucketsRef);
        const tempBuckets=[];
        temp.forEach((doc)=>{
            tempBuckets.push(
                {
                    'id':doc.id,
                    'text':doc.data().text,
                    'dateAt':doc.data().dateAt,
                    'expiredAt':doc.data().expiredAt,
                    'tags':doc.data().tags,
                    'userId':doc.data().userId,
                }
            );
        });
        
        setBuckets(tempBuckets);
    },[]);

    return(
        <div>
            <form>
                <input type="text" placeholder="Write your bucketlist" maxLength={120} />
            </form>
            <div>
                {buckets.map((bucket) => (
                    <div key={bucket.id}>
                        <span>{bucket.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;