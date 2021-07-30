import { Route, Switch } from "react-router-dom";
import Products from "./components/Products";

function AdminRoutes() {
    return (
        <Switch>
            <Route path="/admin/products" component={Products} />

            <Route path="/admin/categories">
                <h1>Category</h1>
            </Route>

            <Route path="/admin/users">
                <h1>User</h1>
            </Route>
        </Switch>
    );
};

export default AdminRoutes;