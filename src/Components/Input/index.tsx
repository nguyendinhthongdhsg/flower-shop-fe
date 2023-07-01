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
    change?: (e: EventTarget, elementChange: string) => void;
    autoforcus?: boolean;
    autocomplate?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    register,
    required,
    errors,
    change,
    autoforcus,
    autocomplate,
}) => {
    return (
        <div className={cx('wrapper')}>
            <input
                id={id}
                type={type}
                disabled={disabled}
                {...register(id, { required: required })}
                className={cx('input', errors[id] && 'error', disabled && 'disabled')}
                placeholder={label}
                onChange={(e) => {
                    change ? change(e.target, id) : {};
                }}
                spellCheck={false}
                autoFocus={autoforcus}
                autoComplete={autocomplate ? autocomplate : 'off'}
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
