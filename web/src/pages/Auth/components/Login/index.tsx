import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useState } from "react";

import ButtonIcon from "core/components/ButtonIcon";
import AuthCard from "../Card";

import { LoginApi } from "core/utils/api";

import "./styles.scss";

type FormData = {
    username: string,
    password: string,
}

function Login() {

    const { register, handleSubmit, formState: { errors}} = useForm();

    const [ hasError, setHasError ] = useState(false);

    function onSubmit(data: FormData) {
        LoginApi(data)
        .then(response => {setHasError(false)})
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
                    <input
                        type="email"
                        className="form-control input-base margin-bottom-30"
                        placeholder="E-mail"
                        {...register("username", { required: true })}
                    />
                    { errors.email && <p>E-mail é obrigatório</p> }

                    <input
                        type="password"
                        className="form-control input-base"
                        placeholder="Senha"
                        {...register("password", { required: true })}
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