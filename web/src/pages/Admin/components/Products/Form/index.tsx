import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { Api, PrivateRequestApi } from 'core/utils/api';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useEffect } from 'react';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
}

type ParamsType = {
    productId: string;
}

function Form() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? "editar produto" : "cadastrar um produto";
    const formButton = isEditing ? "SALVAR" : "CADASTRAR";

    useEffect(() => {
       if(isEditing) {
        Api({url: `/products/${productId}`})
        .then(response => {
            setValue('name', response.data.name);
            setValue('price', response.data.price);
            setValue('description', response.data.description);
            setValue('imgUrl', response.data.imgUrl);
        });
       }
    }, [productId, isEditing, setValue]);

    function onSubmit(data: FormState) {

        PrivateRequestApi({
            url: isEditing ? `/products/${productId}` : "/products",
            method: isEditing ? 'PUT' : 'POST',
            data })
            .then(() => {
                toast.info("Produto salvo com sucesso!");
                history.push('admin/products');
            })
            .catch(() => {
                toast.error("Erro ao salvar o produto!");
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
                title={formTitle}
                labelButton={formButton}
            >
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do Produto"
                                {...register("name", {
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 5,
                                        message: "O campo teve ter no mínimo 5 caracteres"
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "O campo deve ter no máximo 60 caracteres"
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="invalid-feedback d-block">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input
                                type="number"
                                {...register("price", { required: "Campo obrigatório" })}
                                placeholder="Preço"
                                className="form-control input-base"
                            />

                            {errors.price && (
                                <p className="invalid-feedback d-block">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input
                                type="text"
                                {...register("imgUrl", { required: "Campo obrigatório" })}
                                placeholder="Url da imagem"
                                className="form-control input-base"
                            />

                            {errors.imgUrl && (
                                <p className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </p>
                            )}
                        </div>

                        {/* <select 
                            name="category"
                            value={formData.category}
                            className="form-select mb-5 input-base"
                            onChange={handleOnChange}
                            aria-label="Selecione uma categoria"
                        >
                            <option selected>Selecione uma categoria</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                            <option value="1">Livros</option>
                        </select> */}
                    </div>
                    <div className="col-6">
                        <textarea
                            {...register("description", { required: "Campo obrigatório" })}
                            className="form-control"
                            placeholder="Descrição"
                            cols={30}
                            rows={10}
                        />

                        {errors.description && (
                            <p className="invalid-feedback d-block">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
};

export default Form;