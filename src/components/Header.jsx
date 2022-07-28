import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import images from '../assets/Images';

const mainNav = [
    {
        display: 'TRANG CHỦ',
        path: '/',
    },
    {
        display: 'NAM',
        path: '/for-him',
    },
    {
        display: 'NỮ',
        path: '/for-her',
    },
    {
        display: 'LIÊN HỆ',
        path: '/contact',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex((e) => e.path === pathname);

    const headerRef = React.useRef(null);

    const cartItems = useSelector((state) => state.cartItems.value);

    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
    }, [cartItems]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        });
        return () => {
            window.removeEventListener('scroll', null);
        };
    }, []);

    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle('active');

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header_logo">
                    <img src={images.logo} alt="" />
                    <Link to="/">
                        <div className="header_logo_txt">SSSTUTER</div>
                    </Link>
                </div>
                <div className="header_menu">
                    <div className="header_menu_mobile-toggle" onClick={menuToggle}>
                        <i className="bx bx-menu-alt-left"></i>
                    </div>
                    <div className="header_menu_left" ref={menuLeft}>
                        <div className="header_menu_left_close" onClick={menuToggle}>
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        {mainNav.map((item, index) => (
                            <div
                                className={`header_menu_item header_menu_left_item ${
                                    index === activeNav ? `active` : ``
                                }`}
                                onClick={menuToggle}
                                key={index}
                            >
                                <Link to={item.path}>
                                    <span>{item.display}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="header_menu_right">
                        <div className="header_menu_item header_menu_right_item">
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="header_menu_item header_menu_right_item">
                            <i className="bx bx-heart"></i>
                        </div>
                        <div className="header_menu_item header_menu_right_item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                            <div className="header_menu_item header_menu_right_item_quantity">{totalProducts}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
