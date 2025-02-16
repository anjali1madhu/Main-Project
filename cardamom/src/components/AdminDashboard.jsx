import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [totalOrders] = useState(120);
  const [totalSales] = useState(5400);
  const [totalProducts] = useState(47);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5002/products");
      setProducts(response.data);
      setTotalProducts(response.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name || !price || !weight || !image) {
      alert("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product", image);
      const imageUploadRes = await axios.post("http://localhost:5002/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = imageUploadRes.data.image_url;

      await axios.post("http://localhost:5002/products", {
        name,
        image: imageUrl,
        price,
        weight,
      });

      alert("Product added successfully!");
      setName("");
      setPrice("");
      setWeight("");
      setImage(null);
      setPreview(null);
      fetchProducts();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to add product. Please try again later.");
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4 relative">
      <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded">Logout</button>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="mb-6 p-4 border rounded shadow-lg grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">${totalSales}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">Add Products</h2>
      <form onSubmit={handleUpload} className="mb-6 p-4 border rounded shadow-lg">
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full mb-2" required />
        {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover mb-2 rounded" />}
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Add Product</button>
      </form>

      <h2 className="text-xl font-bold mb-2">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Weight</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2 border">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">${product.price}</td>
                <td className="p-2 border">{product.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
