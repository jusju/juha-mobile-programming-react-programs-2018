import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { listItems: [], name : '' };
  }

  buttonPressed = () => {
    console.log(this.state.name);
    fetch("https://api.github.com/search/repositories?q=" + this.state.name)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          listItems: responseData.items
        });
      });
  };

  inputChanged = (event) => {
    this.setState({name: event.target.value});
  };

  render() {
    const itemRows = this.state.listItems.map((repository, index) => (
      <tr key={index}>
        <td>{repository.full_name}</td>
        <td>
          <a href={repository.owner.html_url}>{repository.owner.html_url}</a>
        </td>
      </tr>
    ));

    return (
      <div>
        <h2>Repositories</h2>
        <div>Search: 
          <input type="text" value={this.state.name} onChange={this.inputChanged} />
          <button onClick={this.buttonPressed}>Search</button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Repository</th>
            </tr>
            {itemRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
