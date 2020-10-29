const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');

var ObjeactID = require('mongoose').Types.ObjectId;
const userdb = require('../models/userdb');

var institutedetails = require('../models/details')

router.get('/all', auth, async (req, res) => {
    const found = await userdb.findById(req.user);
    if (!found) {
        res.status(404).json({ msg: "No user Found" })
    }
    // console.log(found)
    if (found.role !== "superadmin") {
        res.status(401).json({ msg: "To Save Institute Details You Have To Be Super-Admin" })
    }
    const fullde = await institutedetails.find()
    if (!fullde) {
        res.status(404).json({ msg: "No Details Found!!" })
    }
    res.json(fullde)


});

router.get("/inst/:id", auth, async (req, res) => {
    try {
        const h = await institutedetails.findById(req.params.id)
        res.json(h)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }

})

router.post('/inst/chan/:id', auth, async (req, res) => {
    try {
        const tocha = await institutedetails.findById(req.params.id);
        const tobecha = !tocha.instActive
        const changedcho = await institutedetails.findByIdAndUpdate(req.params.id, { $set: { instActive: tobecha } }, { new: true })
        console.log(changedcho)
        res.json(changedcho)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
}
)

router.post('/inst', auth, async (req, res) => {
    try {
        var newinst = new institutedetails({
            ...req.body
        })
        const found = await userdb.findById(req.user);
        if (!found) {
            res.status(404).json({ msg: "No user Found" })
        }
        console.log(found)
        if (found.role !== "superadmin") {
            res.status(401).json({ msg: "To Save Institute Details You Have To Be Super-Admin" })
        }
        const saveInst = await newinst.save();
        console.log(newinst, saveInst, "saved copy")
        res.send(saveInst)
        // await newinst.save((err,docs) => {
        //     if(!err){ res.send(docs)}
        //     else{ console.log("error while saving"+(err))}
        // }) 
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }

})

router.put("/inst/:id", auth, async (req, res) => {
    try {


        var updatedetails = { ...req.body }
        // console.log(updatedetails)
        const l = await institutedetails.findByIdAndUpdate(req.params.id, { $set: updatedetails }, { new: true })
        res.json(l)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})
router.delete('/inst/:id', auth, async (req, res) => {
    try {
        const l = await institutedetails.findOneAndDelete(req.params.id)
        res.json(l)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }

})

router.post('/admin/add/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
        const found = await institutedetails.findById(req.params.id);
        var updatedetails = { ...req.body }
        console.log(found)
        if (found['instAdmin'] === null) {
            found['instAdmin'] = updatedetails
        } else {
            found.instAdmin.push(updatedetails)
        }

        const upad = await found.save();
        res.json(upad)

    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

router.get('/admin/:id/:uid', auth, async (req, res) => {
    try {
        console.log(req.params.uid)
        const found = await institutedetails.findById(req.params.id);
        const ke = found.instAdmin.id(req.params.uid)
        console.log(ke)
        res.json(ke)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})




router.post('/admin/:id/:uid', auth, async (req, res) => {
    try {
        const found = await institutedetails.findById(req.params.id);
        var updatedetails = { ...req.body }

        found.instAdmin.id(req.params.uid).remove()
        if (found['instAdmin'] === null) {
            found['instAdmin'] = updatedetails
        } else {
            found.instAdmin.push(updatedetails)
        }

        const updateon = await found.save()
        res.json(updateon)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})


router.delete('/admin/:id/:uid', auth, async (req, res) => {
    try {
        const found = await institutedetails.findById(req.params.id);
        found.instAdmin.id(req.params.uid).remove()

        const updateon = await found.save()
        res.json(updateon)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})


router.get('/get/admin', auth, async (req, res) => {
    try {
        const found = await institutedetails.findOne({ 'instAdmin': { $elemMatch: { 'adminId': req.user } } });
        res.json(found)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})


router.post('/af/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
        var updatedetails = { ...req.body }
        const exi = await institutedetails.findOne({ 'instSutdentDetails': { $elemMatch: { 'stuId': updatedetails.stuId } } });
        if(exi) res.status(400).json({"msg":"Student Id Already exisit"})
        const found = await institutedetails.findById(req.params.id);
        console.log(found)
        
        console.log(updatedetails)

        if (found['instSutdentDetails'] === null) {
            found['instSutdentDetails'] = updatedetails
        } else {
            found.instSutdentDetails.push(updatedetails)
        }

        const updateon = await found.save()
        res.json(updateon)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

router.get('/st/:id/:uid',auth,async(req,res) => {
    try{
        const found = await institutedetails.findById(req.params.id);
        if(!found) res.status(404).json({'msg':"Inst Not Found"})
        const foundStudent = await found.instSutdentDetails.id(req.params.uid)
        if(!foundStudent) res.status(404).json({'msg':"Student Not Found"})
        res.json(foundStudent)

    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

router.post('/st/:id/:uid',auth,async(req,res) => {
    try {
        const found = await institutedetails.findById(req.params.id);
        if(!found) res.status(404).json({'msg':"Inst Not Found"})
        var updatedetails = { ...req.body }

        found.instSutdentDetails.id(req.params.uid).remove()
        if (found['instSutdentDetails'] === null) {
            found['instSutdentDetails'] = updatedetails
        } else {
            found.instSutdentDetails.push(updatedetails)
        }

        const updateon = await found.save()
        res.json(updateon)
    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

router.delete('/st/:id/:uid',auth,async(req,res) => {
    try {
        const found = await institutedetails.findById(req.params.id);
        if(!found) res.status(404).json({'msg':"Inst Not Found"})
        found.instSutdentDetails.id(req.params.uid).remove()
        const f = await found.save()
        res.status(200).json(f)

    }
    catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

// router.get('/admin:id', (req, res) => {
//     if (!ObjeactID.isValid(req.params.id)) {
//         return res.status(404).send("Not Found")
//     }
//     institutedetails.instAdmin.findById(req.params.id, (err, docs) => {
//         if (!err) res.send(docs)
//         else console.log("errpr while rertive " + json.toString(err))
//     })
// })

// router.put("/admin:id", (req, res) => {
//     if (!ObjeactID.isValid(req.params.id)) {
//         return res.status(400).send("No Contact Found ")
//     }
//     var newAdmin = { ...req.body }
//     institutedetails.instAdmin.findByIdAndUpdate(req.params.id, { $set: newAdmin }, { new: true }, (err, docs) => {
//         if (!err) res.send(docs)
//         else console.log("error while updating  " + JSON.stringify(err, undefined, 2))
//     })
// })

// remove

module.exports = router