const express = require("express");

const router = express.Router();


const { adminLogin, getAllForms, editForm, updateForm, sendStatusEmail } = require("../controllers/admin");

router.post("/admin-login", adminLogin);

router.get("/forms", getAllForms);

router.get("/edit/:formId", editForm);

router.put('/update/:formId', updateForm);

router.get('/sendemail/:formId', sendStatusEmail);





module.exports = router;

