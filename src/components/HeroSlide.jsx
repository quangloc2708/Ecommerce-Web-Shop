import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

// import Button from './Button';

const HeroSlide = (props) => {
    const data = props.data;

    return (
        <div className="hero-slider">
            <div className="hero-slider_item_tablet">
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,

                        rewind: true,

                        autoplay: true,
                        speed: 1000,
                        arrows: false,
                    }}
                >
                    {data.getTabletSliderData().map((item, index) => (
                        <SplideSlide key={index}>
                            <div className="hero-slider_item_image">
                                <img src={item.img} alt="" />
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
            <div className="hero-slider_item_mobile">
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,

                        rewind: true,

                        autoplay: true,
                        speed: 1000,
                        arrows: false,
                    }}
                >
                    {data.getMobileSliderData().map((item, index) => (
                        <SplideSlide className="hero-slider_item_mobile" key={index}>
                            <Link to={item.path}>
                                <div className="hero-slider_item_image">
                                    <img src={item.img} alt="" />
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

HeroSlide.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HeroSlide;
