'use strict';
var request     = require("request");
var mocha       = require('mocha');
var expect      = require("chai").expect;
var db          = require("../config/database");
var app         = require('../app');
var http        = require('http');

var server;
const TETS_PORT = 3535;
const URL       = "http://localhost:" + TETS_PORT;



//===============================
// TESTING DATABASE =============
//===============================


describe('Test our REST api against the database', function(){
    before(function(done){
        server = http.createServer(app);
        server.listen(TETS_PORT, function(){
            console.log("sever started");
            done();
        });
    });
    after(function(done){
        server.close();
        done();
    });
    beforeEach(function(){
        console.log("New test");
    });
    it('should not be able to access api', function(done){
        request.get({url: URL + "/api/names"}, function(err, res, body){
            if(err) {
                console.log(err);
                done();
            } else {
                expect(res.statusCode).to.be.equal(403);
                done();
            }
        });
    });
    it('should not authenticate non existing user', function(done){
        request.post({url: URL + "/signup/authenticate/", form: {username: "Testperson", password: "1234"}, contentType: "application/json"}, function(err, res, body){
            if(err) {
                console.log(err);
                done();
            } else {
                expect(res.statusCode).to.be.equal(401);
                done();
            }
        });
    });
    it('should add Testperson to db', function(done){
        request.post({url: URL + "/signup/signup/", form: {username: "Testperson", password: "1234"}, contentType: "application/json"}, function(err, res, body){
            if(err) {
                console.log(err);
                done();
            } else {
                expect(res.statusCode).to.be.equal(200);
                expect(JSON.parse(body).msg).to.be.equal("Successful created new user.");
                done();
            }
        });
    });
    it('should not add Testperson to db as already exists', function(done){
        request.post({url: URL + "/signup/signup/", form: {username: "Testperson", password: "1234"}, contentType: "application/json"}, function(err, res, body){
            if(err) {
                console.log(err);
                done();
            } else {
                expect(res.statusCode).to.be.equal(200);
                expect(JSON.parse(body).msg).to.be.equal("Username already exists.");
                done();
            }
        });
    });
    it('should authenticate existing user', function(done){
        request.post({url: URL + "/signup/authenticate/", form: {username: "Testperson", password: "1234"}, contentType: "application/json"}, function(err, res, body){
            if(err) {
                console.log(err);
                done();
            } else {
                expect(res.statusCode).to.be.equal(200);
                done();
            }
        });
    });
    it('should be able to access api with token', function(done){
        request.post({url: URL + "/signup/authenticate/", form: {username: "Testperson", password: "1234"}, contentType: "application/json"}, function(err, res, body){
            if(err) {
                console.log(err);
                done();
            } else {
                expect(res.statusCode).to.be.equal(200);
                request.get({url: URL + "/api/names", headers: {Authorization: JSON.parse(res.body).token}}, function(err, res, body){
                    if(err) {
                        console.log(err);
                        done();
                    } else {
                        expect(res.statusCode).to.be.equal(200);
                        done();
                    }
                });
            }
        });

    });
    it('should delete user', function(done){
        request.delete({url: URL + "/signup/Testperson"}, function(err, res, body){
            if(err) {
                console.log(err);
                done();
            } else {
                expect(res.statusCode).to.be.equal(200);
                done();
            }
        });
    });
});