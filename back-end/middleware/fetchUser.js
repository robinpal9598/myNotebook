var jwt = require('jsonwebtoken');
const JWT = "THISISTHESECRETPASSWORD";
const fetchUser = (req, resp, next) => {
    const token = req.header('auth-token');
    if (!token) {
        resp.status(401).send({ "error": "Enter the valid token please" });
    }
    try {
        const data = jwt.verify(token, JWT);
        req.user= data.user;
        next();

    } catch (error) {
        resp.status(401).send({ error: "there is some internal error" });
    }

}
module.exports = fetchUser;
