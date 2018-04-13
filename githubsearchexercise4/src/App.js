import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { listItems: [] };
  }

  componentDidMount() {
    fetch('https://api.github.com/search/repositories?q=react')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          listItems: responseData.items
        });
      })
  }

  render() {
    const itemRows = this.state.listItems.map((repository, index) =>
      <tr key={index}>
        <td>{repository.full_name}</td>
        <td><a href={repository.owner.html_url}>{repository.owner.html_url}</a></td>      
      </tr>
    )

    return (
      <div>
        <h2>Repositories</h2>
        <table>
          <tbody>
            <tr><th>Name</th><th>Repository</th></tr>
            {itemRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
