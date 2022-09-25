import React, { useEffect, useState } from "react";
import {  collection, orderBy, query, getDocs, getFirestore,doc,updateDoc, toDate } from "firebase/firestore";
import ShowList from "./showList";

const ShowBucket = ({userObj}) => {
    
    const [buckets, setBuckets] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const[checkedbuckets, setCheckedbuckets] = useState(new Set());
    
    const[editing, setEditing] = useState(false);
    
 
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
    const checkHandler = ({ target }) => {
        setIsChecked(!isChecked);
        checkedbucketHandler(target.parentNode, target.value, target.checked);
    };

    const checkedbucketHandler = ( id, isChecked) => {
        if(isChecked) {
            checkedbuckets.add(id);
            setCheckedbuckets(checkedbuckets);
        }
        else if (!isChecked && checkedbuckets.has(id)) {
            checkedbuckets.delete(id);
            setCheckedbuckets(checkedbuckets);
        }
        return checkedbuckets;
    };

    return (
        <div>
            {buckets.map((bucket) => (
                <div key={bucket.id}>
                    <div>{bucket.text}</div>
                    <div>tags {bucket.tags}</div>
                    <div>created {bucket.dateAt}</div>
                    <div>expired {bucket.expiredAt}</div>
                    <div>completed
                        <label className="innerBox">
                            <input
                                type="checkbox"
                                value={buckets.text}
                                onChange={(e) => checkHandler(e)} />
                        </label>
                    </div>
                    <div>작성자 {userObj.displayName}</div>
                    <ShowList userObj={userObj} bucket = {bucket} />
                    
                </div>
            ))}
        </div>
    );
};

export default ShowBucket;