import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../routes';

import Header from './Header';
import Promotion from './Promotion';
import Footer from './Footer';

import ProductViewModal from './ProductViewModal';

const Layout = () => {
    return (
        <Router>
            <div>
                <Header />
                <div className="container">
                    <div className="main">
                        <Promotion />
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;

                                return <Route className="main" key={index} path={route.path} element={<Page />} />;
                            })}
                        </Routes>
                    </div>
                </div>
                <Footer />
                <ProductViewModal />
            </div>
        </Router>
    );
};

export default Layout;
