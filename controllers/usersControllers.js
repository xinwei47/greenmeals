import User from '../models/user.js';

// render register page
export const renderRegister = (req, res) => {
    res.render('users/register');
}

// register user
// 'register(user, password, cb)' is a statics method added by password-local-mongoose.
// It helps to register a new user instance by hashed a given password and also check if username is unique.
// It also saves data to Mongo automatically.

export const registerUser = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const user = new User({ username, email });
    if (password === confirmPassword) {
        const registerUser = await User.register(user, password)
        req.login(registerUser, err => {
            req.flash('success', 'register successfully');
            res.redirect('/');
        })
    } else {
        req.flash('error', 'Password do not match. Please try again.')
        res.redirect('/register');
    }
}

// render login page
export const renderLogin = (req, res) => {
    res.render('users/login');
}

// log user in
export const loginUser = (req, res) => {
    req.flash('success', 'Welcome back');
    // where to place req.session.returnTo = req.originalUrl?
    // req.session.returnTo = req.originalUrl;
    // console.log(req.session.returnTo);
    const redirectUrl = req.session.returnTo || '/'
    delete req.session.returnTo; // remove the returnTo link from the 'session' object
    res.redirect(redirectUrl);
}


// log user out
export const logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/');
}