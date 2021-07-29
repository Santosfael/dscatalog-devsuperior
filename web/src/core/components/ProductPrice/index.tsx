import './styles.scss';

type Props = {
    price: number;
}


function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(price);
}

function ProductPrice({ price }: Props) {
    return (
        <div className="product-price-container">
            <span className="product-currency">R$</span>
            <h3 className="product-price">{formatPrice(price)}</h3>
        </div>
    );
}

export default ProductPrice;