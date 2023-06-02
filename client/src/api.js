const baseUrl = 'http://localhost:8080';
const api = {
  async getProducts() {
    const res = await fetch(baseUrl + '/products');
    return await res.json();
  },
  async getProduct(id) {
    const res = await fetch(baseUrl + `/products/${id}`);
    return await res.json();
  },
};

export default api;
