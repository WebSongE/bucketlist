import { useState } from "react";
import {deleteDoc,collection,getFirestore,updateDoc} from "firebase/firestore";

const ShowList=({ bucketObject},{userObj}) => {
    const [edit, setEdit] = useState(false);
    const [newBucket, setNewBucket] = useState(bucketObject.text);
    const [expiredDate,setNewExpiredDate]=useState(new Date());
    const db=getFirestore();
    const bucketRef=collection(db,"users/"+userObj.uid+"/buckets");
    const onClickDelete = async (event) => {
        const confirm = window.confirm("정말로 삭제하시겠습니까?");
        if (confirm) {
           await deleteDoc(bucketRef);
        }
    };
    const onChange = (event) => {
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
    }
    const isEditing = () => setEdit((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(bucketRef,{ text: newBucket });
        setEdit(false);
    };
    
    return (
        <section>
            {edit ? (
                <div>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newBucket} required placeholder="내용 수정" autoFocus />
                        <input onChange={onChangeDate} value={expiredDate} type="date" placeholder="마감 기한"/>
                        <input type="submit" value="업데이트" />
                    </form>
                    <button type="button" onClick={isEditing}>수정</button>
                </div>
            ) : (
                <div >
                    <h3>{bucketObject.text}</h3>
                    <div>
                        <span onClick={onClickDelete}>X</span>
                        <span onClick={isEditing}>O</span>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ShowList;