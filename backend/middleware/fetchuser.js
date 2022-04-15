const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisis my project";

const fetchuser = (req, res, next) => {
    // Get the usernfrm the jwt token and add id to req object
    const token = req.header('auth-token');
    console.log(token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.user = data.User;
        next();


    } catch (error) {
       res.status(401).send({ error: "Please authenticate using a valid token second" })

    }

}


module.exports = fetchuser;