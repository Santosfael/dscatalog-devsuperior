import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useState } from "react";

import ButtonIcon from "core/components/ButtonIcon";
import AuthCard from "../Card";

import { LoginApi } from "core/utils/api";

import "./styles.scss";
import { saveSessionData } from "core/utils/auth";

type FormState = {
    username: string,
    password: string,
}

type LocationState = {
    from: string;
}

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/admin" } };

    function onSubmit(data: FormState) {
        LoginApi(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.replace(from);
            })
            .catch(() => setHasError(true));
    }

    return (
        <div>
            <AuthCard title="Login">
                {hasError && (
                    <div className="alert alert-danger mt-5">
                        Usuário ou senha inválidos!
                    </div>
                )}
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="margin-bottom-30">
                        <input
                            type="email"
                            className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="E-mail"
                            {...register("username",
                                {
                                    required: "Campo obrigatório",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "E-mail inválido"
                                    }
                                })}
                        />

                        {errors.username && (
                            <p className="invalid-feedback d-block">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Senha"
                            {...register("password",
                                {
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 5,
                                        message: "Sua senha é acima de 5 caracteres"
                                    }
                                })}
                        />
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <Link to="/auth/recover" className="link-recover">
                        Esqueci a senha?
                    </Link>

                    <div className="login-submit">
                        <ButtonIcon text="logar" />
                    </div>
                    <div className="text-center footer-register">
                        <span className="not-registered">
                            Não tem cadastro?
                        </span>
                        <Link to="/auth/register" className="link-register">
                            CADASTRAR
                        </Link>
                    </div>
                </form>
            </AuthCard>
        </div>
    )
};

export default Login;