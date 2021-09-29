import { Redirect, Route } from "react-router";

import { isAuthenticated } from "core/utils/auth";

type Props = {
    children: React.ReactNode;
    path: string;
}

function PrivateRoute({ children, path }: Props) {

    return (
        <Route
            path={path}
            render={({ location }) =>
                isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/admin/auth/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;