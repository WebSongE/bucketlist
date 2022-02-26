import { authService,dbService } from "fbase";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import ShowList from "components/showList";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where} from "@firebase/firestore";

const Profile= ({ refreshUser, userObj}) => {
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
        if (userObj.displayName !== newDisplayName && newDisplayName.length !== 0) {
            await updateProfile (userObj,{
                displayName: newDisplayName
            });
            refreshUser();
            console.log(userObj.displayName);
        }
    };
    useEffect(() => {
        dbService
            .collection("buckets")
            .orderBy("expiredAt")
            .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setBuckets(newArray);
        });
    }, []);
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
