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
import ImageUpload from '../ImageUpload';

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
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [productImgUrl, setProductImgUrl] = useState('');

    const isEditing = productId !== 'create';
    const formTitle = isEditing ? "editar produto" : "cadastrar um produto";
    const formButton = isEditing ? "SALVAR" : "CADASTRAR";

    useEffect(() => {
        if (isEditing) {
            Api({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('categories', response.data.categories);

                    setProductImgUrl(response.data.imgUrl);
                });
        }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true);
        Api({ url: "/categories" })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    function onSubmit(data: FormState) {
        const payload = {
            ...data,
            imgUrl: uploadedImgUrl || productImgUrl
        }
        PrivateRequestApi({
            url: isEditing ? `/products/${productId}` : "/products",
            method: isEditing ? 'PUT' : 'POST',
            data: payload
        })
            .then(() => {
                toast.info("Produto salvo com sucesso!");
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error("Erro ao salvar o produto!");
            });
    };

    function onUploadSuccess(imgUrl: string) {
        setUploadedImgUrl(imgUrl);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm
                title={formTitle}
                labelButton={formButton}
            >
                <div className="product-form-container">
                    <div className="container-info">
                        <div className="margin-bottom-30">
                            <input
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do Produto"
                                {...register("name", {
                                    required: "Campo obrigat??rio",
                                    minLength: {
                                        value: 5,
                                        message: "O campo teve ter no m??nimo 5 caracteres"
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "O campo deve ter no m??ximo 60 caracteres"
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
                                render={({ field }) => (
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
                            <ImageUpload onUploadSuccess={onUploadSuccess} productImgUrl={productImgUrl} />
                        </div>
                    </div>
                    <div className="container-info">
                        <textarea
                            {...register("description", { required: "Campo obrigat??rio" })}
                            className="form-control"
                            placeholder="Descri????o"
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