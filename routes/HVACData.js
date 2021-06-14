const express = require('express');
const router = express.Router()

router.get('/monthly', async (req, res) => {
    console.log(req)
    console.log(res)
    res.json({test:"blah blah blah"})
})


module.exports = router;