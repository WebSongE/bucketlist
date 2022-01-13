import { BrowserRouter,Route} from "react-router-dom";
import Home from 'components/Home.js';
import AddBucket from 'components/AddBucket.js';
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/add-bucketlist' element={<AddBucket/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;