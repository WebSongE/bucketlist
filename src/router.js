import { BrowserRouter, Route,Routes } from "react-router-dom";
import Auth from 'routes/Auth.js';
import AddBucket from 'components/AddBucket.js';
import Navigation from "components/Navigation";
import Profile from 'routes/Profile.js';
import SearchUsers from "components/SearchUsers";
import Home from "components/Home";
import Explore from "components/Explore";

const AppRouter = ({ refreshUser, isLoggedIn,userObject }) => {
    return (
        <BrowserRouter>
            {isLoggedIn 
            && <div>
                <Explore/>
                <Navigation userObject={userObject}/>
                </div>
                }
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/profile" element={
                            <Profile userObject={userObject} refreshUser={{refreshUser}}/>
                        } />
                        <Route path='/bucket' element={
                            <AddBucket userObject={userObject} />
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