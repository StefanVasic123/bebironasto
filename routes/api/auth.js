const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// For using find/save etc in routing process, we have to get Scheme (Item Model)
const User = require('../../models/User');

// GET Route (api/auth/user)
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

// POST Route with authentication
// @desc Create A Post
// @access Private
router.post('/', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User doesnt exist' });

        const newUser = new User({
            email,
            password
        })
        // Validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                            
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                    }
                                })
                            }
                        )
                    })

            })
        
    })

// DELETE Route
// @desc Delete A Post
// @access Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))

})

module.exports = router;