import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProductDetails from './pages/Catalog/components/ProductDetails';
import Navbar from './core/components/Navbar';
import Catalog from './pages/Catalog';
import Admin from './pages/Admin';
import Home from './pages/Home';

function Routes() {
    return(
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" exact component={Catalog} />
                <Route path="/products/product-details/:productId" component={ProductDetails} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;