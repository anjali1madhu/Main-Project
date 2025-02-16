import User from '../models/User.js'; // Assuming you're using ES Modules for imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Signup (Register) Function
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate the role to ensure it's one of the allowed roles
    if (!['admin', 'client', 'worker'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role selected. Please choose from admin, client, or worker.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user object
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login Function
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token,
            role: user.role,
            redirectUrl:
                user.role === 'client' ? '/client-dashboard' :
                user.role === 'worker' ? '/worker-dashboard' :
                '/admin-dashboard',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
