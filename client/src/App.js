import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

class App extends Component {
  state = {
    data: {
      prices: {
        prices: []
      }
    },
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res }))
      .catch((err) => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/get_prices');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };


  render() {
    const data = this.state.data;

    return (
      <div className="App">
        <h2>Hourly electricity prices</h2>
        <p></p>
        <Table bordered responsive="sm">
          <thead>
            <tr>
              <th>Hour</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.prices.prices.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.startDate).toLocaleString('fi', {year:'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})} - {new Date(item.endDate).toLocaleString('fi', { hour: '2-digit', minute: '2-digit' })} </td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;