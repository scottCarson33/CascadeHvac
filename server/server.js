const express = require('express');
const cors = require("cors");
const app = express();
const HVACDataRoute = require('./routes/HVACData');

app.use(cors());
app.use('/HVACData', HVACDataRoute);
app.get('/', (req, res) => {
	res.send('landing page')
});




app.listen(9000)