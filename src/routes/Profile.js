import { authService,dbService } from "fbase";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";
import ShowList from "components/showList";

const Profile=({ refreshUser, userObj})=>{
    const [buckets, setBuckets] = useState();

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

        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile ({
                displayName: newDisplayName,

            });
            refreshUser();
            console.log(userObj.displayName);
        }
    };
    useEffect(() => {
        const q = query(collection(dbService, "buckets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
          const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));
          setBuckets(newArray);
        });
      }, [dbService]);
    //console.log(userObj.displayName);

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
                    <ShowList key={bucket.id} bucketObject={bucket} />
                ))}
            </div>
        </div>
    );

       
}



export default Profile;