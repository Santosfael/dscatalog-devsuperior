import ButtonIcon from "core/components/ButtonIcon";
import { Link } from "react-router-dom";
import AuthCard from "../Card";

import "./styles.scss";

function Login() {
    return (
        <div>
            <AuthCard title="Login">
                <form className="login-form">
                    <input
                        type="email"
                        className="form-control input-base margin-bottom-30"
                        placeholder="E-mail"
                    />

                    <input
                        type="password"
                        className="form-control input-base"
                        placeholder="Senha"
                    />
                    <Link to="/admin/auth/recover" className="link-recover">
                        Esqueci a senha?
                    </Link>

                    <div className="login-submit">
                        <ButtonIcon text="logar" />
                    </div>
                    <div className="text-center">
                        <span className="not-registered">
                            Não tem cadastro?
                        </span>
                        <Link to="/admin/auth/register" className="link-register">
                            CADASTRAR
                        </Link>
                    </div>
                </form>
            </AuthCard>
        </div>
    )
};

export default Login;