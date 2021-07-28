import './styles.scss';
import { ReactComponent as ProductImg } from '../../../../core/assets/images/product.svg';
import ProductPrice from '../../../../core/components/ProductPrice';

function ProductCard() {
    return (
        <div className="card-base border-radius-10 product-card">
            <ProductImg />
            <div className="product-info">
                <h6 className="product-name">
                    Computador Desktop - Intel Core i7
                </h6>
                <ProductPrice price="2.779,00" />
            </div>
        </div>
    )
}

export default ProductCard;