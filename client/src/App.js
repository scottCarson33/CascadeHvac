import React, {Component} from "react"
import logo from './logo.svg';

import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.state = { HVACData: {
      HVACArray: [],
      totalHeatingDays: 0,
      totalACDays: 0
    } };
}


getHVACData(date) {
    fetch("http://localhost:9000/HVACData/monthlySummary/" + date)
        .then(res => res.json())
        .then(res => {
          this.setState({ HVACData: res.HVACData})
        }
        )
}

componentWillMount() {
    this.getHVACData("07-2020");
}
  render () {
    return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3> HVAC Summary Results </h3>
        <p>Total Heating Days: {this.state.HVACData.totalHeatingDays} || Total Air Conditioning Days: {this.state.HVACData.totalACDays}</p>
        <table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Heating</th>
      <th>AC</th>
    </tr>
  </thead>
  <tbody>
    {this.state.HVACData.HVACArray.map(item => {
      return (
        <tr key={item.date}>
          <td>{ item.date }</td>
          <td>{ JSON.stringify(item.heating)}</td>
          <td>{ JSON.stringify(item.airConditioning) }</td>
        </tr>
      );
    })}
  </tbody>
</table>
      </header>
    </div>
    );
  }
}

export default App;
