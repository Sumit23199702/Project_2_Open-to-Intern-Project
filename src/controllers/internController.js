const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')
const validator = require('../validators/validator');


const createIntern = async function (req, res) {
    try {

        let data = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: 'Bad request, no data provided' })
        };

        const { name, email, mobile, collegeName } = data;

        // Intern Name Is Mandatory...
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "Intern name is required" })
        };

        // Email is Mandatory...
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        };

        // Email is Unique...
        let duplicateEmail = await InternModel.findOne({ email: data.email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: 'Email already exist' })
        };

        // For a Valid Email...
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
            return res.status(400).send({ status: false, message: ' Email should be a valid' })
        };

        // Mobile Number is Mandatory...
        if (!validator.isValid(mobile)) {
            return res.status(400).send({ status: false, msg: 'Mobile number is required' })
        };

        // Mobile Number is Unique...
        let duplicateMobile = await InternModel.findOne({ mobile: data.mobile })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: 'Mobile number already exist' })
        };

        // Mobile Number is Valid...

        if (mobile.length != 10) {
            return res.status(400).send({ status: false, msg: " mobile number should be valid" })
        };

        // College Name is Mandatory...
        if (!validator.isValid(collegeName)) {
            return res.status(400).send({ status: false, msg: "College Name is required" })
        };

        const collegeId = await CollegeModel.findOne({ name: collegeName })
        const newDataCollege = collegeId._id

        const savedData = { name: data.name, email: data.email, mobile: data.mobile, collegeId: newDataCollege }
        const resultIntern = await InternModel.create(savedData)
        res.status(201).send(resultIntern)
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

};

module.exports.createIntern = createIntern;