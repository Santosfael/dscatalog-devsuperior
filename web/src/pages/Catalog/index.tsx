import { Link } from 'react-router-dom';

import ProductCard from './components/ProductCard';
import './styles.scss';

function Catalog() {
    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
            <div className="catalog-product">
                <Link to="/products/product-details/1"><ProductCard /></Link>
                <Link to="/products/product-details/2"><ProductCard /></Link>
                <Link to="/products/product-details/3"><ProductCard /></Link>
                <Link to="/products/product-details/4"><ProductCard /></Link>
                <Link to="/products/product-details/5"><ProductCard /></Link>
                <Link to="/products/product-details/6"><ProductCard /></Link>
                <Link to="/products/product-details/7"><ProductCard /></Link>
                <Link to="/products/product-details/8"><ProductCard /></Link>
                <Link to="/products/product-details/9"><ProductCard /></Link>
            </div>
        </div>
    )
}

export default Catalog;