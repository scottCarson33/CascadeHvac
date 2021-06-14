const express = require('express');
const app = express();
const HVACDataRoute = require('./routes/HVACData');
app.use('/HVACData', HVACDataRoute);
app.get('/', (req, res) => {
	res.send('landing page')
});




app.listen(3000)