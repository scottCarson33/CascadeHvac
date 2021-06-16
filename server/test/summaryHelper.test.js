const summaryHelper = require('../summaryHelper')
const { expect } = require('chai')
const moment  = require('moment')

describe('summaryHelper getDailyMinsAndMaxTemps Test', () => {
    describe('3 days ', () => {
        it('should match dummy csv', async () => {
            const result = await summaryHelper.getDailyMinsAndMaxTemps(moment("07/20/2020", "MM/DD/YYYY").startOf('day'), moment("07/22/2020", "MM/DD/YYYY").endOf('day'), './test/CascadeDataTest.csv' )
            const expected = {"07/20/2020":{"min":71,"max":1000},"07/21/2020":{"min":0,"max":83.1},"07/22/2020":{"min":70,"max":70}}
            expect(result).to.be.deep.equal(expected);
        });
    })
});

describe('summaryHelper createHVACSummaryObject Test', () => {
    describe('generates a simple HVACSummaryObject', () => {
        it('should have 0 AC, 0 Heating On', () => {
            const dailyData = {"03/01/2020":{"min":57.8,"max":78.1},"03/02/2020":{"min":56.1,"max":71.1},"03/03/2020":{"min":65,"max":70.1}}
            const result = summaryHelper.createHVACSummaryObject(dailyData, 1000, 0);
            const expected =  {
                HVACArray: [
                  {
                    airConditioning: false,
                    date: '03/01/2020',
                    heating: false
                  },
                  {
                    airConditioning: false,
                    date: '03/02/2020',
                    heating: false
                  },
                  {
                    airConditioning: false,
                    date: '03/03/2020',
                    heating: false
                  }
                ],
                totalACDays: 0,
                totalHeatingDays: 0
              }
            expect(result).to.be.deep.equal(expected);
        });
        it('should have 1 AC On, 3 Heating On', () => {

            const dailyData = {"03/01/2020":{"min":57.8,"max":78.1},"03/02/2020":{"min":56.1,"max":71.1},"03/03/2020":{"min":65,"max":70.1}}
            const result = summaryHelper.createHVACSummaryObject(dailyData, 78, 66);
            const expected =  {
                HVACArray: [
                  {
                    airConditioning: true,
                    date: '03/01/2020',
                    heating: true
                  },
                  {
                    airConditioning: false,
                    date: '03/02/2020',
                    heating: true
                  },
                  {
                    airConditioning: false,
                    date: '03/03/2020',
                    heating: true
                  }
                ],
                totalACDays: 1,
                totalHeatingDays: 3
              }
            expect(result).to.be.deep.equal(expected);
        });
    })
});