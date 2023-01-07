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
        <div className="flex flex-col">
            <div className="font-extrabold place-self-center px-5 py-3 mt-10 text-6xl">BUCKETLIST</div>
            <form onSubmit={onSubmit} className="flex flex-col">
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="mt-10 text-slate-700 bg-neutral-200/50 place-self-center rounded-md text-center text-l w-10/12"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    className="m-10 text-slate-700 bg-neutral-200/50 place-self-center rounded-md text-center text-l w-10/12"
                />
                <input type="submit" className="bg-buttonColor place-self-center rounded-lg font-bold px-5 py-3 mt-5 text-l" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <button onClick={toggleAccount} className="bg-buttonColor2 my-5 font-bold place-self-center rounded-lg px-5 py-3 text-l">{newAccount ? "Sign in " : "Create Account "}</button>
            <br />
            <button onClick={onSocialClick} className="flex flex-auto justify-items-start bg-white my-5 px-5 py-3 font-bold border border-3 border-black text-center place-self-center rounded-full" name="google">
                <img src="pic/google.png" />
                <div className="ml-3 mt-1">Continue with Google</div>
            </button>
            <button onClick={onSocialClick} className="flex flex-auto justify-items-start bg-black my-5 px-5 py-3 font-bold text-white text-center place-self-center rounded-full" name="github">
                <img src="pic/github.png" />
                <div className="ml-3 mt-2">Continue with Github</div>
            </button>
        </div>
    )
};

export default Auth;