import { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { Api, PrivateRequestApi } from 'core/utils/api';
import { Category } from 'core/types/Product';
import BaseForm from '../../BaseForm';
import './styles.scss';
import PriceField from './components/PriceField';

export type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

function Form() {

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [ isLoadingCategories, setIsLoadingCategories ] = useState(false);
    const [ categories, setCategories ] = useState<Category[]>([]);
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
            setValue('categories', response.data.categories);
        });
       }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true);
        Api({url: "/categories"})
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    },[]);

    function onSubmit(data: FormState) {

        PrivateRequestApi({
            url: isEditing ? `/products/${productId}` : "/products",
            method: isEditing ? 'PUT' : 'POST',
            data })
            .then(() => {
                toast.info("Produto salvo com sucesso!");
                history.push('/admin/products');
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
                            <Controller
                                name="categories"
                                control={control}
                                rules={{ required: true }}
                                render={({field}) => (
                                    <Select
                                        {...field} 
                                        options={categories}
                                        isLoading={isLoadingCategories}
                                        getOptionLabel={(category: Category) => category.name}
                                        getOptionValue={(category: Category) => String(category.id)}
                                        classNamePrefix="categories-select"
                                        placeholder="Categorias"
                                        isMulti
                                    />)
                                }
                            />
                            {errors.categories && (
                                <p className="invalid-feedback d-block">
                                    Escolha pelo menos uma categoria
                                </p>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <PriceField control={control} />
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