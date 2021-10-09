import './styles.scss';
import { ReactComponent as ArrowRight } from '../../assets/images/arrow-right.svg';

type Props = {
    text: string;
}

function ButtonIcon({text}: Props) {
    return (
        <div className="default-button">
            <button className="btn btn-primary btn-icon">
                <h5>{text}</h5>
            </button>
            <div className="btn-icon-content">
                <ArrowRight  />
            </div>
        </div>
    );
}

export default ButtonIcon;