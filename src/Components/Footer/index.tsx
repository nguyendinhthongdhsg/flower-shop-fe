import classNames from 'classnames/bind';
import styles from './FooterStyle.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
    return (
        <footer>
            <h2 className={cx('heading')}>Footer</h2>
        </footer>
    );
}
