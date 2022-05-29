const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', password: ''};

    // duplicate username error
    if (err.code === 11000) {
        errors.name = 'That user name is already in use.';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//     return jwt.sign({ id }, 'secretkey', {
//         expiresIn: maxAge
//     });
// }
// controller actions

module.exports.signup_post = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.create({ name, password });
        // const token = createToken(user._id);
        console.log(user)
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user })
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { name, password } = req.body;

    console.log(name, password);
    res.send('user login')
}

module.exports.signup_get = (req, res) => {
    res.send('signup');
  }
