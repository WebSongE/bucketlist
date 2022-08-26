import { useState } from "react";
import {deleteDoc, collection,getFirestore,updateDoc, doc} from "firebase/firestore";
import Bucket from "./bucket";

const ShowList=({userObj, bucketObj}) => {
    const [edit, setEdit] = useState(false);
    const [newBucket, setNewBucket] = useState([]);
    const [expiredDate,setNewExpiredDate]=useState(new Date());
    const db=getFirestore();
    const bucketRef=collection(db,`users/${userObj.uid}/buckets`);

    const onClickDelete = async (event) => {
        const confirm = window.confirm("정말로 삭제하시겠습니까?");
        if (confirm) {
           await deleteDoc(bucketRef);

        }
    };
    const onChange = (event) => {
        /*const {
            target: { value },
        } = event;*/
        setNewBucket(event.target.value);
    };
    const onChangeDate = (event) => {
        event.preventDefault();
        /*const {
            target: { value },
        } = event;*/
        setNewExpiredDate(event.target.value);
    }
    //const isEditing = () => setEdit((prev) => !prev);
    const onSubmit = async (event) => {
        console.log(bucketRef);
        event.preventDefault();
        await updateDoc(bucketRef,{ text: newBucket, expiredAt:expiredDate });

        setEdit(false);
    };
    
    return (
        <section>
            <div>
                <button type="submit" onClick={() => {setEdit(!edit);}}>{edit ? "취소" :"수정"}</button>
                <button type="button" onClick={onClickDelete}>삭제</button>
                {edit && <form onSubmit={onSubmit}>
                    <input onChange={onChange} value={newBucket} required placeholder="내용 수정" autoFocus />
                    <input onChange={onChangeDate} value={expiredDate} type="date" placeholder="마감 기한"/>
                    <input type="submit" value="업데이트" />
                </form>}
                
            </div>
            
            
        </section>
    );
}

export default ShowList;