import { BrowserRouter, Route,Routes } from "react-router-dom";
import Auth from 'routes/Auth.js';
import AddBucket from 'components/AddBucket.js';
import Navigation from "components/Navigation";
import Profile from 'routes/Profile.js';
import SearchUsers from "components/SearchUsers";

const AppRouter = ({ refreshUser, isLoggedIn,userObject }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObject}/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                        
                        <Route exact path="/profile" element={
                            <Profile userObj={userObject} refreshUser={{refreshUser}}/>
                        } />
                        <Route path='/add-bucketlist' element={
                            <AddBucket userObj={userObject} />
                        } />
                        <Route path='/search' element={
                            <SearchUsers />
                        } />
                    </>
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;