import { useEffect, useState } from "react";
import {collection,doc,updateDoc,getFirestore,getDoc} from "firebase/firestore";
import { dbService } from "fbase";

const AddBucket = ({userObject}) => {
    const [newBucket, setNewBucket] = useState("");
    const [tags, setNewTags] = useState("");
    const [tagArray,setTagArray]=useState([]);
    const [userTags,setUserTags]=useState(new Map());
    const [expiredDate,setNewExpiredDate]=useState(new Date());

    useEffect=async()=>{
        const ref=doc(dbService,"userAllTags",userObject.id);
        const data=await getDoc(ref);
        if(data){
            setUserTags(data);
        }
        else {
            collection("userContents").add({
                userId:userObject.id,
                userAllTags:userTags,
            });
        }
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
        setNewBucket("");
        setNewTags("");
        setTagArray([]);
        setUserTags(new Map());
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (newBucket === "") return;
        setTagArray(tags.split('#').join(',').split(' ').join(',').split(','));
        await dbService.collection("buckets").add({
            text: newBucket,
            dateAt: Date.now(),
            expiredAt: expiredDate,
            userId: userObject.uid,
            tags: tagArray
        });
        tagArray.forEach((item)=>{
            if(userTags.has(item)===false) userTags.set(item,true);
        });
        updateDoc(doc(getFirestore(),"userContents",userObject.id),{userAllTags:userTags});
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