const express = require('express');
const router = express.Router()
const csv = require('csv-parser');
const fs = require('fs');
const moment  = require('moment')

getMinAndMaxTemps = async(startDate, endDate, filePath) =>{
    let data = {}
 await fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
      let dateTime = moment(row['Date time'], "MM/DD/YYYY HH:mm:ss")
      let day = moment(row['Date time'], "MM/DD/YYYY")
    if (startDate <= dateTime&& dateTime <= endDate) {
        if(data[day] == null){
            data[day] = {}
        }
        if(data[day].min == null || data[day].min > row['Minimum Temperature']){
            data[day].min = row['Minimum Temperature']
        }
        if(data[day].max == null || data[day].max < row['Maximum Temperature']){
            data[day].max = row['Maximum Temperature']
        }
        
    }
  })
  .on('end', () => {
    return data
  });

}

router.get('/monthly/:month', async (req, res) => {

const startDate = moment(req.params.month, "MM-DD-YYYY").startOf('month')
const endDate = moment(startDate).endOf('month')
let data = await getMinAndMaxTemps(startDate, endDate, './history_data_hourly.csv')
 res.json({test:data})
})






module.exports = router;