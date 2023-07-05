'use client';
import classNames from 'classnames/bind';
import styles from './DashBoardFlower.module.scss';
import Heading from '@/Components/Heading';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import Button from '@/Components/Button';
import { imageAdd } from '@/assets/images';
import format from '@/hooks/useFormat';
import axios from 'axios';
import { URL_BACKEND } from '@/config';
import { toast } from 'react-hot-toast';
import { TypeFlower } from '@/Types';
import { RiDeleteBin5Line } from 'react-icons/ri';

const cx = classNames.bind(styles);

interface DashBoardFlowerProps {
    pathName: string;
}

const DashBoardFlower: React.FC<DashBoardFlowerProps> = ({ pathName }) => {
    const [imageAddSrc, setImageAddSrc] = useState(imageAdd.src);
    const [isLoading, setIsLoading] = useState(false);
    const [isMouted, setIsMouted] = useState(false);
    const [listFlower, setListFlower] = useState([]);
    let isMoutedDash = true;

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        let checkForm = true;
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const listInput = document.querySelectorAll(`.${cx('input')}`);
        const length = listInput.length;
        console.log(listInput);
        for (let i = 0; i < length; i++) {
            const input = listInput[i] as HTMLInputElement;
            if (!input.value.trim()) {
                checkForm = false;
                validatorInput(input, 'Vui lòng nhập thông tin');
            }
        }
        if (checkForm) {
            setIsLoading(true);

            axios
                .post(URL_BACKEND + '/flower', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => res.data)
                .then((res) => {
                    if (res?.success) {
                        toast.success('Thêm sản phẩm thành công');
                    } else if (res?.error) {
                        toast.error(res?.error);
                    }
                })
                .catch(() => toast.error('Thêm sản phẩm không thành công'))
                .finally(() => setIsLoading(false));
        }
    };

    const change = (event: EventTarget, elementChange: string) => {
        const input = event as HTMLInputElement;
        const value = input.value;
        const elementName = document.querySelector(`.${cx(`demo-product-${elementChange}`)}`);
        if (elementName) {
            if (elementChange === 'price') {
                elementName.textContent = format(Number(value), 'VNĐ').trim();
            } else {
                elementName.textContent = value.trim();
            }
        }
    };

    const validatorInput = (item: HTMLInputElement, option: string) => {
        if (item.type === 'file') {
            if (!item.value) {
                document.querySelector(`.${cx('label-input-image')}`)?.classList.add(cx('error'));
            } else {
                document
                    .querySelector(`.${cx('label-input-image')}`)
                    ?.classList.remove(cx('error'));
            }
        } else {
            if (!item.value.trim()) {
                item.classList.add(cx('error'));
                item.placeholder = option;
            } else {
                item.classList.remove(cx('error'));
            }
        }
    };

    const changeImage = (event: EventTarget) => {
        const inputImage = event as HTMLInputElement;
        if (inputImage && inputImage.files && inputImage.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result === 'string') {
                    setImageAddSrc(event.target.result);
                }
            };
            reader.readAsDataURL(inputImage.files[0]);
        }
    };

    const deleteFlower = (event: EventTarget) => {
        let flower = event as HTMLElement;
        while (!flower.getAttribute('data-index-flower')) {
            if (flower.parentElement !== null) flower = flower.parentElement;
        }
        if (flower) {
            const listFake = [...listFlower];
            listFake.splice(Number(flower.getAttribute('data-index-flower')), 1);
            setListFlower(listFake);
            if (flower.getAttribute('data-id-flower')) {
                axios
                    .delete(URL_BACKEND + '/flower', {
                        data: { id: flower.getAttribute('data-id-flower') },
                    })
                    .then((res) => res.data)
                    .then((res) => {
                        if (res.success) {
                            toast.success('Xóa sản phẩm thành công');
                        } else if (res.error) {
                            toast.error('Xóa sản phẩm thất bại');
                        }
                    })
                    .catch(() => toast.error('Xóa sản phẩm thất bại'));
            }
        }
    };

    useEffect(() => {
        axios
            .get(URL_BACKEND + '/flower')
            .then((res) => res.data)
            .then((res) => {
                setIsMouted(true);
                setListFlower(res);
            })
            .catch(() => console.log('get flower item fail!'));
    }, []);

    useEffect(() => {
        if (isMoutedDash) {
            document.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    console.log('Key Is Enter');
                }
            };
        } else {
            document.removeEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    console.log('Key Is Enter');
                }
            });
        }
    }, [isMoutedDash]);

    if (pathName !== '/dashboard/flower') {
        isMoutedDash = false;
        return null;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <div className={cx('form-product')}>
                        <Heading title="Thêm sản phẩm mới" />
                        <form
                            className={cx('form-content')}
                            method="POST"
                            encType="multipart/form-data"
                            onSubmit={(e) => onSubmit(e)}
                        >
                            <div className={cx('input-item')}>
                                <input
                                    name="name"
                                    disabled={isLoading}
                                    className={cx('input', isLoading && 'disabled')}
                                    id="input-name"
                                    type="text"
                                    onChange={(e) => change(e.target, 'name')}
                                    placeholder="Tên"
                                    spellCheck={false}
                                    onBlur={(e) =>
                                        validatorInput(
                                            e.target as HTMLInputElement,
                                            'Vui lòng nhập thông tin'
                                        )
                                    }
                                />
                                <label
                                    htmlFor="input-name"
                                    className={cx('label', isLoading && 'disabled')}
                                >
                                    Tên
                                </label>
                            </div>
                            <div className={cx('input-item')}>
                                <input
                                    name="price"
                                    disabled={isLoading}
                                    className={cx('input', isLoading && 'disabled')}
                                    id="input-price"
                                    type="number"
                                    onChange={(e) => change(e.target, 'price')}
                                    placeholder="Giá (VNĐ)"
                                    spellCheck={false}
                                    onBlur={(e) =>
                                        validatorInput(
                                            e.target as HTMLInputElement,
                                            'Vui lòng nhập thông tin'
                                        )
                                    }
                                />
                                <label
                                    htmlFor="input-price"
                                    className={cx('label', isLoading && 'disabled')}
                                >
                                    Giá (VNĐ)
                                </label>
                            </div>
                            <div className={cx('input-item')}>
                                <input
                                    name="id"
                                    disabled={isLoading}
                                    className={cx('input', isLoading && 'disabled')}
                                    id="input-id"
                                    type="text"
                                    onChange={(e) => change(e.target, 'id')}
                                    placeholder="ID"
                                    spellCheck={false}
                                    onBlur={(e) =>
                                        validatorInput(
                                            e.target as HTMLInputElement,
                                            'Vui lòng nhập thông tin'
                                        )
                                    }
                                />
                                <label
                                    htmlFor="input-id"
                                    className={cx('label', isLoading && 'disabled')}
                                >
                                    ID
                                </label>
                            </div>

                            <div className={cx('add-image-product')}>
                                <input
                                    name="file"
                                    disabled={isLoading}
                                    type="file"
                                    id="image"
                                    className={cx('input-image', 'input')}
                                    onChange={(e) => changeImage(e.target)}
                                    onBlur={(e) =>
                                        validatorInput(
                                            e.target as HTMLInputElement,
                                            'Vui lòng nhập thông tin'
                                        )
                                    }
                                />
                                <label
                                    htmlFor="image"
                                    className={cx('label-input-image', isLoading && 'disabled')}
                                >
                                    Thêm ảnh sản phẩm
                                </label>
                                <p>(Lưu ý: Nên cắt ảnh thành 1:1 trước khi đăng)</p>
                            </div>
                            <button
                                type="submit"
                                className={cx('btn-submit-form', isLoading && 'disabled')}
                            >
                                Thêm sản phẩm
                            </button>
                        </form>
                    </div>
                    <div className={cx('demo-product')}>
                        <Heading title="Minh họa xem trước" />

                        <div className={cx('demo-product-content')}>
                            <div className={cx('demo-product-card')}>
                                <div className={cx('demo-product-image')}>
                                    <div
                                        className={cx('demo-product-image-img')}
                                        style={{ backgroundImage: `url('${imageAddSrc}')` }}
                                    />
                                </div>
                                <div className={cx('demo-product-information')}>
                                    <div className={cx('demo-product-info')}>
                                        <h4 className={cx('demo-product-name')}></h4>
                                        <h4 className={cx('demo-product-id')}></h4>
                                    </div>
                                    <h4 className={cx('demo-product-price')}></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('list-flower')}>
                    {isMouted && listFlower && listFlower[0] && (
                        <>
                            <Heading title="Danh sách sản phẩm" />
                            <ul className={cx('list')}>
                                {listFlower.map((item: TypeFlower, index: number) => {
                                    return (
                                        <li key={index} className={cx('item')}>
                                            <div className={cx('item-name')}>
                                                <p>{item.name}</p>
                                            </div>
                                            <div className={cx('item-price')}>
                                                <p>{format(Number(item.price), 'VNĐ')}</p>
                                            </div>
                                            <div className={cx('item=id')}>
                                                <p>{item.id}</p>
                                            </div>
                                            <div className={cx('delete-btn')}>
                                                <button
                                                    type="button"
                                                    title="xóa"
                                                    data-id-flower={item.id}
                                                    data-index-flower={index}
                                                    onClick={(e) => deleteFlower(e.target)}
                                                >
                                                    <RiDeleteBin5Line />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                    {isMouted && listFlower && !listFlower[0] && (
                        <Heading title="Danh sách sản phẩm" subtitle="danh sách trống!" />
                    )}
                    {!isMouted && <Heading title="Danh sách sản phẩm" subtitle="Đang tải..." />}
                </div>
            </div>
        </div>
    );
};

export default DashBoardFlower;
