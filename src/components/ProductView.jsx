import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { addItem } from '../redux/shopping-cart/cartItemsSlice';
import { remove } from '../redux/product-modal/producModalSlice';

import Decription from './Decription';
import Button from './Button';
import Toast from '../utils/toast/Toast';

import numberWithCommas from '../utils/numberWithCommas';

const ProductView = (props) => {
    const dispatch = useDispatch();

    let product = props.product;

    if (product === undefined)
        product = {
            price: 0,
            title: '',
            colors: [],
            size: [],
        };

    const [previewImg, setPreviewImg] = useState(product.image01);

    const [decriptionExpand, setDecriptionExpand] = useState(false);

    const [color, setColor] = useState(undefined);

    const [size, setSize] = useState(undefined);

    const [quantity, setQuantity] = useState(1);

    const [list, setList] = useState([]);
    let toastProperties = null;

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 0 : quantity - 1);
        }
    };
    const showToast = (type) => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Success',
                    description: 'Sản phẩm đã được thêm vào giỏ hàng',
                    color: '#4267b2',
                    icon: 'bx bxs-check-circle success',
                };
                break;
            case 'info-size':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Info',
                    description: 'Vui lòng chọn kích thước',
                    color: '#000',
                    icon: 'bx bxs-info-circle info',
                };
                break;
            case 'info-color':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Info',
                    description: 'Vui lòng chọn màu sắc',
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
        if (color === undefined) {
            showToast('info-color');
            return false;
        }
        if (size === undefined) {
            showToast('info-size');
            return false;
        }

        return true;
    };

    const addToCart = () => {
        if (check()) {
            dispatch(
                addItem({
                    slug: product.slug,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: product.price,
                }),
                remove(),
            );
            showToast('success');
        }
    };

    const navigate = useNavigate();
    const goToCart = () => {
        if (check()) {
            navigate('/cart');
            dispatch(
                addItem({
                    slug: product.slug,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: product.price,
                }),
            );
        }
    };

    const handleClickAddToCart = () => {
        addToCart();
    };

    useEffect(() => {
        setPreviewImg(product.image01);
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);
    }, [product]);

    return (
        <div>
            <div className="product">
                <div className="product_images">
                    <div className="product_images_list">
                        <div className="product_image_list_item" onClick={() => setPreviewImg(product.image01)}>
                            <img src={product.image01} alt="" />
                        </div>
                        <div className="product_image_list_item" onClick={() => setPreviewImg(product.image02)}>
                            <img src={product.image02} alt="" />
                        </div>
                    </div>
                    <div className="product_images_main">
                        <img src={previewImg} alt="" />
                    </div>
                    <div className={`product-decription ${decriptionExpand ? 'expand' : ''}`}>
                        <div className="product-decription_title">Chi tiết sản phẩm</div>
                        <div className="product-decription_name">{product.decription}</div>
                        <p>--</p>
                        <div className="product-decription_info_heading">Thông tin sản phẩm</div>
                        <div className="product-decription_info_item">Màu sắc: {product.color_info}</div>
                        <div className="product-decription_info_item">Kích cỡ: {product.size_info}</div>
                        <div className="product-decription_info_item">Chất liệu: {product.material}</div>
                        <div className="product-decription_info_item">Suất xứ: {product.origin}</div>
                        <Decription />
                        <div className="product-decription_toggle">
                            <Button size="sm" onClick={() => setDecriptionExpand(!decriptionExpand)}>
                                {!decriptionExpand ? 'xem thêm' : 'thu gọn'}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="product_info">
                    <h1 className="product_info_title">{product.title}</h1>
                    <div className="product_info_item">
                        <span className="product_info_item_price">{numberWithCommas(product.price)}</span>
                    </div>
                    <div className="product_info_item">
                        <div className="product_info_item_title">Màu sắc</div>
                        <div className="product_info_item_list">
                            {product.colors.map((item, index) => (
                                <div
                                    className={`product_info_item_list_item ${color === item ? 'active' : ''}`}
                                    key={index}
                                    onClick={() => setColor(item)}
                                >
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product_info_item">
                        <div className="product_info_item_title">Kích cỡ</div>
                        <div className="product_info_item_list">
                            {product.size.map((item, index) => (
                                <div
                                    className={`product_info_item_list_item ${size === item ? 'active' : ''}`}
                                    key={index}
                                    onClick={() => setSize(item)}
                                >
                                    <span className="product_info_item_list_item_size">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product_info_item">
                        <div className="product_info_item_title">Số lượng</div>
                        <div className="product_info_item_quantity">
                            <div className="product_info_item_quantity_btn" onClick={() => updateQuantity('minus')}>
                                <i className="bx bx-minus"></i>
                            </div>
                            <div className="product_info_item_quantity_input">{quantity}</div>
                            <div className="product_info_item_quantity_btn" onClick={() => updateQuantity('plus')}>
                                <i className="bx bx-plus"></i>
                            </div>
                        </div>
                    </div>
                    <div className="product_info_item">
                        <Button size="sm" onClick={() => handleClickAddToCart()}>
                            Thêm vào giỏ hàng
                        </Button>
                        <Button size="sm" onClick={() => goToCart()}>
                            Mua ngay
                        </Button>
                    </div>
                </div>
                <div className={`product-decription mobile ${decriptionExpand ? 'expand' : ''}`}>
                    <div className="product-decription_title">Chi tiết sản phẩm</div>
                    <div className="product-decription_name">{product.decription}</div>
                    <p>--</p>
                    <div className="product-decription_info_heading">Thông tin sản phẩm</div>
                    <div className="product-decription_info_item">Màu sắc: {product.color_info}</div>
                    <div className="product-decription_info_item">Kích cỡ: {product.size_info}</div>
                    <div className="product-decription_info_item">Chất liệu: {product.material}</div>
                    <div className="product-decription_info_item">Suất xứ: {product.origin}</div>
                    <Decription />
                    <div className="product-decription_toggle">
                        <Button size="sm" onClick={() => setDecriptionExpand(!decriptionExpand)}>
                            {!decriptionExpand ? 'xem thêm' : 'thu gọn'}
                        </Button>
                    </div>
                </div>
            </div>
            <Toast toastlist={list} animation={'slideInLeft'} setList={setList} />
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object,
};

export default ProductView;
