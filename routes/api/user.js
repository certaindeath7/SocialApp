const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
// User's model
const User = require('../../models/User');
const gravatar = require('gravatar');
//hashing password
const bcrypt = require('bcryptjs');
// jasonwebtoken
const jwt = require('jsonwebtoken');

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            // See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: [{ msg: 'User already exists' }] });
            }
            // Get user gravatar
            const avatar = gravatar.url(email, {

                s: '200', // size
                r: 'pg', // rating
                d: 'mm' //default
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })
            // Encrypt the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // return a promise and save user's new hashed password in the db
            await user.save();

            // data sent to server. body of post request
            const payload = {
                //instance of user
                user: {
                    id: user.id,
                }
            }

            // Return jsonwebtoken
            jwt.sign(
                payload, 
                config.get('jwtsecret'),
                { expiresIn: 3600},
                //callback function
                (err, token) => {
                    // if there's an error, send back an error
                    // if not send back the token
                    if (err) throw err;
                    res.json({ token });
                });
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }

    });

module.exports = router;