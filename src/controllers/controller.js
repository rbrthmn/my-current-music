const service = require('../services/service');
const utils = require('../utils/utils');
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const stateKey = 'spotify_auth_state';
const keys = require('../../keys');
const spotifyUri = 'https://accounts.spotify.com'

const callback = function (req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    console.log("STATE: " + state)
    console.log("STORED_STATE: " + (req.cookies ? req.cookies[stateKey] : null))
    if (state === null) {
        res.redirect('/login');
    } else {
        res.clearCookie(stateKey);
        requestAccessToken(code)
    }
}

const login = function (req, res) {
    const state = utils.generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email user-library-modify user-read-currently-playing';
    res.redirect(spotifyUri + '/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: keys.CLIENT_ID,
            scope: scope,
            redirect_uri: keys.REDIRECT_URI,
            state: state
        }));
}

const requestAccessToken = function (code) {
    console.log('toooken')
    const tokenUri = spotifyUri + '/api/token';
    const authOptions = {
        url: spotifyUri + '/api/token',
        form: {
            code: code,
            redirect_uri: keys.REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer
                .from(keys.CLIENT_ID + ':' + keys.CLIENT_SECRET)
                .toString('base64'))
        },
        json: true
    };

    //TODO ver como usar o post do express utilizando todos os authOptions
    router.post(tokenUri, function (req, res, callback) {
        req.setHeader('Authorization', 'Basic ' + (Buffer
            .from(keys.CLIENT_ID + ':' + keys.CLIENT_SECRET)
            .toString('base64')))
        req.send(querystring.stringify({
            code: code,
            redirect_uri: keys.REDIRECT_URI,
            grant_type: 'authorization_code'
        }))
        console.log(res.body)
    });
}

const currentMusic = function (req, res) {
    console.log('euuuu')
}

module.exports = {
    callback,
    login,
    currentMusic
};
