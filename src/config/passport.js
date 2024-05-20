
const passport = require('passport');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = getUserById(id);
    done(null, user);
});
module.exports = passport;

// ...