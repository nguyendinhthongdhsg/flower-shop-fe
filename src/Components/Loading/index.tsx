import classNames from 'classnames/bind';
import styles from './LoadingStyle.module.scss';
const cx = classNames.bind(styles);

export default function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('lds-ellipsis')}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
