'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useLoginModal from '@/hooks/useLoginModal';
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
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);
            if (!callback?.error) {
                toast.success('Đăng nhập thành công');
                reset({
                    email: '',
                    password: '',
                });
                router.refresh();
                loginModal.onClose();
            } else {
                toast.error(callback.error);
            }
        });
    };

    const bodyContent = (
        <div>
            <Heading title="Chào mừng đến Flower Shop" />
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
            isOpen={loginModal.isOpen}
            title="Đăng nhập"
            actionLabel="Đăng nhập"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default Login;
