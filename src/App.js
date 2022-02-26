import React, { useState, useEffect } from "react";
import AppRouter from "router";
import { authService } from "fbase";
import { onAuthStateChanged } from  "firebase/auth";
import { updateProfile } from "@firebase/auth";
function App() {
  const auth = authService;
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserObj({
            displayName: user.displayName
            ? user.displayName
            : 'Anonymous',
            uid: user.uid,
            updateProfile: (args) => updateProfile(user, {args}),
          });
        } else {
          setUserObj(null);
        }
        setInit(true);
      });
    }, [auth]);
    const refreshUser = () => {
      const user = auth.currentUser;
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => updateProfile(user, {args}),
      });
    };
    return (
      <>
        {init ? (
             <AppRouter
             refreshUser={refreshUser}
             isLoggedIn={Boolean(userObj)}
             userObject={userObj}
           />
         ) : (
           <span>Initializing..."</span>
         )}
    </>
  );
}
export default App;