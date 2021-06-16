const csv = require('csv-parser');
const fs = require('fs');
const moment  = require('moment')

const summaryHelper = {
    
  //gets the HVACData for when heating and air conditioning is turned on
  getHVACData: async function getHVACData (startDate, endDate,  ACTemp, heatTemp, filePath) {

    let dailyData = await this.getDailyMinsAndMaxTemps(startDate, endDate, filePath)
    
    return this.createHVACSummaryObject(dailyData, ACTemp, heatTemp)
  
  },

  createHVACSummaryObject: function createSummaryObject(dailyData, ACTemp, heatTemp){

    let HVACArray = []
    let totalHeatingDays = 0;
    let totalACDays = 0;

    //loop through daily Temperature Data and find what days and how many times the heat/ac was turned on
    // the keys hold the dates
    for ( key in dailyData){
      if (dailyData.hasOwnProperty(key)) {
        let heatingOn = false
        let airConditioningOn = false
        if(dailyData[key].min < heatTemp){
          totalHeatingDays++;
          heatingOn = true
        }
        if(dailyData[key].max > ACTemp){
          totalACDays++;
          airConditioningOn = true
        }
        HVACArray.push({date: key, heating: heatingOn, airConditioning: airConditioningOn})
      }
  }
     
    return {HVACArray, totalHeatingDays, totalACDays}
    
  },


  //gets the Min And Max Temperature for each day in a given time range
  getDailyMinsAndMaxTemps: async function getDailyMinsAndMaxTemps (startDate, endDate, filePath) {
    let data = {}
    return new Promise(function(resolve, reject) {
      try{
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          let dateTime = moment(row['Date time'], "MM/DD/YYYY HH:mm:ss")
          let day = moment(row['Date time'], "MM/DD/YYYY").format("MM/DD/YYYY")
          if (startDate <= dateTime&& dateTime <= endDate) {
            if(data[day] == null){
                data[day] = {}
            }
            if(data[day].min == null || data[day].min > parseFloat(row['Minimum Temperature'])){
                data[day].min = parseFloat(row['Minimum Temperature'])
            }
            if(data[day].max == null || data[day].max < parseFloat(row['Maximum Temperature'])){
                data[day].max = parseFloat(row['Maximum Temperature'])
            }
  
        }
        })
        .on('end', () => {
          resolve(data)
        });
      }catch(err){
        reject(err)
      }
  })
  
  }
}

module.exports = summaryHelper