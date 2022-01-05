<<<<<<< HEAD
import { BrowserRouter,Routes,Route} from "react-router-dom";
=======
import { BrowserRouter,Route} from "react-router-dom";
>>>>>>> 4f7511663e7d3db393dafbebe388518c2ea9f6eb
import Home from 'components/Home.js';
import AddBucket from 'components/AddBucket.js';
const AppRouter = () => {
    return (
<<<<<<< HEAD
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/add-bucketlist' element={<AddBucket/>} />
            </Routes>
        </BrowserRouter>
    );
=======
        <div>
            <BrowserRouter>
                <Route path='/' component={Home} />
                <Route path='/add-bucketlist' component={AddBucket} />
            </BrowserRouter>
        </div>

    )
>>>>>>> 4f7511663e7d3db393dafbebe388518c2ea9f6eb
};

export default AppRouter;