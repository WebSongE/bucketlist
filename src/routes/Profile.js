import { authService,dbService } from "fbase";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import ShowList from "components/showList";


const Profile=({ refreshUser, userObj})=>{
    const [buckets, setBuckets] = useState();
  
    useEffect(() => {
        dbService
            .collection("buckets")
            .orderBy("dateAt", "desc")
            .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setBuckets(newArray);
        });
    }, []);
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
        if (userObject.displayName !== newDisplayName) {
            await userObject.updateProfile ({
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
