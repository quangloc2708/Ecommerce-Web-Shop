import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Grid from '../components/Grid';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import Toast from '../utils/toast/Toast';
import Address from '../components/Address';

import { useSelector } from 'react-redux';
import { removeAllItem } from '../redux/shopping-cart/cartItemsSlice';
import { useDispatch } from 'react-redux/es/exports';

import productData from '../assets/fake-data/products';

import numberWithCommas from '../utils/numberWithCommas';

const payment = [
    {
        id: 1,
        icon: 'bx bxl-visa',
        display: 'Thanh toán thẻ (ATM, Visa , MasterCard)',
    },
    {
        id: 2,
        icon: 'bx bx-wallet',
        display: 'Thanh toán bằng ví ShopeePay',
    },
    {
        id: 3,
        icon: 'bx bxs-truck',
        display: 'Thanh toán khi giao hàng (COD)',
    },
];
const transportFee = '20000';

const Checkout = () => {
    const cartItems = useSelector((state) => state.cartItems.value);
    const [cartProducts, setCartProducts] = useState(productData.getCartItemsDeltail(cartItems));
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartProducts(productData.getCartItemsDeltail(cartItems));
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
    }, [cartItems]);

    const [checked, setchecked] = useState();
    const initialValues = { username: '', email: '', phoneNumber: '', address: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phoneNumberPattern = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
        if (!values.username) {
            errors.username = 'Vui lòng nhập tên!';
        }
        if (!values.address) {
            errors.address = 'Vui lòng nhập địa chỉ cụ thể!';
        }
        if (!values.email) {
            errors.email = 'Vui lòng nhập email!';
        } else if (!regex.test(values.email)) {
            errors.email = 'Vui lòng nhập đúng email!';
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Vui lòng nhập số điện thoại!';
        } else if (!phoneNumberPattern.test(values.phoneNumber)) {
            errors.phoneNumber = 'Vui lòng nhập đúng số điện thoại!';
        }
        showToast('info-user');
        return errors;
    };

    const [list, setList] = useState([]);
    let toastProperties = null;
    const showToast = (type) => {
        switch (type) {
            case 'info-payment':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Lưu ý:',
                    description: 'Vui lòng chọn phương thức thanh toán',
                    color: '#000',
                    icon: 'bx bxs-info-circle info',
                };
                break;
            case 'info-user':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Lưu ý:',
                    description: 'Vui lòng nhập đầy đủ và đúng thông tin',
                    color: '#000',
                    icon: 'bx bxs-info-circle info',
                };
                break;
            case 'info-cart-empty':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Lưu ý:',
                    description: 'Không có sản phẩm nào trong giỏ hàng',
                    color: '#000',
                    icon: 'bx bxs-info-circle info',
                };
                break;
            default:
                toastProperties = [];
        }
        setList([...list, toastProperties]);
    };

    const check = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const phoneNumberPattern = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
        if (formValues.username === '') {
            return false;
        }
        if (formValues.address === '') {
            return false;
        }
        if (formValues.email === '') {
            return false;
        } else if (!regex.test(formValues.email)) {
            return false;
        }
        if (formValues.phoneNumber === '') {
            return false;
        } else if (!phoneNumberPattern.test(formValues.phoneNumber)) {
            return false;
        }
        if (!checked) {
            showToast('info-payment');
            return false;
        }
        if (cartProducts.length === 0) {
            showToast('info-cart-empty');
            return false;
        }

        return true;
    };

    const dispatch = useDispatch();
    const removeCartItem = () => {
        dispatch(removeAllItem());
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        //Call API
        console.log(cartProducts);

        console.log(formValues, { idPayment: checked });

        setFormErrors(validate(formValues));

        if (check()) {
            removeCartItem();
            navigate('/success');
        }
    };

    return (
        <div className="checkout">
            <Grid col={2} mdCol={2} smCol={1} gap={20}>
                <div>
                    <div className="checkout_info checkout_info_user ">
                        <h2 className="checkout_info_item">Thông tin giao hàng</h2>
                        <div className="checkout_info_item">
                            <input
                                type="text"
                                placeholder="* Họ và tên"
                                name="username"
                                value={formValues.username}
                                onChange={(e) => handleChange(e)}
                            />
                            <p>{formErrors.username}</p>
                        </div>
                        <div className="checkout_info_item">
                            <input
                                type="email"
                                placeholder="*Email"
                                name="email"
                                value={formValues.email}
                                onChange={(e) => handleChange(e)}
                            />
                            <p>{formErrors.email}</p>
                        </div>
                        <div className="checkout_info_item">
                            <input
                                type="text"
                                placeholder="* Số điện thoại"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                onChange={(e) => handleChange(e)}
                            />
                            <p>{formErrors.phoneNumber}</p>
                        </div>
                        <div className="checkout_info_item">
                            <Address />
                        </div>
                        <div className="checkout_info_item">
                            <input
                                type="text"
                                placeholder="* Số nhà tên đường..."
                                name="address"
                                value={formValues.address}
                                onChange={(e) => handleChange(e)}
                            />
                            <p>{formErrors.address}</p>
                        </div>
                        <p>(*) là trường không được để trống</p>
                    </div>
                    <div className="checkout_info">
                        <h2 className="checkout_info_item">Phương thức thanh toán</h2>
                        {payment.map((item) => (
                            <div
                                // ref={paymentRef}
                                className="checkout_info_payment"
                                key={item.id}
                                onClick={() => setchecked(item.id)}
                            >
                                <input
                                    className="checkout_info_payment_input"
                                    type="radio"
                                    id={item.id}
                                    onChange={() => setchecked(item.id)}
                                    checked={checked === item.id}
                                />
                                <i className={`checkout_info_payment_icon ${item.icon}`}></i>
                                <label className="checkout_info_payment_txt">{item.display}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="checkout_confirm">
                    <div className="cart checkout_confirm_product ">
                        <div className="cart_list">
                            {cartProducts.map((item, index) => (
                                <CartItem item={item} key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="checkout_confirm_list">
                        <input type="text" placeholder="Mã giảm giá..." />
                        <button className="checkout_confirm_list_btn">Áp dụng</button>
                        <div className="checkout_confirm_list_item">
                            <h4>Tổng:</h4>
                            <h4>{numberWithCommas(totalPrice)} VNĐ</h4>
                        </div>
                        <div className="checkout_confirm_list_item">
                            <span>Ưu đãi:</span>
                            <span>-0 VNĐ</span>
                        </div>
                        <div className="checkout_confirm_list_item">
                            <span>Phí ship</span>
                            <span>{numberWithCommas(transportFee)} VNĐ</span>
                        </div>
                        <div className="checkout_confirm_list_item">
                            <h4>Thành tiền:</h4>
                            <h4>{numberWithCommas(Number(transportFee) + Number(totalPrice))} VNĐ</h4>
                        </div>
                        <Button onClick={() => handleSubmit()} size="large">
                            Hoàn tất đơn hàng
                        </Button>
                    </div>
                </div>
            </Grid>
            <Toast toastlist={list} animation={'slideInLeft'} setList={setList} />
        </div>
    );
};

export default Checkout;
