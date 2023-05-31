const api = {
  async getProducts() {
    const res = await fetch('http://localhost:3000/api/products');
    return await res.json();
  },
  async getProduct(id) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    return await res.json();
  },
};

export default api;
