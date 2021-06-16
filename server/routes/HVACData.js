const express = require('express');
const router = express.Router()
const moment  = require('moment')
const summaryHelper = require('../summaryHelper')


const ACTemp = 75
const heatTemp = 62
//send request by supplying Month in MM-YYYY format

router.get('/monthlySummary/:month', async(req, res) => {
try{
const startDate = moment(req.params.month, "MM-YYYY").startOf('month')
const endDate = moment(startDate).endOf('month')
const HVACData  = await summaryHelper.getHVACData(startDate, endDate, ACTemp, heatTemp, './server/history_data_hourly.csv')
res.status(200).send({HVACData})
}catch(err){
  console.log(err)
  res.status(400).send({error: "Uh Oh Something went wrong"})
}
})


//send request by giving date range in unix time format with start and end date
router.get('/dateRangeSummary/:startDate/:endDate', async(req, res) => {
  try{
  const startDate = moment.unix(req.params.startDate).startOf('day')
  const endDate = moment.unix(req.params.endDate).endOf('day')
  const HVACData  = await summaryHelper.getHVACData(startDate, endDate, ACTemp, heatTemp, './server/history_data_hourly.csv')
  res.status(200).send({HVACData})
  }catch(err){
    console.log(err)
    res.status(400).send({error: "Uh Oh Something went wrong"})
  }
  })






module.exports = router;