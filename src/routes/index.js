// Layouts

// Pages
import Home from '../pages/Home';
import CatalogForHim from '../pages/CatalogForHim';
import CatalogForHer from '../pages/CatalogForHer';
import Product from '../pages/Product';
import Cart from '../pages/Cart';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/for-him', component: CatalogForHim },
    { path: '/for-her', component: CatalogForHer },
    { path: '/catalog/:slug', component: Product },
    { path: '/cart', component: Cart },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
