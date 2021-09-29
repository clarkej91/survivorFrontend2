import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios'


// const backendUrl = 'http://localhost:5000/';
// const URL = 'http://localhost:5000/';
const backendUrl = 'https://survivor-backend2.herokuapp.com/';
const URL = 'https://survivor-backend2.herokuapp.com/';

class Home extends Component {
  constructor( props ) {
  super( props );
  this.state = {
    response: [],
    value: []
  }
  }

  componentDidMount() {
    console.log(this.props.response)
    this.setState({response: this.props.response})
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({value: event.target.value});
  }

  updateTribe = (event) => {
    console.log('hello world', event)
    axios.put(`${backendUrl}updateTribe`, {
        id: [parseInt(this.state.value.split(',')[1])],
        tribe: this.state.value.split(',')[0]
      })
      .then(response => {
        this.props.getData();
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    let tribe1 = []
    let tribe2 = []
    let tribe3 = []
    let none = []
    let jury = []
    let selectOptions = ['both', 'physical', 'mental']
    let selected = []
    const tabeHeaer = [
      {header: "Name"},
      {header: "Tribe"},
      {header: "Influence"},
      {header: "Strength"},
      {header: "Mental"},
      {header: "Join game"},
      {header: "Use Idol"},
      {header: "Idol Count"},
    ]

    const tribeSort = this.props.response.map((data, i) => {
        if(data.tribe === 'jury'){
          jury.push(data)
        }
        else if(data.tribe === "tribe1"){
          tribe1.push(data)
        }
        else if(data.tribe === "tribe2"){
          tribe2.push(data)
        }
        else if(data.tribe === "tribe3"){
          tribe3.push(data)
        }
        else {
          none.push(data)
        }
    })
    const options = selectOptions.map((data, i) => {
      return(
        <div>
      <button onClick={() => this.challengeRoll(tribe1, tribe2, tribe3, data)}>Challenge Roll {data}</button>
        </div>
      )
    })
    const tribe1Array = tribe1.map((data, i) => {
      let tribe1Selected = []
      return(
        <tr key={data.id}>
          <td onClick={this.props.onSelectedRow.bind(this, data)}>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>LTDA</option>
          <option value={['tribe2', data.id]}>Seekers</option>
          <option value={['tribe3', data.id]}>Smoke Monsters</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
          <div>
            <button onClick={() => this.props.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.props.subtractLikeness(data.id, data.likeness)}>-</button>
          </div>
          </td>
          <td>{data.strength}
          <div>
            <button onClick={() => this.props.addStrength(data.id, data.strength)}>+</button>
            <button onClick={() => this.props.subtractStrength(data.id, data.strength)}>-</button>
          </div>
          </td>
          <td>{data.wit}
          <div>
            <button onClick={() => this.props.addWit(data.id, data.wit)}>+</button>
            <button onClick={() => this.props.subtractWit(data.id, data.wit)}>-</button>
          </div>
          </td>
          <td>
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.props.handleInputChange(data, event)}}
             />
          {data.join_game.toString()}
          </td>
          <td>
          <input
            name="useIdol"
            type="checkbox"
            defaultChecked={data.immunity}
            onChange={ (event) => {this.props.handleIdolChange(data, event)}}
             />
          {data.immunity.toString()}
          </td>
          <td>
          {data.idol_count}
          </td>
        </tr>
      )
    })
    const tribe2Array = tribe2.map((data, i) => {
      return(
        <tr key={data.id}>
          <td onClick={this.props.onSelectedRow.bind(this, data)}>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>LTDA</option>
          <option value={['tribe2', data.id]}>Seekers</option>
          <option value={['tribe3', data.id]}>Smoke Monster</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
          <div>
            <button onClick={() => this.props.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.props.subtractLikeness(data.id, data.likeness)}>-</button>
          </div>
          </td>
          <td>{data.strength}
          <div>
            <button onClick={() => this.props.addStrength(data.id, data.strength)}>+</button>
            <button onClick={() => this.props.subtractStrength(data.id, data.strength)}>-</button>
          </div>
          </td>
          <td>{data.wit}
          <div>
            <button onClick={() => this.props.addWit(data.id, data.wit)}>+</button>
            <button onClick={() => this.props.subtractWit(data.id, data.wit)}>-</button>
          </div>
          </td>
          <td>
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.props.handleInputChange(data, event)}}
             />
          {data.join_game.toString()}
          </td>
          <td>
          <input
            name="useIdol"
            type="checkbox"
            defaultChecked={data.immunity}
            onChange={ (event) => {this.props.handleIdolChange(data, event)}}
             />
          {data.immunity.toString()}
          </td>
          <td>
          {data.idol_count}
          </td>
        </tr>
      )
    })
    const tribe3Array = tribe3.map((data, i) => {
      return(
        <tr key={data.id}>
          <td onClick={this.props.onSelectedRow.bind(this, data)}>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>LTDA</option>
          <option value={['tribe2', data.id]}>Seekers</option>
          <option value={['tribe3', data.id]}>Smoke Monsters</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
            <div>
              <button onClick={() => this.props.addLikeness(data.id, data.likeness)}>+</button>
              <button onClick={() => this.prosp.subtractLikeness(data.id, data.likeness)}>-</button>
            </div>
          </td>
          <td>{data.strength}
          <div>
            <button onClick={() => this.props.addStrength(data.id, data.strength)}>+</button>
            <button onClick={() => this.props.subtractStrength(data.id, data.strength)}>-</button>
          </div>
          </td>
          <td>{data.wit}
          <div>
            <button onClick={() => this.props.addWit(data.id, data.wit)}>+</button>
            <button onClick={() => this.props.subtractWit(data.id, data.wit)}>-</button>
          </div>
          </td>
          <td>
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.props.handleInputChange(data, event)}}
             />
          {data.join_game.toString()}
          </td>
          <td>
          <input
            name="useIdol"
            type="checkbox"
            defaultChecked={data.immunity}
            onChange={ (event) => {this.props.handleIdolChange(data, event)}}
             />
          {data.immunity.toString()}
          </td>
          <td>
          {data.idol_count}
          </td>
        </tr>
      )
    })
    const noneArray = none.map((data, i) => {
      return(
        <tr key={data.id}>
          <td>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>LTDA</option>
          <option value={['tribe2', data.id]}>Seekers</option>
          <option value={['tribe3', data.id]}>Smoke Monsters</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
          <div>
            <button onClick={() => this.props.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.props.subtractLikeness(data.id, data.likeness)}>-</button>
          </div>
          </td>
          <td>{data.strength}
          <div>
            <button onClick={() => this.addStrength(data.id, data.strength)}>+</button>
            <button onClick={() => this.subtractStrength(data.id, data.strength)}>-</button>
          </div>
          </td>
          <td>{data.wit}
          <div>
            <button onClick={() => this.addWit(data.id, data.wit)}>+</button>
            <button onClick={() => this.subtractWit(data.id, data.wit)}>-</button>
          </div>
          </td>
          <td>
          <input
            name="isGoing"
            type="checkbox"
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          </td>
          <td>
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          {data.join_game.toString()}
          </td>
        </tr>
      )
    })
    const juryArray = jury.map((data, i) => {
      return(
        <tr key={data.id}>
          <td>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>LTDA</option>
          <option value={['tribe2', data.id]}>Seekers</option>
          <option value={['tribe3', data.id]}>Smoke Monsters</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}</td>
          <div>
            <button onClick={() => this.props.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.props.subtractLikeness(data.id, data.likeness)}>-</button>
          </div>
        </tr>
      )
    })
    return (
      <div>
      <button onClick={() => this.props.idolRoll(tribe1)}>Idol Roll</button>
        { this.props.idolRollState ? <div>
        </div> : null }
        { this.props.showCampLife ? <div>
        <button onClick={() => this.props.eventOutcomeRoll(tribe1)}>Event Outcome Roll</button>
        </div> : null }
        { this.props.showTribal ? <div>
        <button onClick={() => this.props.diceRoll(tribe1)}>Tribal Roll</button>
        </div> : null }
          <div>
            <button
            onClick={() => this.props.playerRoll(tribe1)}
          >Player Roll</button>
          </div>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
        <th colspan="8">
        Oceanic
        </th>
        </tr>
        <tr>
        {tabeHeaer.map(data => {
          return <th>{data.header}</th>;
        })}
        </tr>
        </thead>
        <tbody>
        {tribe1Array}
        </tbody>
      </Table>
      <button onClick={() => this.props.idolRoll(tribe2)}>Idol Roll</button>
      { this.props.idolRoll ? <div>
      </div> : null }
      { this.props.showCampLife ? <div>
      <button onClick={() => this.props.eventOutcomeRoll(tribe2)}>Event Outcome Roll</button>
      </div> : null }
      { this.props.showTribal ? <div>
      <button onClick={() => this.props.diceRoll(tribe2)}>Tribal Roll</button>
      </div> : null }
        <div>
          <button onClick={() => this.props.playerRoll(tribe2)}>Player Roll</button>
        </div>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
        <th colspan="8">
        Ajira
        </th>
        </tr>
        <tr>
        {tabeHeaer.map(data => {
          return <th>{data.header}</th>;
        })}
        </tr>
        </thead>
        <tbody>
        {tribe2Array}
        </tbody>
      </Table>
      <button onClick={() => this.props.idolRoll(tribe3)}>Idol Roll</button>
      { this.props.idolRoll ? <div>
      </div> : null }
      { this.props.showCampLife ? <div>
      <button onClick={() => this.prosp.eventOutcomeRoll(tribe3)}>Event Outcome Roll</button>
      </div> : null }
      { this.props.showTribal ? <div>
      <button onClick={() => this.props.diceRoll(tribe3)}>Tribal Roll</button>
      </div> : null }
        <div>
          <button onClick={() => this.props.playerRoll(tribe3)}>Player Roll</button>
        </div>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
        <th colspan="8">
        The Smoke Monsters tribe
        </th>
        </tr>
        <tr>
        {tabeHeaer.map(data => {
          return <th>{data.header}</th>;
        })}
        </tr>
        </thead>
        <tbody>
        {tribe3Array}
        </tbody>
      </Table>
      <h2>Voted out</h2>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
        {tabeHeaer.map(data => {
          return <th>{data.header}</th>;
        })}
        </tr>
        </thead>
        <tbody>
        {noneArray}
        </tbody>
      </Table>
      <div>
        <button onClick={() => this.diceRoll(none)}>Tribal Roll</button>
        <button onClick={() => this.playerRoll(none)}>Player Roll</button>
      </div>
      <h2>Jury</h2>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
        {tabeHeaer.map(data => {
          return <th>{data.header}</th>;
        })}
        </tr>
        </thead>
        <tbody>
        {juryArray}
        </tbody>
      </Table>
      <div>
        <button onClick={() => this.diceRoll(jury)}>Tribal Roll</button>
        <button onClick={() => this.playerRoll(jury)}>Player Roll</button>
      </div>
      </div>
    );
  }
}

export default Home;
