import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Promotion = () => {
    return (
        <div className="promotion_popup">
            <Splide
                options={{
                    type: 'loop',
                    perPage: 1,
                    rewind: true,
                    autoplay: true,
                    speed: 1000,
                    arrows: false,
                    pagination: false,
                }}
            >
                <SplideSlide>
                    <div className="promotion_popup_item">Đồng giá ship chỉ 10.000 cho đơn nội thành</div>
                </SplideSlide>
                <SplideSlide>
                    <div className="promotion_popup_item">Đồng giá ship chỉ 20.000 cho đơn toàn quốc</div>
                </SplideSlide>
                <SplideSlide>
                    {' '}
                    <div className="promotion_popup_item">Ưu đãi giảm 10.000 khi thanh toán trả trước</div>
                </SplideSlide>
            </Splide>
        </div>
    );
};

export default Promotion;
