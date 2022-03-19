import React, { useState, useEffect } from "react";
import AppRouter from "router";
import { authService } from "fbase";
import { onAuthStateChanged } from  "firebase/auth";
function App() {
  const auth = authService;
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserObj(user);
        } else {
          setUserObj(false);
        }
        setInit(true);
      });
    }, [auth]);
    
    return (
      <>
        {init ? (
             <AppRouter
             isLoggedIn={Boolean(userObj)}
             userObj={userObj}
           />
         ) : (
           <span>Initializing..."</span>
         )}
    </>
  );
}
export default App;