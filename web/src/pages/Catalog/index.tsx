import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Api } from '../../core/utils/api';

import ProductCardLoader from './components/Loaders/ProductCardLoader';
import ProductFilters, { FilterForm } from 'core/components/ProductFilters';
import { ProductResponse } from '../../core/types/Product';
import Pagination from 'core/components/Pagination';
import ProductCard from './components/ProductCard';
import './styles.scss';

function Catalog() {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: filter?.name,
            categoryId: filter?.categoryId,
        }
        setIsLoading(true);
        Api({
            url: '/products', params
        }).then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div className="catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className="catalog-title">Catálogo de produtos</h1>
                <ProductFilters onSearch={filter => getProducts(filter)} />
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