import CartPage from './pages/CartPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import ProductDetailPage from './pages/ProductDetailPage.js';
import ProductListPage from './pages/ProductListPage.js';

const routes = [
  {
    path: '/web/',
    name: 'home',
    page: ({ $target }) => new ProductListPage($target),
  },
  {
    path: '/web/products/:id',
    name: 'product',
    page: ({ $target, param }) => new ProductDetailPage($target, param.id),
  },
  {
    path: '/web/cart',
    name: 'cart',
    page: ({ $target }) => new CartPage($target),
  },
];

const router = {
  findMatchingRoute(pathname) {
    const route = routes.find(
      (route) => route.path.split('/')[2] === pathname.split('/')[2]
    );

    if (route && route.name === 'product') {
      route.param = { id: pathname.split('/')[3] };
    }

    return (
      route ?? {
        path: pathname,
        name: 'not found',
        page: ({ $target }) => new NotFoundPage($target),
      }
    );
  },
  navigateTo(path, replace = false) {
    const urlchangeEvent = new CustomEvent('urlchange', {
      detail: {
        path: '/web' + path,
        replace,
      },
    });
    window.dispatchEvent(urlchangeEvent);
  },
};

export default router;
