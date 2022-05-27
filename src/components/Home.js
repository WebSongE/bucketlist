import React, { useEffect } from "react";
import { orderBy, query, getDocs,getFirestore,collection,toDate } from "firebase/firestore";
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
            var created=new Date(doc.data().dateAt);
            created=created.getFullYear()+'-'+created.getMonth()+'-'+created.getDate();
            tempBuckets.push(
                {
                    'id':doc.id,
                    'text':doc.data().text,
                    'dateAt':created,
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

export default Home;