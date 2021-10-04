import { useEffect, useState } from 'react';
import Select from 'react-select';

import { ReactComponent as SearchIcon } from '../../assets/images/search-icon.svg';
import { Category } from 'core/types/Product';
import { Api } from 'core/utils/api';

import './styles.scss';

export type FilterForm = {
    name?: string;
    categoryId?: number;
}

type Props = {
    onSearch: (filter: FilterForm) => void;
}

function ProductFilters({ onSearch }: Props) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        setIsLoadingCategories(true);
        Api({ url: "/categories" })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    function handleChangeName(name: string) {
        setName(name);

        onSearch({ name, categoryId: category?.id });
    };

    function handleChangeCategory(category: Category) {
        setCategory(category);

        onSearch({ name, categoryId: category?.id });
    };

    function clearFilters() {
        setCategory(undefined);
        setName('');
        onSearch({ name: '', categoryId: undefined });
    }

    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar produto"
                    value={name}
                    onChange={event => handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                name="categories"
                key={`select-${category?.id}`}
                value={category}
                options={categories}
                isLoading={isLoadingCategories}
                getOptionLabel={(category: Category) => category.name}
                getOptionValue={(category: Category) => String(category.id)}
                className="filter-select-container"
                classNamePrefix="product-categories-select"
                placeholder="Categorias"
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />

            <button
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
};

export default ProductFilters;