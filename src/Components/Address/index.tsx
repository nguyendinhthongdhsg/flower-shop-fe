'use client';

import classnames from 'classnames/bind';
import styles from './Addres.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading';
import { TypeAddress } from '@/Types';

const cx = classnames.bind(styles);

const Address = () => {
    function setMapAddress(address: TypeAddress, latlon: string, mapWrapper: HTMLElement) {
        if (mapWrapper) {
            mapWrapper.innerHTML = `
                <p>
                    ${address.suburb}, ${address.city_district}, ${address.city}, ${address.country}.
                </p>
                <a href="https://www.google.com/maps/@${latlon}z?entry=ttu" target='_blank'>
                    Địa chỉ của bạn trên Google Maps
                </a>
            `;
            const variableSetTimeout = setTimeout(() => {
                mapWrapper.setAttribute('data-type', 'open');
                mapWrapper.style.display = 'none';
            }, 2500);

            return () => clearTimeout(variableSetTimeout);
        }
    }

    function showAddress() {
        const mapWrapper = document.querySelector<HTMLElement>('#mapholder');
        if (
            navigator.geolocation &&
            mapWrapper &&
            mapWrapper.getAttribute('data-type') === 'open'
        ) {
            mapWrapper.setAttribute('data-type', 'close');
            mapWrapper.style.display = 'flex';
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                    fetch(url)
                        .then((res) => res.json())
                        .then((data) => {
                            setMapAddress(data.address, latitude + ',' + longitude, mapWrapper);
                        })
                        .catch(() => console.log('ERROR fetching location data from API'));
                },
                () => console.log('ERROR')
            );
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <button className={cx('button')} title="Vị trí" type="button" onClick={showAddress}>
                    <FontAwesomeIcon className={cx('button-icon')} icon={faLocationDot} />
                </button>
                <div id="mapholder" className={cx('address')} data-type="open">
                    <Loading />
                </div>
            </div>
        </div>
    );
};

export default Address;
