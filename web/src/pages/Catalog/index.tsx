import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Api } from '../../core/utils/api';

import ProductFilters from 'core/components/ProductFilters';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import { Category, ProductResponse } from '../../core/types/Product';
import Pagination from 'core/components/Pagination';
import ProductCard from './components/ProductCard';
import './styles.scss';

function Catalog() {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name,
            categoryId: category?.id,
        }
        setIsLoading(true);
        Api({
            url: '/products', params
        }).then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage, name, category]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    function handleChangeName(name: string) {
        setActivePage(0);
        setName(name);
    };

    function handleChangeCategory(category: Category) {
        setActivePage(0);
        setCategory(category);
    };

    function clearFilters() {
        setActivePage(0);
        setCategory(undefined);
        setName('');
    }

    return (
        <div className="catalog-container">
            <div className="filter-container">
                <h1 className="catalog-title">Catálogo de produtos</h1>
                <ProductFilters
                    name={name}
                    category={category}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                />
            </div>
            <div className="catalog-product">

                {
                    isLoading ? <ProductCardLoader /> : (
                        productResponse?.content.map(product => (
                            <Link
                                to={`/products/product-details/${product.id}`}
                                key={product.id}
                            >
                                <ProductCard product={product} />
                            </Link>
                        ))
                    )
                }
            </div>
            {
                productResponse && (
                    <Pagination
                        totalPages={productResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )
            }
        </div>
    )
}

export default Catalog;