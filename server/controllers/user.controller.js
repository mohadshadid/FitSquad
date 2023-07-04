const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    async register(req, res) {
        try {
            const user = new User(req.body);
            await user.save();

            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            });

            res.status(201).json({ msg: 'Successfully created user', user, token });
        } catch (error) {
            res.status(500).json({ error: 'Failed to register user' });
        }
    }

    async login(req, res) {
        try {
            const { emailAddress, password } = req.body;

            const user = await User.findOne({ emailAddress });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid login attempt - user not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ msg: 'Invalid login attempt - incorrect password' });
            }

            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            });

            res.json({ msg: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Failed to log in' });
        }
    }

    async findUser(req, res) {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decodedToken._id);

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            res.json({ user });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve logged-in user' });
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.find();
            res.json({ users });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    }

    logout(req, res) {
        res.clearCookie('token');
        res.json({ msg: 'Successful Logout!' });
    }
}

module.exports = new UserController();