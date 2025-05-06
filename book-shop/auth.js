const jwt = require('jsonwebtoken');

function ensureAuthorization(req, res) {
    let receivedJwt = req.headers['authorization'];
    console.log(receivedJwt);
    if (!receivedJwt) {
        return res.status(401).json({ message: "No token provided" });
      }
      const token = receivedJwt.split(' ')[1]; // 'Bearer' 제거
    let decodedUser = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    console.log(decodedUser);
    return decodedUser;
}

module.exports = {
    ensureAuthorization
};