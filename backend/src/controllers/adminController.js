// Import required modules
const db = require('../connection'); // Import your database connection
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For authentication

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key_here';

// Controller to handle admin login
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password.' });
    }

    try {
        // Check if the admin exists in the database
        const query = 'SELECT * FROM admin WHERE username = ?';
        db.query(query, [username], async (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', error: err });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Admin not found.' });
            }

            const admin = result[0];

            // Check if the password is correct
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password.' });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: admin.id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ message: 'Login successful.', token });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.', error });
    }
};

// Controller to add a new worker
exports.addWorker = (req, res) => {
    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO workers (name, phone, address) VALUES (?, ?, ?)';
    db.query(query, [name, phone, address], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        return res.status(201).json({ message: 'Worker added successfully.', workerId: result.insertId });
    });
};

// Controller to view all workers
exports.viewWorkers = (req, res) => {
    const query = 'SELECT * FROM workers';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        return res.status(200).json({ workers: results });
    });
};

// Controller to delete a worker
exports.deleteWorker = (req, res) => {
    const { workerId } = req.params;

    const query = 'DELETE FROM workers WHERE id = ?';
    db.query(query, [workerId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Worker not found.' });
        }

        return res.status(200).json({ message: 'Worker deleted successfully.' });
    });
};

// Controller to view farming details
exports.viewFarmingDetails = (req, res) => {
    const query = 'SELECT * FROM farming_details';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        return res.status(200).json({ farmingDetails: results });
    });
};

// Controller to update farming details
exports.updateFarmingDetails = (req, res) => {
    const { id, cropType, harvestDate, notes } = req.body;

    if (!id || !cropType || !harvestDate || !notes) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'UPDATE farming_details SET cropType = ?, harvestDate = ?, notes = ? WHERE id = ?';
    db.query(query, [cropType, harvestDate, notes, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Farming detail not found.' });
        }

        return res.status(200).json({ message: 'Farming detail updated successfully.' });
    });
};
