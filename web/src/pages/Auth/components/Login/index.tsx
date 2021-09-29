import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useState } from "react";

import ButtonIcon from "core/components/ButtonIcon";
import AuthCard from "../Card";

import { LoginApi } from "core/utils/api";

import "./styles.scss";
import { saveSessionData } from "core/utils/auth";

type FormData = {
    username: string,
    password: string,
}

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    function onSubmit(data: FormData) {
        LoginApi(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.push("/admin");
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