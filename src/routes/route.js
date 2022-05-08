const express = require('express');
const router = express.Router();

const CollegeController = require('../controllers/collegeController');
const InternComtroller = require('../controllers/internController');


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//---------------------------------------------1st API ----------------------***

router.post('/functionup/colleges', CollegeController.createCollege)

//---------------------------------------------2nd API --------------------------------***

router.post('/functionup/interns', InternComtroller.createIntern)

//---------------------------------------------3rd API--------------------------------***

router.get('/functionup/collegeDetails', CollegeController.getCollegeDetails)



module.exports = router;