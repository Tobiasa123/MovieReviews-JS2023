
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const secretkey = process.env.SECRET_KEY

//register a user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json("New user registered!");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//login a user & assign token
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json('User does not exist');
        }
        if (user.password !== password) {
            return res.status(401).json('Wrong password');
        }
        const token = jwt.sign({ userId: user._id, role: user.role}, secretkey, { expiresIn: '1h' });
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json(error);
    }
};