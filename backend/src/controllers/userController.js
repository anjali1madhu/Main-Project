const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Send only relevant user data to the frontend
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      signinAs: user.signinAs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
