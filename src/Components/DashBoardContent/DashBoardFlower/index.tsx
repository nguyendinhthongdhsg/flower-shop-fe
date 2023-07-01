'use client';
import classNames from 'classnames/bind';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './DashBoardFlower.module.scss';
import Heading from '@/Components/Heading';
import Input from '@/Components/Input';
import { useState } from 'react';
import Button from '@/Components/Button';

const cx = classNames.bind(styles);

interface DashBoardFlowerProps {
    pathName: string;
}

const DashBoardFlower: React.FC<DashBoardFlowerProps> = ({ pathName }) => {
    const [isLoading, setIsLoading] = useState(true);

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
            price: '',
            id: '',
            directory: '',
            image: [],
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    const change = (event: EventTarget, elementChange: string) => {
        const input = event as HTMLInputElement;
        const value = input.value;
        const elementName = document.querySelector(`.${cx(`demo-products-${elementChange}`)}`);
        if (elementName) {
            elementName.textContent = value;
        }
    };

    if (pathName !== '/dashboard/flower') {
        return null;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <div className={cx('form-product')}>
                        <Heading title="Thêm sản phẩm mới" />
                        <div className={cx('form-content')}>
                            <Input
                                id="name"
                                label="Tên"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                change={change}
                            />
                            <Input
                                id="price"
                                label="Giá (VND)"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                change={change}
                            />
                            <Input
                                id="id"
                                label="ID"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                change={change}
                            />
                            <Input
                                id="directory"
                                label="Danh mục"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                change={change}
                            />
                            <input
                                type="file"
                                id="image"
                                className={cx('input-image')}
                                disabled={isLoading}
                                {...register('image', { required: true })}
                            />
                            <label
                                htmlFor="image"
                                className={cx(
                                    'label-input-image',
                                    errors['image'] && 'error',
                                    isLoading && 'disabled'
                                )}
                            >
                                Thêm ảnh sản phẩm
                            </label>
                            <Button
                                label="Thêm sản phẩm"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className={cx('demo-products')}>
                        <Heading title="Minh họa xem trước" />

                        <div className={cx('demo-products-content')}>
                            <div className={cx('demo-products-information')}>
                                <h4 className={cx('demo-products-name')}></h4>
                                <h4 className={cx('demo-products-price')}></h4>
                                <h4 className={cx('demo-products-id')}></h4>
                                <h4 className={cx('demo-products-directory')}></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardFlower;
