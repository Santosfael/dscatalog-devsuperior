import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ProductDetails from './pages/Catalog/components/ProductDetails';
import Navbar from './core/components/Navbar';
import Catalog from './pages/Catalog';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Auth from 'pages/Auth';

function Routes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" exact component={Catalog} />
                <Route path="/products/product-details/:productId" component={ProductDetails} />
                <Redirect from="/admin/auth" to="/admin/auth/login" exact />
                <Route path="/admin/auth" component={Auth} />
                <Redirect from="/admin" to="/admin/products" exact />
                <Route path="/admin" component={Admin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;