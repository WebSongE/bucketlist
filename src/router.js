import { BrowserRouter, Route } from "react-router-dom";
import Home from 'components/Home.js';
import AddBucket from "components/AddBucket.js";
import Profile from 'routes/Profile.js';
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
const AppRouter = ({ isLoggedIn }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                        
                        <Route exact path="/profile" element={
                            <Profile userObj={userObj} />
                        } />
                        <Route path='/add-bucketlist' element={
                            <AddBucket userObj={userObj} />
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