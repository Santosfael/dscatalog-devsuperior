import { Route, Switch } from 'react-router';

import Register from './components/Register';
import Recover from './components/Recover';
import Login from './components/Login';
import './styles.scss';

import { ReactComponent as AuthImage } from '../../core/assets/images/auth.svg';
function Auth() {
    return (
        <div className="auth-container">
            <div className="auth-info">
                <h1 className="auth-info-title">
                    Divulgue seus produtos <br />no DS Catalog
                </h1>
                <p className="auth-info-subtitle">
                    Faça parte do nosso catálogo de divulgação e<br />aumente a venda dos seus produtos.
                </p>
                <AuthImage />
            </div>
            <div className="auth-content">
                <Switch>
                    <Route path="/admin/auth/login" component={Login} />
                    <Route path="/admin/auth/register" component={Register} />
                    <Route path="/admin/auth/recover" component={Recover} />
                </Switch>
            </div>
        </div>
    )
};

export default Auth;