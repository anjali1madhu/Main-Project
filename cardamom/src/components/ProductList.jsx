import { useState, useEffect } from "react";
import axios from "axios";
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    axios.get("http://localhost:5002/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded shadow">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Weight: {product.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
