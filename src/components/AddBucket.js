import { useEffect, useState } from "react";
import {collection,doc,updateDoc,getFirestore,getDoc, setDoc} from "firebase/firestore";
//import { dbService } from "fbase";

const AddBucket = ({userObj}) => {
    const [newBucket, setNewBucket] = useState("");
    const [tags, setNewTags] = useState("");
    const [tagArray,setTagArray]=useState([]);
    const [userTags,setUserTags]=useState(new Map());
    const [expiredDate,setNewExpiredDate]=useState(new Date());

    const db=getFirestore();
    const bucketRef=doc(db,"users/"+{userObj.uid}+"/buckets");
    /*useEffect=async()=>{
        const tagRef=doc(db,"userAllTags",userObject.id);
        const bucketRef=doc(db,"buckets");
        useEffect=async()=>{
            const tagRef=doc(db,"userAllTags",userObj.id);
            const data=await getDoc(tagRef);
            if(data.exists()){
                setUserTags(data);
            }
            else {
                setDoc(tagRef,{
                    userAllTags:userTags,
                });
            }
    }*/
    
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
        setNewBucket("");
        setNewTags("");
        setTagArray([]);
        setUserTags(new Map());
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (newBucket === "") return;
        setTagArray(tags.split('#').join(',').split(' ').join(',').split(','));
        await setDoc(bucketRef,{
            text: newBucket,
            dateAt: Date.now(),
            expiredAt: expiredDate,
            userId: userObj.uid,
            tags: tagArray
        });
        tagArray.forEach((item)=>{
            if(userTags.has(item)===false) userTags.set(item,true);
        });
        updateDoc(doc(getFirestore(),"userContents",userObj.id),{userAllTags:userTags});
        if(collection("userContents"))
        allInit();
    };
    return (
        <section>
            <div className="AddBucket">
                <form onSubmit={onSubmit}>
                    <input value={newBucket} type="text" onChange={onChange} placeholder="이루고싶은 일을 적어보세요!" />
                    <input value={expiredDate} type="date" onChange={onChangeDate} placeholder="마감 기한"/>
                    <input type="submit" />
                    <input value={tags} type="text" onChange={onChangeTags} placeholder="공백없이 '#'으로 태그를 추가할 수 있습니다"/>
                </form>
                <button type="button">Cancel</button>
            </div>
        </section>
    );
};

export default AddBucket;