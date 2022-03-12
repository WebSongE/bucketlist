import { BrowserRouter, Route,Routes } from "react-router-dom";
import Auth from 'routes/Auth.js';
import AddBucket from 'components/AddBucket.js';
import Navigation from "components/Navigation";
import Profile from 'routes/Profile.js';
import SearchUsers from "components/SearchUsers";
import Home from "components/Home";
import Explore from "components/Explore";

const AppRouter = ({ refreshUser, isLoggedIn,userObj }) => {
    return (
        <BrowserRouter>

            {isLoggedIn 
            && <div>
                <Explore/>
                <Navigation userObj={userObj}/>
                </div>
                }
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/profile" element={
                            <Profile userObj={userObj} />
                        } />
                        <Route path='/bucket' element={
                            <AddBucket userObj={userObj} />
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