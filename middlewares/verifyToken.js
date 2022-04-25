const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    //getting token from the headers
    const tokenWiWithBearer = req.headers.authorization;
    // if there is no token return error to the user
    if (!tokenWiWithBearer) {
        return res.status(403).json({ error: "User not authenticated" });
    }
    const token = tokenWiWithBearer.split(" ")[1];
    try {
        //verify if token is correct
        const user = jwt.verify(token, "listowel");
        // attached the user to the req
        req.user = user
    } catch (error) {
        res.status(403).json({ error: "User not authenticated" }); 
    }
next();
};

module.exports = {
    verifyToken,
};