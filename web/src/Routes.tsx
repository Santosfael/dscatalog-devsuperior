import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Catalog from './pages/Catalog';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Navbar from './core/components/Navbar';

function Routes() {
    return(
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/catalog" component={Catalog} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;