import { useHistory } from "react-router-dom";

import './styles.scss';

function List() {
    const history = useHistory();

    function handleCreate() {
        history.push('/admin/products/create');
    };

    return (
        <div className="admin-product-list">
            <button className="btn btn-primary btn-lg btn-add" onClick={handleCreate}>
                ADICIONAR
            </button>
        </div>
    );
};

export default List;