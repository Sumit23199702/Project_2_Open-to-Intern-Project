const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModel');
const validator = require('../validators/validator');


//-------------------------------createCollege-------------------------***

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Bad Request, No Data provided" })
        };

        const { name, fullName, logoLink } = data

        // college Name is Mandatory...
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "College name is required" })
        };

        // College Name is Unique... 
        let duplicate = await CollegeModel.findOne({ name: data.name })
        if (duplicate) {
            return res.status(400).send({ status: false, msg: "name already exist" })
        };

        // Full Name of college is Mandatory...
        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, msg: "fullName of College is required " })
        };

        // Full Name is Unique...
        let duplicateFullName = await CollegeModel.findOne({ fullName: data.fullName })
        if (duplicateFullName) {
            return res.status(400).send({ status: false, msg: "Full Name already exist" })
        };

        // Logolink is Mandatory...
        if (!validator.isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: " logoLink is required" })
        };

        // For a Valid LogoLink... 
        if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/.test(data.logoLink))) {
            return res.status(400).send({ status: false, msg: 'This is an Invalid LogoLink' })
        };

        // logoLink is Unique...
        let duplicateLogoLink = await CollegeModel.findOne({ logoLink: data.logoLink })
        if (duplicateLogoLink) {
            return res.status(400).send({ status: false, msg: "LogoLink already exist" })
        };


        let savedData = await CollegeModel.create(data)
        return res.status(201).send({ status: true, data: savedData })
    }

    catch (error) {
        return res.status(500).send({ msg: "error.message" })
    }
};

module.exports.createCollege = createCollege;

//---------------------------------------get College Details--------------------**

const getCollegeDetails = async function (req, res) {
    try {

        const collegeName = req.query.collegeName

        if (!collegeName) {
            return res.status(400).send({ status: false, msg: ' collegeName is required' })
        };

        const getDataOfCollege = await CollegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!getDataOfCollege) {
            return res.status(400).send({ status: false, msg: "College Details Not found" })
        };

        const collegeId = getDataOfCollege._id
        const detailsOfIntern = await InternModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });

        let collegeDetails = {
            name: getDataOfCollege.name,
            fullName: getDataOfCollege.fullName,
            logoLink: getDataOfCollege.logoLink,
            interests: detailsOfIntern
        };
        res.status(200).send({ status: true, data: collegeDetails })
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
};
module.exports.getCollegeDetails = getCollegeDetails;