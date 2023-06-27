'use client';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

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
        <div className="w-full relative">
            <input id={id} type={type} disabled={disabled} {...register(id, { required })} />

            <label>{label}</label>
        </div>
    );
};

export default Input;
