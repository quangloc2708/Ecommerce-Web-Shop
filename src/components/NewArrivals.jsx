import React from 'react';

import ProductCard from './ProductsCard';
import Section, { SectionTitle } from './Section';

import productData from '../assets/fake-data/products';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const NewArrivals = () => {
    return (
        <section className="new-arrivals_slide">
            <Section>
                <SectionTitle>What's new</SectionTitle>
            </Section>
            <div className="product-slider">
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 4,

                        pagination: false,

                        rewind: true,

                        autoplay: true,
                        speed: 1000,
                        arrows: false,
                        breakpoints: {
                            640: {
                                perPage: 1,
                            },
                            940: {
                                perPage: 2,
                            },
                            1200: {
                                perPage: 4,
                            },
                        },
                    }}
                >
                    {productData.getAllProducts().map((item, index) => (
                        <SplideSlide key={index}>
                            <ProductCard
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    );
};

export default NewArrivals;
