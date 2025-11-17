const express = require("express");
const router = express.Router();

const valiToken = require('../middleware/Validtoken');

const {contactController,getAllContacts} = require('../controller/ContactController');

router.use(valiToken);

router.post('/',contactController);

router.get('/',getAllContacts)

module.exports = router;