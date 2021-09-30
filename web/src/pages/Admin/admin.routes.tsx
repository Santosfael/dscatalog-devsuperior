import { Switch } from "react-router-dom";
import Products from "./components/Products";

import PrivateRoute from 'core/components/Routes/PrivateRoutes';

function AdminRoutes() {
    return (
        <Switch>
            <PrivateRoute path="/admin/products" >
                <Products />
            </PrivateRoute>

            <PrivateRoute path="/admin/categories">
                <h1>Category</h1>
            </PrivateRoute>

            <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                <h1>User</h1>
            </PrivateRoute>
        </Switch>
    );
};

export default AdminRoutes;