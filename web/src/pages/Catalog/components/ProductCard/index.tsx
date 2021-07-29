import './styles.scss';
import ProductPrice from '../../../../core/components/ProductPrice';
import { Product } from '../../../../core/types/Product';

type Props = {
    product: Product;
}

function ProductCard({ product }: Props) {
    return (
        <div className="card-base border-radius-10 product-card">
            <img src={product.imgUrl} alt={product.name} className="product-card-img" />
            <div className="product-info">
                <h6 className="product-name">
                    {product.name}
                </h6>
                <ProductPrice price={product.price} />
            </div>
        </div>
    )
}

export default ProductCard;