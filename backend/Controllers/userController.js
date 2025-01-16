const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully', 
      user 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error registering user', 
      error: error.message 
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("Generated JWT Token:", token); // Log token for debugging
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);  // Log error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  };

  // exports.getUsersByRole = async (req, res) => {
  //   const { role } = req.query; // Expect 'doctor' or 'patient' in query
  //   try {
  //     if (!role) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Role is required (doctor or patient)",
  //       });
  //     }
  
  //     const users = await User.find({ role }).select("-password"); // Exclude passwords
  //     if (users.length === 0) {
  //       return res.status(404).json({
  //         success: false,
  //         message: `No users found with role: ${role}`,
  //       });
  //     }
  
  //     res.status(200).json({
  //       success: true,
  //       message: `Users with role ${role} fetched successfully`,
  //       users,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching users by role:", error); // Log error for debugging
  //     res.status(500).json({
  //       success: false,
  //       message: "Error fetching users",
  //       error: error.message,
  //     });
  //   }
  // };
  




  
  
};

