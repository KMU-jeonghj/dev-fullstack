const crypto = require('crypto');


const password = "1234";

const salt = crypto.randomBytes(64).toString('base64');
const hashed = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

console.log(hashed);