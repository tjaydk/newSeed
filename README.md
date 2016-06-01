MEAN SEED
===============
###Explain basic security terms like authentication, authorization, confidentiality, integrity, SSL/TLS and provide examples of how you have used them.

- Authentication:  How to recognize a certain user - there are different ways to achieve this using e.g. using a cookie or a token. See routes/signup.js for example
- Authorization: To make sure that the user has the privileges to view certain content or obtain certain data. This can be achieved by granting a user the privileges and storing it in the token or cookie. 
- Confidentiality: This is more based on the server having restrictions to elements which can only be viewed by the authorized users - This can be achieved e.g. in Node/Express by using Passport to ask for token before grating access to specific urls. See app.js line 39 for example.
- Integrity: To insure the integrity in communication between the user and the server you need to hash data such as the password to make sure no malicious force can obtain personal information. See models/users.js for example
- SSL/TLS: Secure Socket Layer / Transport Layer Security is a way to insure data integrity between a client and a server - the SSL is a cryptografic layer that encrypts data transferred between the client and the server - this can be applied using HTTPS.

###Explain basic security threads like: Cross Site Scripting (XSS), SQL Injection and whether something similar to SQL injection is possible with NoSQL databases like MongoDB, and DOS-attacks. Explain/demonstrate ways to cope with these problems.

- XSS: Cross Site scripting is when you write scripts directly in a guestbook or other places on a webpage which is then being runned when other people visits the page - thereby giving a lot of possibilities for the scriptkid to gain access to user sensitive data.
- SQL Injection: Somewhat the same method as with XSS - a page where you can write SQL statements directly in a login or a search field thereby being able to use the 1=1 method to gain priviliges to do what ever you want via SQL.
- DDOS: Denial Of Service attacks is where you send a lot of requests to a server using a bot network to either deny 'real' trafic access or to crash the server.
Threats using a NoSQL database: There is not something directly similar to SQL injection with a NoSQL database, but there are other security issues - e.g. with MongoDB you dont have a admin password thereby having the database 'exposed' if the communicationport 27017 and 28017 is open on the server.

###Explain, at a fundamental level, the technologies involved, and the steps required in initializing a SSL connection between a browser and a server and how to use SSL in a secure way. 

The steps:
- A browser requests a secure page (usually https://).
- The web server sends its public key with its certificate.
- The browser checks that the certificate was issued by a trusted party (usually a trusted root CA), that the certificate is still valid and that the certificate is related to the site contacted.
- The browser then uses the public key, to encrypt a random symmetric encryption key and sends it to the server with the encrypted URL required as well as other encrypted http data.
- The web server decrypts the symmetric encryption key using its private key and uses the symmetric key to decrypt the URL and http data.
- The web server sends back the requested html document and http data encrypted with the symmetric key.
- The browser decrypts the http data and html document using the symmetric key and displays the information.

###Explain and demonstrate ways to protect user passwords on our backends, and why this is necessary.

To protect the password you use a hash function to create a hash and by adding salt you can secure the password even further.

###Explain about password hashing, salts and the difference between bcrypt and older (not recommended) algorithms like sha1, md5 etc.

A Hashing is a way to create a hash value by using an algorithm like SHA or MD5 thereby getting smaller data and also encrypting a value - these functions are pretty quick and even though its a one way function the hashed value will always be the same from the same data - therefore a hacke can have a spreadsheet and the decode the value. By adding 'salt' you use a slow algorithm to make a value - this ensures security because, by todays standard, it would take forever to create a spreadsheet for the different values. BCrypt does a hashing and salting and is an easy tool to use in your express. See models/users.js

###Explain about JSON Web Tokens (jwt) and why they are very suited for a REST-based API

JSON Web Tokens are like cookies a way to autheticate a user but also have the function of sending data as it has a header which tells which algorithm to decode with, have a payload with data and a signature to ensure integrity.

###Explain and demonstrate a system using jwt's, focusing on both client and server side.


###Explain and demonstrate use of the npm passportjs module

You can use the PassportJS to authenticate in different ways by using Facebook login or in our case using JWT. See app.js line 39 for example

###Explain, at a very basic level, OAuth 2 + OpenID Connect and the problems it solves.

OAuth2/OpenID Connect: Is an Open Standard for Authentication which allows user to log into third party websites being authorized by their MicroSoft, Google, Facebook, Twitter etc. account. These parties grants a secure token which is issued to the user. This is achieved without exposing the users login credentials. This should make it more secure to identify that the user is who they say they are and you dont need to store any user/passwords and therby needing alot of security on your database.

###Demonstrate, with focus on security, a proposal for an Express/Mongo+Angular-seed with built in support for most of the basic security problems, SSL and ready to deploy on your favourite Cloud Hosting Service.

#####See project
