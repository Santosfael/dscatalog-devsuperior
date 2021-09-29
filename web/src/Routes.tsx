import { Router, Switch, Route, Redirect } from 'react-router-dom';

import ProductDetails from './pages/Catalog/components/ProductDetails';
import PrivateRoute from 'core/components/Routes/PrivateRoutes';
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
                    from="/admin/auth"
                    to="/admin/auth/login"
                    exact
                />
                <Route
                    path="/admin/auth"
                    component={Auth}
                />

                <Redirect
                    from="/admin"
                    to="/admin/products"
                    exact
                />

                <PrivateRoute path="/admin">
                    <Admin />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default Routes;