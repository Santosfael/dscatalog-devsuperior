import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import { Api } from 'core/utils/api';
import './styles.scss';

type FormState = {
    name: string;
    category: string;
    price: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

function Form() {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        category:'',
        price: '',
        description: '',
    });

    function handleOnChange(
            event: FormEvent) {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value}));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://cdn.awsli.com.br/600x450/241/241991/produto/67389676/f4d6c341cb.jpg',
            categories: [{id: formData.category}]
        }
        
        Api({url:"/products", method:'POST', data: payload})
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            placeholder="Nome do Produto"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                        />

                        <select
                            name="category"
                            value={formData.category}
                            className="form-select mb-5"
                            onChange={handleOnChange}
                            aria-label="Selecione uma categoria"
                        >
                            <option selected>Selecione uma categoria</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                            <option value="1">Livros</option>
                        </select>

                        <input 
                            type="text"
                            value={formData.price}
                            name="price"
                            placeholder="Preço"
                            className="form-control"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            value={formData.description}
                            className="form-control"
                            onChange={handleOnChange}
                            cols={30}
                            rows={10}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    );
};

export default Form;