import React from "react";
import {BrowserRouter as Route, Routes} from "react-router-dom";
import Auth from "routes/Auth.js";
import Home from "routes/Home.js";

const AppRouter = ({isLoggedIn}) => {
    return (
        <BrowserRouter> 
            <Routes>
                {isLoggedIn ? (
                <>
                    <Route exact path="/"element={<Home />}/>
                    <Route path='/add-bucketlist' element={<AddBucket />}/>
                </>
                ) : (
                    <Route exact path="/"element={<Auth />}/>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
