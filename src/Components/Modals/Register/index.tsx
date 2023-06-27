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

const Register = () => {
    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            passwork: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <div>
            <Heading title="Chào mừng đến Flower Shop" subtitle="Tạo tài khoản" />
            <Input
                id="email"
                label="Email"
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
                onClick={() => {}}
                label="Tiếp tục với Google"
                icon={<FcGoogle size={26} />}
                outline={true}
            />
            <Button
                onClick={() => {}}
                label="Tiếp tục với Github"
                icon={<AiFillGithub size={26} />}
                outline={true}
            />
            <Button
                onClick={() => {}}
                label="Tiếp tục với LinkIn"
                icon={<BsLinkedin size={26} />}
                outline={true}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Đăng ký"
            actionLabel="Tiếp tục"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default Register;
