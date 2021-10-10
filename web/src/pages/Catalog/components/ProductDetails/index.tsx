import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow-right.svg';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import ProductPrice from 'core/components/ProductPrice';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';
import { Product } from 'core/types/Product';
import { Api } from 'core/utils/api';
import './styles.scss';

type ParamsType = {
    productId: string;
}

function ProductDetails() {
    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Api({ url: `/products/${productId}` })
            .then(response => setProduct(response.data))
            .finally(() => setIsLoading(false));
    }, [productId]);

    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">
                        VOLTAR
                    </h1>
                </Link>
                <div className="product-details-info">
                    { isLoading ? <ProductInfoLoader /> :
                        <div className = "product-img-price">
                            <div className="product-details-card text-center">
                                <img src={product?.imgUrl} alt={product?.name} className="product-details-image" />
                            </div>
                            <div className="product-info-fields">
                                <h1 className="product-details-name">
                                    {product?.name}
                                </h1>
                                {
                                    product?.price &&
                                    <ProductPrice price={product?.price} />
                                }
                            </div>
                        </div>
                    }

                    <div className="product-details-card">
                        {isLoading ? <ProductDescriptionLoader /> :
                            <>
                                <h1 className="product-description-title">
                                    Descrição do produto
                                </h1>
                                <p className="product-description-text">
                                    {product?.description}
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;