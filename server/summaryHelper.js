const csv = require('csv-parser');
const fs = require('fs');
const moment  = require('moment')

const summaryHelper = {
    //gets the HVACData for when heating and air conditioning is turned on

getHVACData: async function getHVACData (startDate, endDate, filePath) {

    const ACTemp = 75
    const heatTemp = 62
  
    let dailyData = await this.getDailyMinsAndMaxTemps(startDate, endDate, filePath)
    let HVACArray = []
    let totalHeatingDays = 0;
    let totalACDays = 0;

    //loop through daily Temperature Data and find what days and how many times the heat/ac was turned on
    for ( key in dailyData){
      if (dailyData.hasOwnProperty(key)) {
        let heatingOn = false
        let ACOn = false
        if(dailyData[key].min < heatTemp){
          totalHeatingDays++;
          heatingOn = true
        }
        if(dailyData[key].max > ACTemp){
          totalACDays++;
          ACOn = true
        }
        HVACArray.push({date: key, heating: heatingOn, airConditioning: ACOn})
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
            if(data[day].min == null || data[day].min > row['Minimum Temperature']){
                data[day].min = row['Minimum Temperature']
            }
            if(data[day].max == null || data[day].max < row['Maximum Temperature']){
                data[day].max = row['Maximum Temperature']
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