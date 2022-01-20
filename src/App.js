import React, { useState, useEffect } from 'react';
import AppRouter from 'router';
import { authService } from 'fbase.js';
import { getAuth, onAuthStateChanged } from "firebase/compat/auth";

function App() {
    const [init, setInit] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                const uid = user.uid;
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
            <footer>&copy; {new Date().getFullYear()} Bucketlist</footer>
        </>
    );
}

export default App;