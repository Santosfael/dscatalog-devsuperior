import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductResponse } from '../../core/types/Product';
import Api from '../../core/utils/api';

import ProductCard from './components/ProductCard';
import './styles.scss';

function Catalog() {

    const [productResponse, setProductResponse] = useState<ProductResponse>();

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12
        }
        Api({
            url: '/products', params
        }).then(response => setProductResponse(response.data));
    },[]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
            <div className="catalog-product">
                {
                    productResponse?.content.map(product => (
                        <Link 
                        to={`/products/product-details/${product.id}`}
                        key={product.id}
                        >
                            <ProductCard product={product} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Catalog;