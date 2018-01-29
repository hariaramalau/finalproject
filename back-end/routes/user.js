const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");

router.post("/new", (req, res) => {

    let newObj = new User({
        username: req.body.username,
        password: req.body.password
    })

    newObj.save((error) => {
        if (error) {
            res.status(500).send(error);
        }
        else {
            res.json(newObj);
        }
    })
});

router.post("/login", (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        }
        else if (!result) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            const payload = {
                id: result.id,
                name: result.username
            }
            const token = jwt.sign(payload, "secretkey", { expiresIn: 1000 });
            const userid = result._id
            const username =result.firstname
            
            res.json({token:token, userid:userid,username:username});
        }
    })
})



module.exports = (function () {
    return router;
})();