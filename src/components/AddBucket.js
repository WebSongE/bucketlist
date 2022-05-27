import React , { useEffect, useState } from "react";
import {collection, orderBy, query, updateDoc,getFirestore,getDocs, getDoc, setDoc, addDoc,doc} from "firebase/firestore";
import { dbService } from "fbase";

const AddBucket = ({userObj}) => {
    const [newBucket, setNewBucket] = useState("");
    const [tags, setNewTags] = useState("");
    const [tagArray,setTagArray]=useState([]);
    const [userTags,setUserTags]=useState(new Map());
    const [expiredDate,setNewExpiredDate]=useState(new Date());
    const [buckets, setBuckets] = useState([]);

    const db=getFirestore();
    const bucketRef=collection(db,"users/"+userObj.uid+"/buckets");
    
    useEffect(()=>{
        const getTags=async()=>{
            const tagRef=doc(getFirestore(),"users/"+userObj.uid);
            const temp=await getDoc(tagRef);
            setTagArray(temp.data().userAllTags);
        }
        getTags();
    },[]);
    const getTags=async()=>{
        const tagRef=doc(getFirestore(),"users/"+userObj.uid);
        const temp=await getDoc(tagRef);
        console.log("getTags");
        setTagArray(temp.data().userAllTags);
    }

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNewBucket(value);
    }
    const onChangeDate = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNewExpiredDate(value);
    }
    const onChangeTags = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNewTags(value);
    }
    const allInit=()=>{
        console.log("all init");
        setNewBucket("");
        setNewTags("");
        getTags();
        setUserTags(new Map());
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log("onSubmit");
        if (newBucket === "") return;
        setTagArray(tags.split('#').join(',').split(' ').join(',').split(','));
        console.log(tagArray);
        await addDoc(bucketRef,{
            text: newBucket,
            dateAt: Date.now(),
            expiredAt: expiredDate,
            userId: userObj.uid,
            tags: tagArray
        });
        tagArray.forEach((item)=>{
            if(userTags.has(item)===false) userTags.set(item,true);
        });
        console.log("successed");
        allInit();
        
    };
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
    
    return (
        <><section>
            <div className="AddBucket">
                <form onSubmit={onSubmit}>
                    <input value={newBucket} type="text" onChange={onChange} placeholder="이루고싶은 일을 적어보세요!" />
                    <input value={expiredDate} type="date" onChange={onChangeDate} placeholder="마감 기한" />
                    <input type="submit" />
                    <input value={tags} type="text" onChange={onChangeTags} placeholder="공백없이 '#'으로 태그를 추가할 수 있습니다" />
                </form>
                <button type="button">Cancel</button>
            </div>
        </section><section>
                {buckets.map((bucket) => (
                    <div key={bucket.id}>
                        <div>{bucket.text}</div>
                        <div>{bucket.tags}</div>
                        <div>created {bucket.dateAt}</div>
                        <div>expired {bucket.expiredAt}</div>
                        
                    </div>
                ))}
            </section></>
    );
};

export default AddBucket;