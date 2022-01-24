import { authService,dbService } from "fbase";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";

const Profile = ({ refreshUser, userObj}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
        }
    };

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