import { Link } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow-right.svg';
import { ReactComponent as ProdcutImg } from '../../../../core/assets/images/product.svg';
import ProductPrice from '../../../../core/components/ProductPrice';
import './styles.scss';

function ProductDetails() {
    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">
                        VOLTAR
                    </h1>
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        <div className="product-details-card text-center">
                            <ProdcutImg className="product-details-image" />
                        </div>
                        <h1 className="product-details-name">
                            Computador Desktop - Intel Core i7
                        </h1>
                        <ProductPrice price="2.779,00" />
                    </div>
                    
                    <div className="col-6 product-details-card">
                        <h1 className="product-description-title">
                            Descrição do produto
                        </h1>
                        <p className="product-description-text">
                        Seja um mestre em multitarefas com a capacidade para exibir quatro aplicativos simultâneos na tela. 
                        A tela está ficando abarrotada? Crie áreas de trabalho virtuais para obter mais espaço e trabalhar com os itens que você deseja. 
                        Além disso, todas as notificações e principais configurações são reunidas em uma única tela de fácil acesso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;