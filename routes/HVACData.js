const express = require('express');
const router = express.Router()
const csv = require('csv-parser');
const fs = require('fs');
const moment  = require('moment')

async function getHVACData (startDate, endDate, filePath) {
  const ACTemp = 75
  const heatTemp = 62

  let data = {}
  return new Promise(function(resolve, reject) {
 fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
      let dateTime = moment(row['Date time'], "MM/DD/YYYY HH:mm:ss")
      let day = moment(row['Date time'], "MM/DD/YYYY").format("MM/DD/YYYY")
    if (startDate <= dateTime&& dateTime <= endDate) {
        if(data[day] == null){
            data[day] = {}
            data[day].heating = false
            data[day].airConditioning = false

        }
        if(!data[day].heating) {
            if(row['Minimum Temperature'] < heatTemp){
              data[day].heating = true
            }
        }
        if(!data[day].airConditioning) {
          if(row['Maximum Temperature'] > ACTemp){
            data[day].airConditioning = true
          }
      }
        
    }
  })
  .on('end', () => {
     resolve(data)
  });
})

}

//send request by supplying Month 

router.get('/monthlySummary/:month', async(req, res) => {
try{
const startDate = moment(req.params.month, "MM-DD-YYYY").startOf('month')
const endDate = moment(startDate).endOf('month')
const HVACData  = await getHVACData(startDate, endDate, './history_data_hourly.csv')
res.status(200).send({HVACData})
}catch(err){
  console.log(err)
  res.status(400).send({error: "Uh Oh Something went wrong"})
}
})


//send request by giving date range
router.get('/dateRangeSummary/:startDate/:endDate', async(req, res) => {
  try{
  const startDate = moment.unix(req.params.startDate)
  const endDate = moment.unix(req.params.endDate)
  const HVACData  = await getHVACData(startDate, endDate, './history_data_hourly.csv')
  res.status(200).send({HVACData})
  }catch(err){
    console.log(err)
    res.status(400).send({error: "Uh Oh Something went wrong"})
  }
  })






module.exports = router;