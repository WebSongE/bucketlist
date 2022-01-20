import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AppRouter from 'router';

function App() {
    const [init, setInit] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObject, setUserObject]=useState(null);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObject(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} /> : "Initializing..."}
            <footer>&copy; {new Date().getFullYear()} Bucketlist</footer>
        </>
    );
}

export default App;