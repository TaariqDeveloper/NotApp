
// const bcrypt = require('bcrypt');
// const User = require('../model/User');
// const jwt =  require('jsonwebtoken')

// // Create Data
// const CreateUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(401).json({ success: false, message: "User already exists" });
//         }

//         const hashPassword = await bcrypt.hash(password, 10);

//         const NewUser = new User({
//             name,
//             email,
//             password: hashPassword
//         });

//         await NewUser.save();
//         return res.status(200).json({ success: true, message: "Account Created Successfully" });

//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Error adding user" });
//     }
// };



// const CreateLogin = async (req, res) => {
//     try {
//         const {email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ success: false, message: "User Not exists" });
//         }

       
//         const checkPassword = await bcrypt.compare(user, user.password)

//         if (!checkPassword) {
//             return res.status(401).json({ success: false, message: "wrong  credentials" });
//         }
       
//         const token = jwt.sign({ id: user._id } , "secretkeyofnoteap123@#" ,{expiresIn: "5hr"})
        
//         return res.status(200).json({ success: true,token,user:{name: user.name} ,message: "Login Successfully" });

//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Error in Login server" });
//     }
// };
// module.exports = { CreateUser,  CreateLogin};

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const User = require('../model/User'); // Import User model
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for authentication

// Create User Function
const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extract name, email, and password from request body

        // Check if the user already exists in the database
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password before storing it
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with hashed password
        const NewUser = new User({
            name,
            email,
            password: hashPassword
        });

        // Save the new user to the database
        await NewUser.save();
        return res.status(201).json({ success: true, message: "Account Created Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding user" });
    }
};



// User Login Function
const CreateLogin = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Find the user by email in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User does not exist" });
        }

        // Compare the provided password with the hashed password in the database
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Wrong credentials" });
        }

        // Generate JWT token for authentication (use an environment variable for the secret key)
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || "defaultsecretkey", // Replace with env variable in production
            { expiresIn: "5h" } // Token expires in 5 hours
        );

        return res.status(200).json({ 
            success: true, 
            token, 
            user: { name: user.name }, 
            message: "Login Successfully" 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in Login server" });
    }
};

// Export functions for use in routes
module.exports = { CreateUser, CreateLogin };

