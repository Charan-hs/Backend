const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {


        const token = req.header('x-auth-token');
        if (!token) res.status(401).json({ msg: "user denied" });
        const verifed = jwt.verify(token,process.env.SECERET);
        if(!verifed) res.status(401).json({ msg: "user denied" });
        
        req.user = verifed.id;
        // console.log(verifed)
        next();
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
}

module.exports = auth;