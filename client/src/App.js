import React, {Component} from "react"
import logo from './logo.svg';

import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.state = { apiResponse: [] };
}


getHVACData(date) {
    fetch("http://localhost:9000/HVACData/monthlySummary/" + date)
        .then(res => res.json())
        .then(res => {
          console.log(res) 
        this.setState({ apiResponse: res.HVACData})
        }
        )
}

componentWillMount() {
    this.getHVACData("06-01-2020");
}
  render () {
    return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* {this.state.apiResponse} */}
        </p>
        <table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Heating</th>
      <th>AC</th>
    </tr>
  </thead>
  <tbody>
    {this.state.apiResponse.map(item => {
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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    );
  }
}

export default App;
