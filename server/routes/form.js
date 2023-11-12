const express = require("express");
const router = express.Router();

const {

    createForm,
    getEventDetails,


} = require('../controllers/form');


router.post('/form', createForm);
router.get("/details/:email", getEventDetails);


module.exports = router;

