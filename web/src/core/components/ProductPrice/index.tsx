import './styles.scss';

type Props = {
    price: string;
}

function ProductPrice({ price }: Props) {
    return (
        <div className="product-price-container">
            <span className="product-currency">R$</span>
            <h3 className="product-price">{price}</h3>
        </div>
    );
}

export default ProductPrice;