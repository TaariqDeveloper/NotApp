
const bcrypt = require('bcrypt');
const User = require('../model/User');

// Create Data
const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ success: false, message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const NewUser = new User({
            name,
            email,
            password: hashPassword
        });

        await NewUser.save();
        return res.status(200).json({ success: true, message: "Account Created Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding user" });
    }
};

module.exports = { CreateUser };
