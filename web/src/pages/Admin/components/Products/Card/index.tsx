import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Product';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    product: Product;
    onRemove: (productId: number) => void;
}

function Card({ product, onRemove }: Props) {
    return (
        <div className="card-base product-card-admin">
            <div className="text-center border-end py-3">
                <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="product-card-image-admin"
                />
            </div>
            <div className="col-7 py-3">
                <div className="card-content">
                    <h3 className="product-card-name-admin">
                        {product.name}
                    </h3>
                    <ProductPrice price={product.price} />
                    {
                        product.categories.map((category) => (
                            <span className="badge rounded-pill bg-secondary me-2" key={category.id}>
                                {category.name}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="col-3 pt-3 pe-5">
                <div className="d-grid gap-2">
                    <Link
                        to={`/admin/products/${product.id}`}
                        type="button"
                        className="btn btn-outline-secondary border-radius-10 mb-3"
                    >
                        EDITAR
                    </Link>

                    <button
                        onClick={() => onRemove(product.id)}
                        type="button"
                        className="btn btn-outline-danger border-radius-10"
                    >
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;