module.exports.jwtConfig = {
    secret: "Thisisanewpasswordthatcantbehacked", //set unique secret
    tokenExpirationTime : 30*60*60, //seconds
    audience: "yoursite.net", //change domain
    issuer: "yourcompany@somewhere.com" // change issuename
};