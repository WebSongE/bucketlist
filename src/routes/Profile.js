import { authService,dbService } from "fbase";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
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
    
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    
    const onSubmit = async(event) => {
        event.preventDefault();
        
        if (userObj.displayName !== newDisplayName && newDisplayName.length !==0) {
            await updateProfile (userObj, { displayName: newDisplayName});
            window.location.reload();
            //console.log(userObj.displayName);
        }
    };
    useEffect(() => {
        const q = query(collection(dbService, "buckets"), orderBy("expiredDate", "desc"));
        onSnapshot(q, (snapshot) => {
          const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));
          setBuckets(newArray);
        });
      }, [dbService]);
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
                {buckets && buckets.map((bucket) => (
                    <><ShowList key={bucket.id} bucketObject={bucket} /><label key={buckets.id} className="innerBox">
                        <input
                            type="checkbox"
                            value={buckets.name}
                            onChange={(e) => checkHandler(e)} />
                        <div>{buckets.name}</div>
                    </label></>
                ))}
            </div>
        </div>
    );

       
}



export default Profile;