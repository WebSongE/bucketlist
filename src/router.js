import { BrowserRouter,Route} from "react-router-dom";
import Home from 'components/Home.js';
import AddBucket from 'components/AddBucket.js';
const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path='/' component={Home} />
                <Route path='/add-bucketlist' component={AddBucket} />
            </BrowserRouter>
        </div>

    )
};

export default AppRouter;