import React, { useState } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { getFirestore, setDoc,doc } from 'firebase/firestore';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    
    const onChange = (event) => {
        const { target: { name, value }, } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth()
            if (newAccount) {
                await createUserWithEmailAndPassword(
                    auth, email, password
                );
            } else {
                await signInWithEmailAndPassword(
                    auth, email, password);

            }
            const user = getAuth().currentUser;
            const userRef=doc(getFirestore(),'users',user.uid);
            setDoc(userRef,{
                user_name:user.displayName,
                userId:user.uid,
                following:[],
                follower:[],
                userAllTags:[],
            },{merge:true});
        } catch (error) {
            setError(error.message);
        }
        
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        const auth=getAuth();
        let provider;
        try {
            if (name === "google") {
                provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                /*const result = await signInWithPopup(auth, provider);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;*/
            } else if (name === "github") {
                provider = new GithubAuthProvider();
                await signInWithPopup(auth, provider);
                /*const result = await signInWithPopup(auth, provider);
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;*/
            }

        } catch (error) {
            console.log(error);
        }

    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in " : "Create Account "}</span>
            <br />
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    )
};

export default Auth;