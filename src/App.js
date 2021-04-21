import React, { Component } from 'react';
import styles from './animated-image.module.scss'
import './App.css';
import axios from 'axios'
import io from "socket.io-client";

const backendUrl = 'https://survivor-backend2.herokuapp.com/';
const URL = 'https://survivor-backend2.herokuapp.com/';
// const backendUrl = 'http://localhost:5000/';
// const URL = 'http://localhost:5000/';
const socket = io.connect(URL, { transport : ['websocket'] });

class App extends Component {
  constructor( props ) {
  super( props );
    this.state = {
      response: [],
      tribe1: [],
      tribe2: [],
      tribe3: [],
      none: [],
      jury: [],
      value: [],
      name: "",
      playerResponse: [],
      tribeRespone: [],
      eventRespone: [],
      tribe1Challenge: [],
      tribe2Challenge: [],
      tribe3Challenge: [],
      challengeResponse: [],
      chkbox: false,
      showResults: false,
      showEventResults: false,
      tied: false,
      wobble: 1
    };
    this.getData = this.getData.bind(this);
    this.getPlayer = this.getPlayer.bind(this)
    this.updateTribe = this.updateTribe.bind(this)
    this.addLikeness = this.addLikeness.bind(this)
    this.subtractLikeness = this.subtractLikeness.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.diceRoll = this.diceRoll.bind(this);
    this.diceRollTie = this.diceRollTie.bind(this);
    this.playerRoll = this.playerRoll.bind(this);
    this.challengeRoll = this.challengeRoll.bind(this);
    this.addStrength = this.addStrength.bind(this);
    this.subtractStrength = this.subtractStrength.bind(this);
    this.addWit = this.addWit.bind(this);
    this.subtractWit = this.subtractWit.bind(this);
    this.updateChallenge = this.updateChallenge.bind(this);
    this.getTribe = this.getTribe.bind(this);
    this.getData = this.getData.bind(this);
    this.eventOutcomeRoll = this.eventOutcomeRoll.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.getPlayer('John Locke');
    this.getTribe('tribe1');
    this.getEvent(1)
  }

  getData() {
    axios.get(backendUrl).then((res) => {
      const response = res.data;
      this.setState({response});
      socket.on("FromAPI", data => {
        // console.log('From Api')
        const response = data;
        this.setState({response});
      });
    });
  }

  getEvent(id) {
    axios.put(`${backendUrl}getEvent`, {
        id: id
      })
      .then(res => {
        const eventRespone = res.data;
        this.setState({eventRespone})
        socket.on('FromGetEvent', data => {
          const eventRespone = data;
          this.setState({eventRespone});
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPlayer(player) {
    if(player === ''){
      const playerResponse = [player]
      this.setState({playerResponse});
    } else {
      axios.put(`${backendUrl}getPlayer`, {
          name: player
        })
        .then(res => {
          const playerResponse = res.data;
          this.setState({playerResponse});
          // this.setState({showResults: true})
          socket.on('FromgetPlayerAPI', data => {
            // console.log('FromgetPlayerAPI')
            const playerResponse = data;
            this.setState({playerResponse});
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getTribe(tribe) {
      axios.put(`${backendUrl}getTribe`, {
          tribe: tribe
        })
        .then(res => {
          const challengeResponse = res.data;
          this.setState({challengeResponse});
          // this.setState({showResults: true})
          socket.on('FromgetTribeAPI', data => {
            // console.log('FromgetTribeAPI', data[0])
            const challengeResponse = data;
            this.setState({challengeResponse});
          });
        })
        .catch(error => {
          console.log(error);
        });
  }

  addLikeness(id, likeness) {
    let num = likeness + 1
    axios.put(`${backendUrl}updateCount`, {
        id: id,
        likeness: num
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  subtractLikeness(id, likeness) {
    let num = likeness - 1
    axios.put(`${backendUrl}updateCount`, {
        id: id,
        likeness: num
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  addStrength(id, strength) {
    let num = strength + 1
    axios.put(`${backendUrl}updateStrength`, {
        id: id,
        strength: num
      })
      .then(response => {
        this.getData();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  subtractStrength(id, strength) {
    let num = strength - 1
    axios.put(`${backendUrl}updateStrength`, {
        id: id,
        strength: num
      })
      .then(response => {
        this.getData();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  addWit(id, wit) {
    let num = wit + 1
    axios.put(`${backendUrl}updateWit`, {
        id: id,
        wit: num
      })
      .then(response => {
        this.getData();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  subtractWit(id, wit) {
    let num = wit - 1
    axios.put(`${backendUrl}updateWit`, {
        id: id,
        wit: num
      })
      .then(response => {
        this.getData();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateTribe(event) {
    axios.put(`${backendUrl}updateTribe`, {
        id: [parseInt(this.state.value.split(',')[1])],
        tribe: this.state.value.split(',')[0]
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  diceRoll(tribe){
    this.setState({ showResults: false });
    setTimeout(() => {
      let smallestValue = 0
      let lowestName = []
      for(let i = 0; i < tribe.length; i++){
        let diceRoll = tribe[i].likeness * tribe[i].likeness
        let rollValue = Math.floor(Math.random() * diceRoll)
        if(tribe[i] === tribe[0]){
          smallestValue = rollValue
          lowestName = [tribe[i]]
        }
        else if(smallestValue > rollValue) {
          smallestValue = rollValue
          lowestName = [tribe[i]]
        }
        else if(smallestValue === rollValue) {
          smallestValue += rollValue
          lowestName.push(tribe[i])
        } else {

        }
        console.log(tribe[i].name, rollValue)
      }
      if(lowestName.length > 1){
        this.diceRollTie(lowestName)
      } else {
        this.getPlayer(lowestName[0].name);
      }
      this.setState({ showResults: true });
    }, 500)

  }

  playerRoll(tribe) {
    this.setState({ showResults: false });
    this.setState({ tied: false });
    setTimeout(() => {
      let tribeMember = tribe[Math.floor(Math.random() * tribe.length)];
      this.getPlayer(tribeMember.name);
      this.setState({ showResults: true });
    }, 500)
    // let tribeMember = tribe[Math.floor(Math.random() * tribe.length)];
    // this.getPlayer(tribeMember.name);
    // this.setState({ showResults: true });
  }

  diceRollTie(lowestName) {
    console.log(lowestName, 'time to draw rocks')
    let playerArray = []
    for(let i = 0; i < lowestName.length; i ++){
      playerArray.push(lowestName[i].name)
    }
    this.setState({ tied: true });
    this.getPlayer(playerArray);
  }

  challengeRoll(tribes1, tribes2, tribes3, challengeType) {
    this.setState({ showResults: false });
    setTimeout(() => {
    let tribe1 = []
    let tribe2 = []
    let tribe3 = []
    for(let i = 0; i < this.state.response.length; i ++){
      if(this.state.response[i].tribe === 'tribe1' && this.state.response[i].join_game === true){
          tribe1.push(this.state.response[i])
      } else if(this.state.response[i].tribe === 'tribe2' && this.state.response[i].join_game === true){
        tribe2.push(this.state.response[i])
      } else if(this.state.response[i].tribe === 'tribe3' && this.state.response[i].join_game === true) {
        tribe3.push(this.state.response[i])
      } else {
        console.log('hello world');
      }
    }
    let tribes = [tribe1, tribe2, tribe3]
    let tribe1Roll = 0
    let tribe2Roll = 0
    let tribe3Roll = 0
    for(let i = 0; i < tribes.length; i ++){
      if(tribes[i].length === 0){
        continue;
      }
      let tribeArray = tribes[i]
        for(let j = 0; j < tribeArray.length; j ++){
          if(tribeArray[j].tribe === 'tribe1'){
            if(challengeType === 'both'){
              let rollValue = Math.floor(Math.random() * tribeArray[j].strength + tribeArray[j].wit)
              tribe1Roll = tribe1Roll + rollValue
            } else if(challengeType === 'physical'){
              let rollValue = Math.floor(Math.random() * tribeArray[j].strength)
              tribe1Roll = tribe1Roll + rollValue
            } else {
              let rollValue = Math.floor(Math.random() *  tribeArray[j].wit)
              tribe1Roll = tribe1Roll + rollValue
            }
        } else if(tribeArray[j].tribe === 'tribe2'){
            if(challengeType === 'both'){
              let rollValue = Math.floor(Math.random() * tribeArray[j].strength + tribeArray[j].wit)
              tribe2Roll = tribe2Roll + rollValue
            } else if(challengeType === 'physical'){
              let rollValue = Math.floor(Math.random() * tribeArray[j].strength)
              tribe2Roll = tribe2Roll + rollValue
            } else {
              let rollValue = Math.floor(Math.random() * tribeArray[j].wit)
              tribe2Roll = tribe2Roll + rollValue
            }
        } else {
            if(challengeType === 'both'){
              let rollValue = Math.floor(Math.random() * tribeArray[j].strength + tribeArray[j].wit)
              tribe3Roll = tribe3Roll + rollValue
            } else if(challengeType === 'physical'){
              let rollValue = Math.floor(Math.random() * tribeArray[j].strength)
              tribe3Roll = tribe3Roll + rollValue
            } else {
              let rollValue = Math.floor(Math.random() *  tribeArray[j].wit)
              tribe3Roll = tribe3Roll + rollValue
            }
        }
      }
    }
    let rollValueArray = [tribe1Roll,tribe2Roll,tribe3Roll]
    let smallestValue = 0
    let lowestName = []
    for(let i = 0; i < rollValueArray.length; i ++){
      if(rollValueArray[i] === 0){
        continue;
      }
      else if(lowestName.length === 0){
        smallestValue = rollValueArray[i]
        lowestName = [tribes[i]]
      }
      else if(smallestValue > rollValueArray[i]) {
        smallestValue = rollValueArray[i]
        lowestName = [tribes[i]]
      }
      else if(smallestValue === rollValueArray[i]) {
        smallestValue += rollValueArray[i]
        lowestName.push(tribes[i])
      } else {

      }
    }
    if(lowestName.length!== 0){
      if(lowestName.length > 1){
        console.log('theres been a tie');
        this.challengeRoll(tribe1, tribe2, tribe3, challengeType)
      } else {
        this.getTribe(lowestName[0][0].tribe)
        this.setState({ tribeRespone: [lowestName[0][0]] });
        this.setState({ showResults: true })
      }
    } else {
      alert('add players to challenge');
    }
    }, 500)
  }

  eventOutcomeRoll() {
    setTimeout(() => {
      let randomNum = Math.floor(1 + Math.random() * 26);
      this.setState({ showEventResults: true });
      this.getEvent(randomNum)
    }, 500)
  }

  updateChallenge(id, challenge) {
    axios.put(`${backendUrl}updateChallenge`, {
        id: id,
        challenge: challenge
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleInputChange(data, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if(data.tribe === 'tribe1'){
      if(value === true){
        let id = data.id
        let challenge = true
        this.updateChallenge(id, challenge)
      } else {
        let id = data.id
        let challenge = false
        this.updateChallenge(id, challenge)
      }
    } else if (data.tribe === 'tribe2'){
      if(value === true){
        let id = data.id
        let challenge = true
        this.updateChallenge(id, challenge)
      } else {
        let id = data.id
        let challenge = false
        this.updateChallenge(id, challenge)
      }
    } else {
      if(value === true){
        let id = data.id
        let challenge = true
        this.updateChallenge(id, challenge)
      } else {
        let id = data.id
        let challenge = false
        this.updateChallenge(id, challenge)
      }
    }
  }

  render(){
    let tribe1 = []
    let tribe2 = []
    let tribe3 = []
    let none = []
    let jury = []
    let selectOptions = ['both', 'physical', 'mental']
    let selected = []

    const tribeSort = this.state.response.map((data, i) => {
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
          <td>
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          </td>
          <td>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>Tribe1</option>
          <option value={['tribe2', data.id]}>Tribe2</option>
          <option value={['tribe3', data.id]}>Tribe3</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
          <div>
            <button onClick={() => this.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.subtractLikeness(data.id, data.likeness)}>-</button>
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
          {data.join_game.toString()}
          </td>
        </tr>
      )
    })
    const tribe2Array = tribe2.map((data, i) => {
      return(
        <tr key={data.id}>
          <td>
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          </td>
          <td>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>Tribe1</option>
          <option value={['tribe2', data.id]}>Tribe2</option>
          <option value={['tribe3', data.id]}>Tribe3</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
          <div>
            <button onClick={() => this.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.subtractLikeness(data.id, data.likeness)}>-</button>
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
          {data.join_game.toString()}
          </td>
        </tr>
      )
    })
    const tribe3Array = tribe3.map((data, i) => {
      return(
        <tr key={data.id}>
          <td>
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          </td>
          <td>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>Tribe1</option>
          <option value={['tribe2', data.id]}>Tribe2</option>
          <option value={['tribe3', data.id]}>Tribe3</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
            <div>
              <button onClick={() => this.addLikeness(data.id, data.likeness)}>+</button>
              <button onClick={() => this.subtractLikeness(data.id, data.likeness)}>-</button>
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
          {data.join_game.toString()}
          </td>
        </tr>
      )
    })
    const noneArray = none.map((data, i) => {
      return(
        <tr key={data.id}>
        <td>
        <input
          name="isGoing"
          type="checkbox"
          onChange={ (event) => {this.handleInputChange(data, event)}}
           />
        </td>
          <td>{data.name}</td>
          <td>
          <form onSubmit={this.updateTribe}>
          <select
            defaultValue={[data.tribe, data.id]} onChange={this.handleChange}>
          <option value={['tribe1', data.id]}>Tribe1</option>
          <option value={['tribe2', data.id]}>Tribe2</option>
          <option value={['tribe3', data.id]}>Tribe3</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}
          <div>
            <button onClick={() => this.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.subtractLikeness(data.id, data.likeness)}>-</button>
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
          <option value={['tribe1', data.id]}>Tribe1</option>
          <option value={['tribe2', data.id]}>Tribe2</option>
          <option value={['tribe3', data.id]}>Tribe3</option>
          <option value={['none', data.id]}>Voted out</option>
          <option value={['jury', data.id]}>Jury</option>
          </select>
          <input type="submit" value="Submit" />
          </form>
          </td>
          <td>{data.likeness}</td>
          <div>
            <button onClick={() => this.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.subtractLikeness(data.id, data.likeness)}>-</button>
          </div>
        </tr>
      )
    })
    const eventOutcome = this.state.eventRespone.map((data, i) => {
      return(
        <div key={data.id}>
        {data.events}
        </div>
      )
    })
    const playerEvent = this.state.playerResponse.map((data, i) => {
      // console.log(data.name)
      return(
        <div key={data.id}>
        {data.name}
        </div>
      )
    })
    const tribeEvent = this.state.tribeRespone.map((data, i) => {
      return(
        <div key={data.id}>
        {data.tribe}
        </div>
      )
    })
    const challengeEvent = this.state.challengeResponse.map((data, i) => {
      return(
        <div key={data.id}>
        {data.tribe}
        </div>
      )
    })
    return (
      <div className="App">
      <h2>
        Event Happens to:
      { this.state.showResults ? <div>
        {playerEvent}
        <div class="row">{challengeEvent[0]}loses</div>
      </div> : null }
      { this.state.tied ? <div>
        {playerEvent}
        <button onClick={() => this.playerRoll(this.state.playerResponse)}>Draw Rocks</button>
      </div> : null }
      </h2>
      { this.state.showEventResults ? <div>
        <h2>{eventOutcome}</h2>
      </div> : null }
        <button onClick={() => this.eventOutcomeRoll()}>Event Outcome Roll</button>
      {options}
        <h2>Tribe 1</h2>
        <table>
          <thead>
          <tr>
            <th>
            []
            </th>
            <th>
            Name
            </th>
            <th>
            Tribe
            </th>
            <th>
            Influence
            </th>
            <th>
            Strength
            </th>
            <th>
            Mental
            </th>
            <th>
            Join game
            </th>
          </tr>
          </thead>
          <tbody>
          {tribe1Array}
          </tbody>
        </table>
        <div>
          <button onClick={() => this.diceRoll(tribe1)}>Tribal Roll</button>
          <button
          onClick={() => this.playerRoll(tribe1)}
        >Player Roll</button>
        </div>
        <h2>
          Event Happens to:
        { this.state.showResults ? <div>
          {playerEvent}
          <div class="row">{challengeEvent[0]}loses</div>
        </div> : null }
        { this.state.tied ? <div>
          {playerEvent}
          <button onClick={() => this.playerRoll(this.state.playerResponse)}>Draw Rocks</button>
        </div> : null }
        </h2>
        { this.state.showEventResults ? <div>
          <h2>{eventOutcome}</h2>
        </div> : null }
          <button onClick={() => this.eventOutcomeRoll()}>Event Outcome Roll</button>
        {options}
        <h2>Tribe 2</h2>
        <table>
          <thead>
          <tr>
            <th>
            []
            </th>
            <th>
            Name
            </th>
            <th>
            Tribe
            </th>
            <th>
            Influence
            </th>
            <th>
            Strength
            </th>
            <th>
            Wit
            </th>
            <th>
            Join game
            </th>
          </tr>
          </thead>
          <tbody>
          {tribe2Array}
          </tbody>
        </table>
        <div>
          <button onClick={() => this.diceRoll(tribe2)}>Tribal Roll</button>
          <button onClick={() => this.playerRoll(tribe2)}>Player Roll</button>
        </div>
        <h2>
          Event Happens to:
        { this.state.showResults ? <div>
          {playerEvent}
          <div class="row">{challengeEvent[0]}loses</div>
        </div> : null }
        { this.state.tied ? <div>
          {playerEvent}
          <button onClick={() => this.playerRoll(this.state.playerResponse)}>Draw Rocks</button>
        </div> : null }
        </h2>
        { this.state.showEventResults ? <div>
          <h2>{eventOutcome}</h2>
        </div> : null }
          <button onClick={() => this.eventOutcomeRoll()}>Event Outcome Roll</button>
        {options}
        <h2>Tribe 3</h2>
        <table>
          <thead>
          <tr>
            <th>
            []
            </th>
            <th>
            Name
            </th>
            <th>
            Tribe
            </th>
            <th>
            Influence
            </th>
            <th>
            Strength
            </th>
            <th>
            Wit
            </th>
            <th>
            Join game
            </th>
          </tr>
          </thead>
          <tbody>
          {tribe3Array}
          </tbody>
        </table>
        <div>
          <button onClick={() => this.diceRoll(tribe3)}>Tribal Roll</button>
          <button onClick={() => this.playerRoll(tribe3)}>Player Roll</button>
        </div>
        <h2>Voted out</h2>
        <table>
          <thead>
          <tr>
            <th>
            []
            </th>
            <th>
            Name
            </th>
            <th>
            Tribe
            </th>
            <th>
            Influence
            </th>
            <th>
            Strength
            </th>
            <th>
            Wit
            </th>
          </tr>
          </thead>
          <tbody>
          {noneArray}
          </tbody>
        </table>
        <div>
          <button onClick={() => this.diceRoll(none)}>Tribal Roll</button>
          <button onClick={() => this.playerRoll(none)}>Player Roll</button>
        </div>
        <h2>Jury</h2>
        <table>
          <thead>
          <tr>
            <th>
            Name
            </th>
            <th>
            Tribe
            </th>
            <th>
            Influence
            </th>
          </tr>
          </thead>
          <tbody>
          {juryArray}
          </tbody>
        </table>
        <div>
          <button onClick={() => this.diceRoll(jury)}>Tribal Roll</button>
          <button onClick={() => this.playerRoll(jury)}>Player Roll</button>
        </div>
      </div>
    );
  }

}

export default App;
