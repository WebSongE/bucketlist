import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from 'components/Home.js';
import Auth from 'routes/Auth.js';
import AddBucket from 'components/AddBucket.js';
const AppRouter = ({ isLoggedIn,userObject }) => {
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home userObject={userObject} />} />
                        <Route path='/add-bucketlist' element={<AddBucket />} />
                    </>
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;