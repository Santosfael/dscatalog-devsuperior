import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import List from "./List";

function ProductsRoutes() {
    return (
        <Switch>
            <Route path="/admin/products" exact component={List} />

            <Route path="/admin/products/:productId" component={Form} />
        </Switch>
    );
};

export default ProductsRoutes;