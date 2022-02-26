import { authService,dbService } from "fbase";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { updateProfile } from "@firebase/auth";
import ShowList from "components/showList";
import {query,orderBy,where,doc,getFirestore,setDoc,collection,onSnapshot, getDocs} from "firebase/firestore";

const Profile=({ refreshUser, userObj})=>{
    const [buckets, setBuckets] = useState();
    const db=getFirestore();

    useEffect=async() => {
        const bucketRef=doc(db,"buckets");
        const q=query(bucketRef,orderBy("expiredAt","desc"),orderBy("dateAt"),where("userId","==",userObj.id));
        const querySnapshot=await getDocs(q);
        if(querySnapshot.exists()) setBuckets(querySnapshot.data());
        else console.log("There's nothing!");
    }

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

    return (
        <><>
            <form>
                <input onChange={onChange} type="text" placeholder="Display name" />
                <input onSubmit={onSubmit} type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
            <div>
                {buckets&&buckets.map((bucket) => (
                    <ShowList key={bucket.id} bucketObject={bucket} />
                ))}
            </div>
            </>
    );
}

export default Profile;
