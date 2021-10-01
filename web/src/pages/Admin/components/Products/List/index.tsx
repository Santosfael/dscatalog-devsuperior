import { useHistory } from "react-router-dom";

import Card from "../Card";
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

            <div className="admin-list-container">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default List;