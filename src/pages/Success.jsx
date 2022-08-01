import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Success = () => {
    return (
        <div className="page_success">
            <h2>Bạn đã đặt hàng thành công!</h2>
            <div className="page_success_txt">
                <span>Chúng tôi sẽ liên lạc với bạn qua số điện thoại để xác nhận lại đơn hàng. </span>
                <span>Xin chân thành cảm ơn quý khách!</span>
            </div>
            <Link to="/for-him">
                <Button size="sm">Tiếp tục mua hàng</Button>
            </Link>
        </div>
    );
};

export default Success;
