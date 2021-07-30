import { useHistory } from 'react-router-dom';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

function BaseForm({ title, children }: Props) {
    const history = useHistory();

    function handleCancel() {
        history.push('../');
    }

    return (
        <div className="admin-base-form card-base">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
            <div className="base-form-actions">
                <button 
                    className="btn btn-outline-danger border-radius-10 me-3"
                    onClick={handleCancel}
                >
                    CANCELAR
                </button>
                <button className="btn btn-primary border-radius-10 btn-cadastrar">
                    CADASTRAR
                </button>
            </div>
        </div>
    );
};

export default BaseForm;