const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const User = require('../model/User'); // Import User model
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for authentication

// Create Data (User Registration)
const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extract name, email, and password from request body

        // Check if a user with the same email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ success: false, message: "User already exists" }); // Return an error if user exists
        }

        // Hash the password using bcrypt with a salt round of 10
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with hashed password
        const NewUser = new User({
            name,
            email,
            password: hashPassword
        });

        // Save the new user in the database
        await NewUser.save();

        // Respond with success message
        return res.status(200).json({ success: true, message: "Account Created Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding user" }); // Handle server errors
    }
};




// User Login Function
const CreateLogin = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Find the user by email in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not exists" }); // Return error if user not found
        }

        // Compare the provided password with the hashed password stored in the database
        const checkPassword = await bcrypt.compare(password, user.password); // ✅ Corrected password comparison

        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Wrong credentials" }); // Return error if password does not match
        }

        // Generate a JWT token with user ID as payload, secret key, and expiry time of 5 hours
        const token = jwt.sign({ id: user._id }, "secretkeyofnoteap123@#", { expiresIn: "5hr" });

        // Respond with success message, token, and user's name
        return res.status(200).json({ 
            success: true, 
            token, 
            user: { name: user.name }, 
            message: "Login Successfully" 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in Login server" }); // Handle server errors
    }
};

// Export functions for use in routes
module.exports = { CreateUser, CreateLogin };
