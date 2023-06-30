'use client';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, label, type, disabled, register, required, errors }) => {
    return (
        <div className={cx('wrapper')}>
            <input
                id={id}
                type={type}
                disabled={disabled}
                {...register(id, { required })}
                className={cx('input', errors[id] && 'error', disabled && 'disabled')}
                placeholder={label}
            />
            <label
                htmlFor={id}
                className={cx('label', errors[id] && 'error', disabled && 'disabled')}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
