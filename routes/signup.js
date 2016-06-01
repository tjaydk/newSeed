var express             = require('express');
var router              = express.Router();

var mongoose            = require("mongoose");
var passport            = require('passport');
var config              = require('../config/database');
var User                = require('../models/users');
var jwt                 = require('jwt-simple');
const jwtConfig         = require("../config/jwt").jwtConfig;

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('../config/passport')(passport);

router.post('/authenticate', function(req, res) {
    User.findOne({
        userName: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({ msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var iat = new Date().getTime()/1000; //convert to seconds
                    var exp = iat+jwtConfig.tokenExpirationTime;
                    var payload = {
                        aud: jwtConfig.audience,
                        iss: jwtConfig.issuer,
                        iat: iat,
                        exp: exp,
                        sub: user.userName
                    };
                    var token = jwt.encode(payload, jwtConfig.secret);
                    req.session.Authorization = token;// SET TOKEN IN SESSION COOKIE

                    // return the information including token as JSON
                    res.json({token: 'JWT ' + token});
                } else {
                    res.status(401).send({ msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

// create a new user account (POST http://localhost:8080/api/signup)
router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var newUser = new User({
            userName: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

//DELETE WITH NAME
router.delete("/:username", function(req, res){
    var objToDelete = null;
    User.findOne({userName: req.params.username}).remove().exec(function(err, data){
        if(err) {
            console.log(err);
        } else {
            res.send({message: "Person deleted"});
        }
    });
});

module.exports = router;