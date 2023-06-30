'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './DashBoardDirectory.module.scss';
import Heading from '@/Components/Heading';
import Input from '@/Components/Input';
import { useState } from 'react';
import Button from '@/Components/Button';
import axios from 'axios';
import { URL_BACKEND } from '@/config';
import { toast } from 'react-hot-toast';

const cx = classNames.bind(styles);

interface DashBoardDirectoryProps {
    pathName: string;
}

const DashBoardDirectory: React.FC<DashBoardDirectoryProps> = ({ pathName }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        setFocus,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            id: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post(URL_BACKEND + '/directory', { directory: data })
            .then((res) => res.data)
            .then((res) => {
                if (res?.success) {
                    reset({
                        name: '',
                        id: '',
                    });
                    toast.success('Thêm danh mục thành công');
                } else if (res?.error) {
                    toast.error(res.error);
                }
            })
            .catch(() => {
                toast.error('Thêm danh mục thất bại');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (pathName !== '/dashboard/home') {
        return null;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <Heading title="Thêm danh mục hoa mới" />
                    <div className={cx('form-content')}>
                        <Input
                            id="name"
                            label="Tên"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="id"
                            label="Id"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                    <Button
                        label="Thêm danh mục"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading}
                    />
                </div>
                <div className={cx('delete')}></div>
            </div>
        </div>
    );
};

export default DashBoardDirectory;
