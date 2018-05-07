const GoogleStratey = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = function(passport) {
    passport.use(
        new GoogleStratey({
            clientID: keys.googleClientID || keys.googleClientID,
            clientSecret: keys.googleClientSecret || keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            console.log(accessToken)
            console.log(profile)
        })
    )
}