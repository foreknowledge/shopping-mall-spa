import CartPage from './pages/CartPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import ProductDetailPage from './pages/ProductDetailPage.js';
import ProductListPage from './pages/ProductListPage.js';

const routes = [
  {
    path: '/',
    name: 'home',
    page: ({ $target }) => new ProductListPage($target),
  },
  {
    path: '/products/:id',
    name: 'product',
    page: ({ $target, param }) => new ProductDetailPage($target, param.id),
  },
  {
    path: '/cart',
    name: 'cart',
    page: ({ $target }) => new CartPage($target),
  },
];

const router = {
  findMatchingRoute(pathname) {
    const route = routes.find(
      (route) => route.path.split('/')[1] === pathname.split('/')[1]
    );

    if (route.name === 'product') {
      route.param = { id: pathname.split('/')[2] };
    }

    return (
      route ?? {
        path: pathname,
        page: ({ $target }) => new NotFoundPage($target),
      }
    );
  },
};

export default router;
