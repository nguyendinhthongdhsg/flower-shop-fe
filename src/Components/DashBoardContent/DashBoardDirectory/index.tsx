'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './DashBoardDirectory.module.scss';
import Heading from '@/Components/Heading';
import Input from '@/Components/Input';
import { useEffect, useState, useCallback } from 'react';
import Button from '@/Components/Button';
import axios from 'axios';
import { URL_BACKEND } from '@/config';
import { toast } from 'react-hot-toast';
import { TypeDirectory } from '@/Types';
import { RiDeleteBin5Line } from 'react-icons/ri';

const cx = classNames.bind(styles);

interface DashBoardDirectoryProps {
    pathName: string;
}

const DashBoardDirectory: React.FC<DashBoardDirectoryProps> = ({ pathName }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listDirectory, setListDireectory] = useState([]);
    const [isMouted, setIsMouted] = useState(false);
    let isMoutedDash = true;

    useEffect(() => {
        axios
            .get(URL_BACKEND + '/directory')
            .then((res) => res.data)
            .then((res) => {
                setIsMouted(true);
                setListDireectory(res);
            })
            .catch(() => console.log('get directory falure!'));
    }, []);

    function deleteDirectory(event: EventTarget) {
        let dir = event as HTMLElement;
        while (!dir.getAttribute('data-index-directory')) {
            if (dir.parentElement !== null) {
                dir = dir.parentElement;
            }
        }
        if (dir) {
            const listFake = [...listDirectory];
            listFake.splice(Number(dir.getAttribute('data-index-directory')), 1);
            setListDireectory(listFake);
            if (dir.getAttribute('data-id-directory')) {
                axios
                    .delete(URL_BACKEND + '/directory', {
                        data: { id: dir.getAttribute('data-id-directory') },
                    })
                    .then((res) => res.data)
                    .then((res) => {
                        if (res.success) {
                            toast.success('Xóa danh mục thành công');
                        } else if (res.error) {
                            toast.error('Xóa danh mục thất bại');
                        }
                    })

                    .catch(() => {
                        toast.error('Xóa danh mục thất bại');
                    });
            }
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            id: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = useCallback(
        (data) => {
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
                        const listFake: FieldValues = [...listDirectory];
                        listFake.push({ ...data, _id: '' });
                        setListDireectory(listFake as never[]);
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
        },
        [listDirectory, reset]
    );

    const change = (e: EventTarget, id: string) => {
        const input = e as HTMLInputElement;
        const password = input.value;
        setValue(id, password);
    };

    useEffect(() => {
        if (isMoutedDash) {
            document.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    console.log('Key Is Enter');
                    handleSubmit(onSubmit)();
                }
            };
        } else {
            document.onkeydown = () => {};
        }
    }, [isMoutedDash, handleSubmit, onSubmit]);

    if (pathName !== '/dashboard/directory') {
        isMoutedDash = false;
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
                            change={change}
                            autoforcus={true}
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
                    </div>
                    <Button
                        label="Thêm danh mục"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading}
                    />
                </div>
                <div className={cx('delete')}>
                    {isMouted && listDirectory && listDirectory[0] && (
                        <>
                            <Heading title="Danh mục hoa" />
                            <ul className={cx('list-directory')}>
                                {listDirectory.map((item: TypeDirectory, index: number) => {
                                    return (
                                        <li key={index} className={cx('item-directory')}>
                                            <div>
                                                <p className={cx('name')}>Tên: &nbsp;{item.name}</p>
                                            </div>
                                            <div className={cx('id-directory')}>
                                                <p className={cx('id')}>ID: &nbsp;{item.id}</p>
                                            </div>
                                            <div className={cx('delete-btn')}>
                                                <button
                                                    type="button"
                                                    title="xóa"
                                                    data-id-directory={item.id}
                                                    data-index-directory={index}
                                                    onClick={(e) => deleteDirectory(e.target)}
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
                    {isMouted && listDirectory && !listDirectory[0] && (
                        <Heading title="Danh mục hoa" subtitle="danh sách trống!" />
                    )}
                    {!isMouted && <Heading title="Danh mục hoa" subtitle="Đang tải..." />}
                </div>
            </div>
        </div>
    );
};

export default DashBoardDirectory;
