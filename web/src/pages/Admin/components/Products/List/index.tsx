import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { ProductResponse } from "core/types/Product";
import Pagination from "core/components/Pagination";
import { Api } from "core/utils/api";

import Card from "../Card";
import './styles.scss';

function List() {
    const history = useHistory();
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    function handleCreate() {
        history.push('/admin/products/create');
    };

    useEffect(() => {
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
    },[activePage]);

    return (
        <div className="admin-product-list">
            <button className="btn btn-primary btn-lg btn-add" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-list-container">
                {
                    productResponse?.content.map((product) => (
                        <Card product={product} key={product.id} />
                    ))
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