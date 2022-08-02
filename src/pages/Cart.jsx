import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Helmet from '../components/Helmet';
import Button from '../components/Button';
import CartItem from '../components/CartItem';

import productData from '../assets/fake-data/products';

import numberWithCommas from '../utils/numberWithCommas';

const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

    const [cartProducts, setCartProducts] = useState(productData.getCartItemsDeltail(cartItems));

    const [totalProducts, setTotalProducts] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartProducts(productData.getCartItemsDeltail(cartItems));
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
    }, [cartItems]);

    console.log(cartItems);
    console.log(cartProducts);

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart_info">
                    <div className="cart_info_txt">
                        <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
                        <div className="cart_info_txt_price">
                            <span>Thành tiền</span>
                            <span>{numberWithCommas(totalPrice)} VNĐ</span>
                        </div>
                    </div>
                    <div className="cart_info_btn">
                        {cartItems.length > 0 && (
                            <Link to="/checkout">
                                <Button className="cart_info_btn_checkout" size="block">
                                    Đặt hàng
                                </Button>
                            </Link>
                        )}
                        <Link to="/for-him">
                            <Button size="block">Tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>
                <div className="cart_list">
                    {cartProducts.map((item, index) => (
                        <CartItem item={item} key={index} />
                    ))}
                </div>
            </div>
        </Helmet>
    );
};

export default Cart;
