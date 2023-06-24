'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { TypeAddress } from '@/Types';
import Loading from '@/Components/Loading';
// import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderLocation.module.scss';

const cx = classNames.bind(styles);

export default function HeaderLocation() {
    function setMapAddress(address: TypeAddress, latlon: string) {
        const mapWrapper = document.querySelector<HTMLElement>('#mapholder');
        if (mapWrapper) {
            mapWrapper.innerHTML = `
                <p>
                    ${address.suburb}, ${address.city_district}, ${address.city}, ${address.country}.
                </p>
                <a href="https://www.google.com/maps/@${latlon}z?entry=ttu" target='_blank'>
                    Địa chỉ của bạn trên Google Map
                </a>
            `;
            const variableSetTimeout = setTimeout(() => {
                mapWrapper.style.display = 'none';
            }, 5000);

            return () => clearTimeout(variableSetTimeout);
        }
    }

    function handleLocate() {
        if (navigator.geolocation) {
            const mapWrapper = document.querySelector<HTMLElement>('#mapholder');
            if (mapWrapper) mapWrapper.style.display = 'flex';
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                    fetch(url)
                        .then((res) => res.json())
                        .then((data) => {
                            setMapAddress(data.address, latitude + ',' + longitude);
                        })
                        .catch(() => console.log('ERROR fetching location data from API'));
                },
                () => console.log('ERROR')
            );
        }
    }

    return (
        <div className={cx('wrapper')}>
            <button
                className={cx('content')}
                title="Vị trí"
                onClick={() => handleLocate()}
                type="button"
            >
                <FontAwesomeIcon icon={faLocationDot} className={cx('icon')} />
            </button>
            <div id="mapholder" className={cx('address-user')}>
                <Loading />
            </div>
        </div>
    );
}
