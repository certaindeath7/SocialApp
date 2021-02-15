const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
//hashing password
const bcrypt = require('bcryptjs');


// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        // get the user from the db and leave off the passsword
        const user = await User.findById(req.user.id).select('-password');
        //send along the user
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/users
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            // See if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            // compare password using bcrypt
            // compare function returns a promise.
            // A promise's result will be saved in a variable
            //this compare the input text password to encrypted password user saved in the db
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

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
                { expiresIn: 3600 },
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