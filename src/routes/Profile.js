import { authService,dbService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { collection, getDocs, query, where } from "@firebase/firestore";
//import { updateProfile } from "@firebase/auth";
const Profile = ({userObj}) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    };
    const getMyBuckets = async() => {
        const q = query(
            collection(dbService, "buckets"),
            where("creatorId", "==", userObj.uid)
        );
        const querySnapshot =  getDocs(q);
        querySnapshot.forEach((doc)=> {
            console.log(doc.id,"=>", doc.data());
        });
        
    };
    useEffect(() => {
        getMyBuckets();
    })
    return (
        <>
        <form>
            <input type="text" placeholder="Display name" />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;