
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express');
const auth = require('../middleware/auth')



var user = express.Router();

const userdb = require('../models/userdb');

user.get("/register", (req, res) => {
    res.send("OHHH NOOOO ")
})

user.post("/register", auth,async (req, res) => {
    console.log(req.body)
    try {

        const { userName, password } = req.body


        const existingUser = await userdb.findOne({ userName: userName })

        if (existingUser) {
            res.status(400).json({ msg: "UserName already exists" })
        }
        const salt = await bcrypt.genSalt()
        const password2 = await bcrypt.hash(password, salt)

        const newuser = new userdb({
            userName: userName,
            password: password2
        });
        if (userName === "root") newuser['role'] = "superadmin"

        const savedUser = await newuser.save();
        res.json(savedUser);

    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }


})

user.post("/login", async (req, res) => {
    try {

        var { userName, password } = req.body;

        if (!userName || !password) {
            res.status(404).json({ msg: "username or password required" })
        }


        const userde = await userdb.findOne({ userName: userName });
        if (!userde) {
            res.status(404).json({ msg: "User Name Not Found" })
        }
        console.log(userde)
        const match = await bcrypt.compare(password, userde.password);
        if (!match) {
            res.status(404).json({ msg: "Worng Password" })
        }
        const token = jwt.sign({ id: userde._id, role: userde.role }, process.env.SECERET);
        res.status(200).json({
            token,
            user: {
                id: userde._id,
                userName: userde.userName,
                role: userde.role
            }
        })

    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }

})

user.delete('/delete', auth, async (req, res) => {
    console.log(req.user)
    try {
        const deleteUser = await userdb.findByIdAndDelete(req.user);
        res.status(200).json(deleteUser)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

user.post('/tovalidate', async (req, res) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) res.json(false);
        const verifed = jwt.verify(token, process.env.SECERET);
        if (!verifed) res.json(false);
        const foundUser = await userdb.findById(verifed.id)
        console.log(foundUser)
        if (!foundUser) res.json(false);

        return res.json(true)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

user.post('/changepassword', auth, async (req, res) => {
    try {

        var { oldPassword, password, id } = req.body;
        if (!password || !id, !oldPassword) res.status(400).json({ msg: "Required all Feilds" })
        console.log(req.user, id)
        if (id !== req.user) res.status(400).json({ msg: "access denied" })

        const userde = await userdb.findById(id);
        if (!userde) {
            res.status(404).json({ msg: "User Name Not Found" })
        }
        const match = await bcrypt.compare(oldPassword, userde.password);
        if (!match) {
            res.status(404).json({ msg: "Worng Current Password" })
        }
        const salt = await bcrypt.genSalt()
        const passwordnew = await bcrypt.hash(password, salt)

        const userde1 = await userdb.findByIdAndUpdate(id, { '$set': { 'password': passwordnew } })
        res.status(200).json(userde1)
        console.log(userde1)



    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

user.get('/', auth, async (req, res) => {
    try {
        const found = await userdb.findById(req.user);
        // console.log(found)
        res.json({
            id: found._id,
            userName: found.userName,
            role: found.role,
        })
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})


module.exports = user