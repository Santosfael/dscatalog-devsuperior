import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow-right.svg';
import GenerateList from 'core/utils/list';
import './styles.scss';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

function Pagination({ totalPages, activePage, onChange }: Props) {
    const item = GenerateList(totalPages);
    const previousClass = totalPages > 0 && activePage > 0 ? 'page-active' : 'page-inactive';
    const nextClass = (activePage + 1) < totalPages ? 'page-active' : 'page-inactive';
    return (
        <div className="pagination-container">
            <ArrowIcon
                className={`pagination-previous ${previousClass}`}
                onClick={() => onChange(activePage - 1)}
            />
            {
                item.map(item => (
                    <div 
                        className={
                            `pagination-item ${item === activePage ? 'active': ''}`
                        }
                        key={item}
                        onClick={() => onChange(item)}
                    >
                        {item+1}
                    </div>
                ))
            }
            <ArrowIcon 
                className={`pagination-next ${nextClass}`}
                onClick={() => onChange(activePage + 1)}
            />
        </div>
    );
}

export default Pagination;