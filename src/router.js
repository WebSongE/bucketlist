import { BrowserRouter, Route } from "react-router-dom";
import Home from 'components/Home.js';
import AddBucket from 'components/AddBucket.js';
const AppRouter = ({ isLoggedIn }) => {
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home />} />
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