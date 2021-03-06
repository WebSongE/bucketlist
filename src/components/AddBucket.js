import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDoc,
  addDoc,
  doc,
} from "firebase/firestore";

const AddBucket = ({ userObj }) => {
  const [newBucket, setNewBucket] = useState("");
  const [tags, setNewTags] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [userTags, setUserTags] = useState(new Map());
  const [expiredDate, setNewExpiredDate] = useState(new Date());

  const db = getFirestore();
  const bucketRef = collection(db, "users/" + userObj.uid + "/buckets");

  useEffect(() => {
    const getTags = async () => {
      const tagRef = doc(getFirestore(), "users/" + userObj.uid);
      const temp = await getDoc(tagRef);
      setTagArray(temp.data().userAllTags);
    };
    getTags();
  }, []);
  const getTags = async () => {
    const tagRef = doc(getFirestore(), "users/" + userObj.uid);
    const temp = await getDoc(tagRef);
    setTagArray(temp.data().userAllTags);
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNewBucket(value);
  };
  const onChangeDate = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNewExpiredDate(value);
  };
  const onChangeTags = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNewTags(value);
  };
  const allInit = () => {
    setNewBucket("");
    setNewTags("");
    getTags();
    setUserTags(new Map());
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (newBucket === "") return;
    setTagArray(tags.split("#").join(",").split(" ").join(",").split(","));

    await addDoc(bucketRef, {
      text: newBucket,
      dateAt: Date.now(),
      expiredAt: expiredDate,
      userId: userObj.uid,
      tags: tagArray,
    });
    tagArray.forEach((item) => {
      if (userTags.has(item) === false) userTags.set(item, true);
    });
    allInit();
  };
  return (
    <section>
      <div className="AddBucket">
        <form onSubmit={onSubmit}>
          <input
            value={newBucket}
            type="text"
            onChange={onChange}
            placeholder="??????????????? ?????? ???????????????!"
          />
          <input
            value={expiredDate}
            type="date"
            onChange={onChangeDate}
            placeholder="?????? ??????"
          />
          <input type="submit" />
          <input
            value={tags}
            type="text"
            onChange={onChangeTags}
            placeholder="???????????? '#'?????? ????????? ????????? ??? ????????????"
          />
        </form>
        <button type="button">Cancel</button>
      </div>
    </section>
  );
=======
import React , { useEffect, useState } from "react";
import {collection, orderBy, query, updateDoc,getFirestore,getDocs, getDoc, setDoc, addDoc,doc} from "firebase/firestore";
import { dbService } from "fbase";
import ShowBucket from "./ShowBucket";

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
    const onKeyPress = e => {
        if(e.target.value.length !== 0 && e.key ==="#"){
        submitTag()
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
    const allInit=()=>{
        console.log("all init");
        setNewBucket("");
        setNewTags("");
        getTags();
        setUserTags(new Map());
    }
    const submitTag = () => {
        let updatedTagList = [...tagArray]
        updatedTagList.push(tags)
        setTagArray(updatedTagList)
        setNewTags('')
    }
    const deleteTag = e => {
        const deleteTag = e.target.parentElement.firstChild.innerText
        const filteredTagList  = tagArray.filter(tags => tags !== deleteTag)
        setTagArray(filteredTagList)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log("onSubmit");
        console.log(tagArray);
        await addDoc(bucketRef,{
            text: newBucket,
            dateAt: Date.now(),
            expiredAt: expiredDate,
            userId: userObj.uid,
            tags: tagArray
        });
        console.log("successed");
        allInit();
        window.location.reload();
        
    };
    
    return (
        <><section>
            <div className="AddBucket">
                <form onSubmit={onSubmit}>
                    <input value={newBucket} type="text" onChange={onChange} placeholder="??????????????? ?????? ???????????????!" />
                    <input value={expiredDate} type="date" onChange={onChangeDate} placeholder="?????? ??????" />
                    <input type="submit" />
                    <div>
                        {tagArray.map((tags, index) => {
                            return (
                                <div key={index}>
                                    {tags}
                                    <button onClick={deleteTag}>X</button>
                                </div>
                            )
                        })}
                        <input type='text'
                        placeholder="???????????? '#'?????? ????????? ????????? ??? ????????????."
                        tagindex={2}
                        onChange={e => setNewTags(e.target.value)}
                        value={tags}
                        onKeyPress={onKeyPress}
                        />
                    </div>
                    
                </form>
                <button type="button">Cancel</button>
            </div>
        </section><section>
            <ShowBucket userObj={userObj}/>
            </section></>
    );
};

export default AddBucket;
