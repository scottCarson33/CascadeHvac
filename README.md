# CascadeHvac

This Is Scott Carson's Code Submission for exercise 1
It is a simple Express and React App that has 2 API points for the HVAC Summary data. One (HVACData/dateRangeSummary/:startDate/:endDate) handles time in a given time range (via epoch unix time) with a start and end date. The other ('HVACData/monthlySummary/:month') allows for a simple MM/DD/YYYY format to be sent and it will automatically return data for the entire month given. It returns back the Summary Data in an array of object where each object has the date, a heating property, and an airconditioning property. The Express app listens on port 9000.

The React App is a very basic frontend that runs on port 3000 and makes a call to the monthlySummary endpoint and display the results in a table.

To run the app, run the server.js file and it will listen on port 9000. npm run build the react app and it will run on port 3000. You can also manually hit the endpoints on the server for testing as well.

If you have any questions feel free to message me and ask any questions you have
