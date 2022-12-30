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

        <div className="container md:flex flex-col">
            <form onSubmit={onSubmit} className="profileForm md:flex flex-col">
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    autoFocus
                    className="formInput m-5 place-self-center rounded-md border border-3 border-black text-center text-2xl" />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn bg-buttonColor place-self-center rounded-lg font-bold px-5 py-3 text-2xl"
                     />

            </form>
            <span className="formBtn cancelBtn logOut bg-buttonColor2 my-5 font-bold place-self-center rounded-lg px-5 py-3 text-2xl" onClick={onLogOutClick}>
                Log Out
            </span>
            
            <ShowBucket userObj={userObj} />
        </div>
    );

       
};



export default Profile;