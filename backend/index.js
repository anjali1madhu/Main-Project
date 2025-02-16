import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://anjali22ubc213:CiBARvk8HZz6oWYP@cluster0.8whsc.mongodb.net/cardamom_db';

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: ["http://localhost:5173"], methods: ["GET", "POST"], credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Serve images statically
app.use('/images', express.static('upload/images'));

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});


// Image upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT || 5002}/images/${req.file.filename}`
  });
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// User signup
app.post("/auth/signup", async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// User login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id, role: user.role }, "secretKey", { expiresIn: "1h" });
    res.status(200).json({
      message: "Login successful",
      token,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});
// Contact form API route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, message: "Error saving message." });
  }
});
// Get All Contact Messages
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact messages", error: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, image, price, weight } = req.body;
    
    if (!name || !image || !price || !weight) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, image, price, weight });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
