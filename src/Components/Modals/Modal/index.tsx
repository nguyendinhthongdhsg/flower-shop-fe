'use client';
import classnames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '@/Components/Button';

const cx = classnames.bind(styles);

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('modal')}>
                    {/* Header */}
                    <header className={cx('header')}>
                        <button
                            type="button"
                            className={cx('button-close')}
                            onClick={handleClose}
                            title="Đóng"
                        >
                            <FontAwesomeIcon icon={faXmark} className={cx('button-close-icon')} />
                        </button>
                        <h1 className={cx('heading')}>{title}</h1>
                    </header>
                    {/* Body */}
                    <div className={cx('body')}>
                        <div className={cx('content-body')}>
                            {body}
                            {/* Footer */}

                            <div className={cx('footer')}>
                                <div className={cx('content')}>
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
