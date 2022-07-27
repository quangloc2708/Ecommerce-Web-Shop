import React from 'react';
import { useParams } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import Helmet from '../components/Helmet';
import Section, { SectionBody, SectionOther } from '../components/Section';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductsCard';
import ProductView from '../components/ProductView';

import productData from '../assets/fake-data/products';

const Product = (props) => {
    const { slug } = useParams();

    const product = productData.getProductBySlug(slug);

    let productList = [];
    if (product.gender === 'nu') {
        productList = productData.getProductByGender('nu');
    } else {
        productList = productData.getProductByGender('nam');
    }

    const getProducts = (count) => {
        const max = productList.length - count;
        const min = 0;
        const start = Math.floor(Math.random() * (max - min) + min);
        return productList.slice(start, start + count);
    };

    const relatedProducts = getProducts(4);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product} />
                </SectionBody>
            </Section>
            <Section>
                <SectionOther>Sản phẩm tương tự</SectionOther>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {relatedProducts.map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            <Section>
                <SectionOther>Sản phẩm được yêu thích</SectionOther>
                <SectionBody>
                    <Splide
                        options={{
                            type: 'loop',
                            perPage: 5,
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
                        {productData.getProducts(10).map((item, index) => (
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
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Product;
