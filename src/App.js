import React, { useState, useEffect } from "react";
import { setDoc,getFirestore,doc } from "firebase/firestore";
import AppRouter from "router";
import { authService } from "fbase";
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if (user) {
          setUserObj({
              displayName: user.displayName
              ? user.displayName
              : 'Anonymous',
              uid: user.uid,
              updateProfile: (args) => user.updateProfile(args),
          });
        }
        else {
          setUserObj(false);
        }
        setInit(true);
      });
  }, []);
    const refreshUser = () => {
      const user = authService.currentUser;
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => user.updateProfile(args),
      });
    };
    return (
      <>
        {init ? (
             <AppRouter
             refreshUser={refreshUser}
             isLoggedIn={Boolean(userObj)}
             userObj={userObj}
           />
         ) : (
           <span>Initializing...</span>
         )}
    </>
  );
}
export default App;