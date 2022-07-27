import React from 'react';
import { Link } from 'react-router-dom';

import Helmet from '../components/Helmet';
import HeroSlide from '../components/HeroSlide';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import PolicyCard from '../components/PolicyCard';
import Classify from '../components/Classify';
import NewArrivals from '../components/NewArrivals';
import ProductCard from '../components/ProductsCard';

import heroSliderData from '../assets/fake-data/hero-slider';
import policy from '../assets/fake-data/policy';
import productData from '../assets/fake-data/products';

const Home = () => {
    return (
        <Helmet title="Trang chủ">
            <HeroSlide data={heroSliderData} />
            <Classify />
            <NewArrivals />
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {policy.map((item, index) => (
                            <Link key={index} to="/policy">
                                <PolicyCard name={item.name} description={item.description} icon={item.icon} />
                            </Link>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Wwekly best</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(8).map((item, index) => (
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
        </Helmet>
    );
};

export default Home;
