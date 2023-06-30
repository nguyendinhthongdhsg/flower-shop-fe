'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/hooks/useRegisterModal';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import Modal from '../Modal';
import Heading from '@/Components/Heading';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { URL_BACKEND } from '@/config';

const Register = () => {
    const registerModal = useRegisterModal();

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
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (expression.test(data?.email)) {
            setIsLoading(true);
            axios
                .post(`${URL_BACKEND}/user/register`, { data: data })
                .then((res) => res.data)
                .then((res) => {
                    if (res?.success) {
                        reset({
                            name: '',
                            email: '',
                            password: '',
                        });
                        registerModal.onClose();
                        toast.success('Đăng ký thành công');
                    } else if (res?.error) {
                        toast.error(res.error);
                    }
                })
                .catch((error) => {
                    toast.error('Đăng ký thất bại');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setError('email', {});
            setValue('email', '');
            setFocus('email');
        }
    };

    const bodyContent = (
        <div id="form-input-register">
            <Heading title="Chào mừng đến Flower Shop" subtitle="Tạo tài khoản" />
            <Input
                id="email"
                label="Email"
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Tên"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Mật khẩu"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div>
            <Button
                onClick={() => {
                    setIsLoading(true);
                    signIn('google');
                }}
                label="Đăng nhập với Google"
                icon={<FcGoogle size={26} />}
                outline={true}
                disabled={isLoading}
            />
            <Button
                onClick={() => {
                    setIsLoading(true);
                    signIn('github');
                }}
                label="Đăng nhập với Github"
                icon={<AiFillGithub size={26} />}
                outline={true}
                disabled={isLoading}
            />
            <Button
                onClick={() => {}}
                label="Đăng nhập với LinkIn"
                icon={<BsLinkedin size={26} />}
                outline={true}
                disabled={isLoading}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Đăng ký"
            actionLabel="Đăng ký"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default Register;
