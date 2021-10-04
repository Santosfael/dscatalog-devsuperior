import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Api, PrivateRequestApi } from "core/utils/api";
import { ProductResponse } from "core/types/Product";
import Pagination from "core/components/Pagination";
import CardLoader from "../Loaders/CardLoader";

import Card from "../Card";
import './styles.scss';

function List() {
    const history = useHistory();
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        setIsLoading(true);
        Api({
            url: '/products', params
        }).then(response => setProductResponse(response.data))
          .finally(()=> {
            setIsLoading(false);
          });
    }, [activePage]);

    function handleCreate() {
        history.push('/admin/products/create');
    };

    useEffect(() => {
        getProducts();
    },[getProducts]);

    function onRemove(productId: number) {
        const confirm = window.confirm("Deseja realmente excluir?");
        if(confirm) {
            PrivateRequestApi({url: `/products/${productId}`, method: 'DELETE'})
            .then(() => {
                toast.info("Produto removido com sucesso!");
                getProducts();
            })
            .catch(() => {
                toast.error("Erro ao remover o produto!");
            });
        }
        
    }

    return (
        <div className="admin-product-list">
            <button className="btn btn-primary btn-lg btn-add" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-list-container">
            {
                    isLoading ? <CardLoader /> : (
                        productResponse?.content.map((product) => (
                            <Card product={product} key={product.id} onRemove={onRemove} />
                        ))
                    )
                }
                {
                productResponse && (
                    <Pagination 
                        totalPages={productResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )
            }
            </div>
        </div>
    );
};

export default List;