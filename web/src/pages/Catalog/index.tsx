import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Api from '../../core/utils/api';

import ProductCardLoader from './components/Loaders/ProductCardLoader';
import { ProductResponse } from '../../core/types/Product';
import ProductCard from './components/ProductCard';
import './styles.scss';

function Catalog() {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12
        }
        setIsLoading(true);
        Api({
            url: '/products', params
        }).then(response => setProductResponse(response.data))
          .finally(()=> {
            setIsLoading(false);
          });
    },[]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
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
        </div>
    )
}

export default Catalog;