'use client';
import classnames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classnames.bind(styles);

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, small, icon }) => {
    return (
        <button
            onClick={onClick}
            className={cx('wrapper', outline && 'outline', small && 'small')}
            disabled={disabled}
        >
            {icon && icon}
            {label}
        </button>
    );
};

export default Button;
