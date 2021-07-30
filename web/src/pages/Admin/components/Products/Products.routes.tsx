import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import List from "./List";

function ProductsRoutes() {
    return (
        <Switch>
            <Route path="/admin/products" exact component={List} />

            <Route path="/admin/products/create" component={Form} />

            <Route path="/admin/products/:productId">
                <h1>editar produto</h1>
            </Route>
        </Switch>
    );
};

export default ProductsRoutes;