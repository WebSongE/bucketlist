import { authService,dbService } from "fbase";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { collection, orderBy, query, getDocs, getFirestore,doc,updateDoc, toDate } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";
import ShowList from "components/showList";
import ShowBucket from "components/ShowBucket";


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
            
            <ShowBucket userObj={userObj}/>
        </div>
    );

       
};



export default Profile;