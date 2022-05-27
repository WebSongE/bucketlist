import { authService,dbService } from "fbase";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { collection, orderBy, query, getDocs, getFirestore,doc,updateDoc, toDate } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";
import ShowList from "components/showList";


const Profile=({ userObj })=>{

    const [buckets, setBuckets] = useState([]);

    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState("");

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    
    const onChange = async(event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    
    const onSubmit = async(event) => {
        event.preventDefault();
        
        if (userObj.displayName !== newDisplayName && newDisplayName.length !==0) {
            await updateProfile (userObj, { displayName: newDisplayName});
            //console.log(userObj.displayName);
            const userRef=doc(getFirestore(),'users',userObj.uid);
            updateDoc(userRef, {
                user_name: newDisplayName
            });
            window.location.reload();
        }
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
    //console.log(userObj.displayName);

    const [isChecked, setIsChecked] = useState(false);
    const[checkedbuckets, setCheckedbuckets] = useState(new Set());

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

        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    autoFocus
                    className="formInput" />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                     />

            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
            
            <div>
                {buckets.map((bucket) => (
                    <div key={bucket.id}>
                        <div>{bucket.text}</div>
                        <div>{bucket.tags}</div>
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
                    </div>
                ))}
            </div>
        </div>
    );

       
};



export default Profile;