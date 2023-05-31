import router from './router.js';

const app = document.querySelector('.App');
route();

function route() {
  const route = router.findMatchingRoute(window.location.pathname);
  const page = route.page({ $target: app, param: route.param });
  page.render();
}

window.addEventListener('urlchange', (e) => {
  if (e.detail.path === window.location.pathname) {
    return;
  }
  window.history.pushState(null, '', e.detail.path);

  route();
});

window.addEventListener('popstate', route);
