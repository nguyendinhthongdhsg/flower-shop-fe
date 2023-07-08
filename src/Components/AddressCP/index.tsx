'use client';
import classNames from 'classnames/bind';
import styles from './AddressCP.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface AddressCPProps {
    onClick: () => void;
}

const AddressCP: React.FC<AddressCPProps> = ({ onClick }) => {
    return (
        <div className={cx('wrapper')}>
            <button className={cx('content')} type="button" title="Vị trí" onClick={onClick}>
                <FontAwesomeIcon className={cx('button-icon')} icon={faLocationDot} />
            </button>
        </div>
    );
};

export default AddressCP;
