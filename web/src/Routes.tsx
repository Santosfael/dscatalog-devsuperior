import { Router, Switch, Route, Redirect } from 'react-router-dom';

import ProductDetails from './pages/Catalog/components/ProductDetails';
import Navbar from './core/components/Navbar';
import history from 'core/utils/history';
import Catalog from './pages/Catalog';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Auth from 'pages/Auth';

function Routes() {
    return (
        <Router history={history}>
            <Navbar />
            <Switch>
                <Route
                    path="/"
                    exact
                    component={Home}
                />

                <Route
                    path="/products"
                    exact
                    component={Catalog}
                />

                <Route
                    path="/products/product-details/:productId"
                    component={ProductDetails}
                />

                <Redirect
                    from="/auth"
                    to="/auth/login"
                    exact
                />
                <Route
                    path="/auth"
                    component={Auth}
                />

                <Redirect
                    from="/admin"
                    to="/admin/products"
                    exact
                />

                <Route path="/admin">
                    <Admin />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;