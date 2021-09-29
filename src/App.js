import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import io from "socket.io-client";
import ChallengeSlider from "./components/slider.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import TheProgressBar from "./components/ProgressBar.js"
import Tribal from "./components/Tribal.js"
import TribalCouncil from "./components/TribalCouncil.js"
import Actions from "./components/Actions.js"
import Home from "./components/Home.js"
import NavigationBar from "./components/NavigationBar.js"
import Table from 'react-bootstrap/Table';
import { StickyContainer, Sticky } from 'react-sticky';
import Button from 'react-bootstrap/Button'
import { matchPath } from 'react-router-dom';

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
      challengePercentage: [{
          mental: 0,
          phyiscal: 0
        }],
      tribe1Score: '',
      tribe2Score: '',
      tribe3Score: '',
      chkbox: false,
      showResults: true,
      showEventResults: true,
      tied: false,
      wobble: 1,
      roundData: 0,
      challengeRatioNum: 50,
      showChallengeData: false,
      showChallengeResults: false,
      showTribal: false,
      showCampLife: false,
      idolRoll: false,
      playerOutcome: [],
      gameData: [],
      events: [],
      showData: true,
      showHomePage: true,
      message: "",
      idolMessage: "",
      roundDataMes: 0,
      tribalMessage: [],
      tribalVote: [],
      showtribalVote: true,
      showAllTribalVote: false,
      revealVotes: false,
      revote: []
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
    this.challengeRatio = this.challengeRatio.bind(this);
    this.updateRound = this.updateRound.bind(this);
    this.getRoundData = this.getRoundData.bind(this);
    this.updatGameData = this.updatGameData.bind(this);
    this.updatePlayerScore = this.updatePlayerScore.bind(this);
    this.idolRoll = this.idolRoll.bind(this);
    this.handleIdolChange = this.handleIdolChange.bind(this);
    this.setTribalToFalse = this.setTribalToFalse.bind(this);
    this.updateChallengeRatio = this.updateChallengeRatio.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.getPlayer('John Locke');
    this.getTribe('tribe1');
    // this.getEvent();
    this.getRoundData();
    this.getEvents();
    // this.getMessage();
    this.sendMessage('true');
    this.getRatioVal();
    this.getIdolMessage();
    // this.sendRoundMessage(0);
    this.getRoundMessage();
    this.readVotes();
    this.sendTribalVotes([]);
    this.getRevealAllVotes();
    // this.getReadVotes();
    // this.revealAllVotes(true)
  }

  getData() {
    axios.get(backendUrl).then((res) => {
      const response = res.data;
      this.setState({response});
      socket.on("FromAPI", data => {
        // console.log('From Api')
        const response = data;
        this.setState({response}); this.setState({playerOutcome: data});
      });
    });
  }

  sendMessage = (data) => {
    socket.emit('sendMessage', data)
    this.getMessage();
  }

  getMessage = () => {
    socket.on("getMessage", (data) => {
      this.setState({message: data})
    });
  }

  sendRatioVal = (data) => {
    socket.emit('sendRatioVal', data)
    this.getRatioVal();
  }

  getRatioVal = () => {
    socket.on("getRatioVal", (data) => {
      this.setState({challengeRatioNum: data})
    });
  }

  sendIdolMessage = (data) => {
    socket.emit('sendIdolMessage', data)
    this.getIdolMessage();
  }

  getIdolMessage = () => {
    socket.on("getIdolMessage", (data) => {
      this.setState({idolMessage: data})
    });
  }

  sendRoundMessage = (data) => {
    socket.emit('sendRoundMessage', data)
    this.getRoundMessage();
  }

  getRoundMessage = () => {
    socket.on("getRoundMessage", (data) => {
      this.setState({roundDataMes: data})
      const roundData = data;
      this.setState({roundData}, () => {
        if(this.state.roundData === 50){
          // this.setState({revealVotes: false})
          this.setState({showChallengeData: true})
          this.setState({showTribal: false})
          this.setState({showCampLife: false})
          this.setState({showEventResults: false})
        } else if(this.state.roundData === 100){
          this.setState({idolRoll: false})
          this.setState({showEventResults: false})
          this.setState({showTribal: true})
          this.setState({showChallengeData: false})
          this.setState({showCampLife: false})
        } else if(this.state.roundData === 75){
          // this.setState({revealVotes: false})
          this.setState({showCampLife: true})
          this.setState({showEventResults: true})
          this.setState({showTribal: false})
          this.setState({showChallengeData: false})
        } else if(this.state.roundData === 25){
          // this.setState({revealVotes: false})
          this.setState({showEventResults: true})
          this.setState({showCampLife: true})
          this.setState({showTribal: false})
          this.setState({showChallengeData: false})
        } else {
          // this.setState({revealVotes: false})
          this.setState({showTribal: false})
          // this.setState({showCampLife: false})
          this.setState({showChallengeData: false})
          this.setState({showChallengeResults: false });
          this.sendTribalVotes([]);
          this.setTribalToFalse();
        }
      });
    });
  }

  sendTribalVotes = (data) => {
    socket.emit('sendTribalVotes', data)
    this.getTribalVotes();
  }

  getTribalVotes = () => {
    socket.on("getTribalVotes", (data) => {
      this.setState({showAllTribalVote: false})
      console.log(this.state.showAllTribalVote)
      this.setState({tribalMessage: data})
      setTimeout(() => {
        this.setState({showAllTribalVote: true})
      }, 5000)
    });
  }

  readVotes = (data) => {
    socket.emit('sendVote', data)
    this.getReadVotes();
    // this.setState({showtribalVote: false})
      // socket.on("getVote", (data) => {
      //   this.setState({showtribalVote: false})
      //   setTimeout(() => {
      //     console.log(this.state.showtribalVote)
      //     this.setState({tribalVote: data})
      //     this.setState({showtribalVote: true})
      //   }, 1000)
      // });
  }

  getReadVotes = () => {
    socket.on("getVote", (data) => {
      this.setState({showtribalVote: false})
      setTimeout(() => {
        console.log(this.state.showtribalVote)
        this.setState({tribalVote: data})
        this.setState({showtribalVote: true})
      }, 1000)
    });
  }

  revealAllVotes = (data) => {
    socket.emit('sendRevealVote', data)
    this.getRevealAllVotes();
  }

  getRevealAllVotes = () => {
    socket.on('getRevealVote', (data) => {
      console.log(data)
      this.setState({revealVotes: data})
    });
  }

  getEvents = () => {
    axios.get(`${backendUrl}events`).then((res) => {
      const events = res.data;
      this.setState({events});
    });
  }

  getEvent(id) {
    console.log(id);
    axios.put(`${backendUrl}getEvent`, {
        id: id
      })
      .then(res => {
        const eventRespone = res.data;
        this.setState({eventRespone})
        socket.on('FromGetEvent', data => {
          const eventRespone = data;
          this.setState({eventRespone});
          console.log(eventRespone[0].events);
          if(eventRespone[0].events === 'Idol Roll'){
            this.setState({idolRoll: true})
          } else {
            this.setState({idolRoll: false})
          }
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
            const challengeResponse = data;
            this.setState({challengeResponse});
          });
        })
        .catch(error => {
          console.log(error);
        });
  }

  getRoundData() {
    axios.get(`${backendUrl}gameData`).then((res) => {
      // const roundData = res.data[0].round_data;
      const gameData = res.data
      // const showData = res.data[0].showdata
      // this.setState({showData})
      // this.setState({roundData});
      this.setState({gameData});
      socket.on('GameData', data => {
        // const roundData = data[0].round_data;
        const gameData = data;
        // const showData = data[0].showdata;
        // this.setState({showData});
        this.setState({gameData});
        // this.setState({roundData}, () => {
          // if(this.state.roundData === 50){
          //   this.setState({showChallengeData: true})
          //   this.setState({showTribal: false})
          //   this.setState({showCampLife: false})
          //   this.setState({showEventResults: false})
          // } else if(this.state.roundData === 100){
          //   this.setState({idolRoll: false})
          //   this.setState({showEventResults: false})
          //   this.setState({showTribal: true})
          //   this.setState({showChallengeData: false})
          //   this.setState({showCampLife: false})
          // } else if(this.state.roundData === 75){
          //   this.setState({showCampLife: true})
          //   this.setState({showEventResults: true})
          //   this.setState({showTribal: false})
          //   this.setState({showChallengeData: false})
          // } else if(this.state.roundData === 25){
          //   this.setState({showEventResults: true})
          //   this.setState({showCampLife: true})
          //   this.setState({showTribal: false})
          //   this.setState({showChallengeData: false})
          // } else {
          //   this.setState({showTribal: false})
          //   // this.setState({showCampLife: false})
          //   this.setState({showChallengeData: false})
          //   this.setState({showChallengeResults: false });
          //   this.setTribalToFalse();
          // }
        // });
      });
    });
  }

  setTribalToFalse() {
    axios.put(`${backendUrl}setTribalToFalse`, {})
      .then(response => {
        this.getData();
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

  updatePlayerScore(name, playerScore){
    console.log(name,playerScore)
    axios.put(`${backendUrl}updatePlayerScore`, {
        name: name,
        playerScore: playerScore,
        tribal: true
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateTribeNumber(name, tribeNumber){
    axios.put(`${backendUrl}updateTribeNumber`, {
        name: name,
        tribeNumber: tribeNumber
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateTribe(event) {
    console.log('hello world')
    // console.log(event);
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

  updatGameData() {
    axios.put(`${backendUrl}updateScoreData`, {
        id: 1,
        tribe1: this.state.tribe1Score,
        tribe2: this.state.tribe2Score,
        tribe3: this.state.tribe3Score
      })
      .then(response => {
        this.getRoundData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateShowData = (showData) => {
    console.log('does this get called', showData)
    axios.put(`${backendUrl}changeShowData`, {
        showData: showData
      })
      .then(response => {
        this.getRoundData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateChallengeRatio(num){
    axios.put(`${backendUrl}updateChallengeRatio`, {
        num: num
      })
      .then(response => {
        this.getRoundData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({value: event.target.value});
  }

  diceRoll(tribe){
    // this.updateShowData(false);
    this.sendMessage('false')
    this.setState({ showResults: false });
    let players = []
    setTimeout(() => {
      let smallestValue = 0
      let lowestName = []
      console.log(tribe);

      for(let i = 0; i < tribe.length; i++){
        if(tribe[i].immunity === true){
          this.updateIdolCount(tribe[i].id, tribe[i].idol_count - 1)
          continue;
        }
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

        // (function(ind) {
        //     setTimeout(function(){
        //       console.log(tribe[i].name,tribe[i].id, rollValue);
        //       this.updatePlayerScore(tribe[i].id, rollValue);
        //     }, 5000 * (ind+1) );
        // })(i);
        // this.updatePlayerScore(tribe[i].id, rollValue);
        players.push({name: tribe[i].name, value: rollValue})
      }
      if(lowestName.length > 1){
        this.diceRollTie(lowestName)
      } else {
        this.getPlayer(lowestName[0].name);
      }
      for(let i = 0; i < players.length; i ++){
        console.log(players[i])
        this.updatePlayerScore(players[i].name, players[i].value)
      }
      // this.setState({playerOutcome: players}, () => {
      //   console.log(this.state.playerOutcome)
      //   for(let i = 0; i < players.length; i ++){
      //     console.log(players[i])
      //     this.updatePlayerScore(players[i].name, players[i].value)
      //   }
      // })
      this.setState({ showResults: true });
    }, 500)
    let array = ['voting', 'tally', 'decision', 'true']
    for (let i = 0; i < array.length; i++) {
      setTimeout(() => {
          this.sendMessage(array[i]);
          console.log(array[i])
      }, 5000 * i);
  }
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

  eventOutcomeRoll(tribe) {
    this.setState({idolRoll: false})
    let eventLength = this.state.events.length
    console.log(eventLength)
    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * eventLength) + 1;
      console.log(this.state.events[randomNum])
      this.setState({ showEventResults: true });
      console.log(this.state.events[randomNum].id)
      //can change to not hit DB
      this.getEvent(this.state.events[randomNum].id)
    }, 500)
    this.playerRoll(tribe)
  }

  challengeRatio(val, event) {
    event.preventDefault();
    // this.updateShowData(false);
    this.sendMessage('false');
    this.setState({ showResults: false });
    this.setState({ challengeRatioNum: val})
    // this.updateChallengeRatio(val);
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
      } else {}
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
            let phyiscal = tribeArray[j].strength * (parseInt(val) * .01)
            let mental = tribeArray[j].wit * (parseInt(100 - val) * .01)
            let rollValue = Math.floor(1 + Math.random() * phyiscal + mental)
            tribe1Roll = tribe1Roll + rollValue
        } else if(tribeArray[j].tribe === 'tribe2'){
            let phyiscal = tribeArray[j].strength * (parseInt(val) * .01)
            let mental = tribeArray[j].wit * (parseInt(100 - val) * .01)
            let rollValue = Math.floor(1 + Math.random() * phyiscal + mental)
            tribe2Roll = tribe2Roll + rollValue
        } else {
            let phyiscal = tribeArray[j].strength * (parseInt(val) * .01)
            let mental = tribeArray[j].wit * (parseInt(100 - val) * .01)
            let rollValue = Math.floor(1 + Math.random() * phyiscal + mental)
            tribe3Roll = tribe3Roll + rollValue
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
      } else {}
    }
    if(lowestName.length!== 0){
      if(lowestName.length > 1){
        console.log('theres been a tie');
        let tieBreaker = Math.floor(Math.random() * lowestName.length);
        console.log(lowestName[tieBreaker]);
      } else {
        this.getTribe(lowestName[0][0].tribe)
        this.setState({ tribeRespone: [lowestName[0][0]] });
        this.setState({ showResults: true })
      }
    } else {
      alert('add players to challenge');
    }
    this.setState({
      tribe1Score: tribe1Roll
    })
    this.setState({
      tribe2Score: tribe2Roll
    })
    this.setState({
      tribe3Score: tribe3Roll
    })
    this.setState({ showChallengeResults: true });
    this.updatGameData();
    console.log(tribe1Roll, tribe2Roll, tribe3Roll)
    // console.log(((parseInt(val)) * .01))
    // console.log((20 * ((parseInt(val)) * .01)))
    // let rollValue = Math.floor(1 + Math.random() * (20 * ((parseInt(val)) * .01)))
    // console.log(rollValue);
  }, 500)
  let array = ['battle', 'challenge', 'dig', 'true']
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
        this.sendMessage(array[i]);
        console.log(array[i])
    }, 5000 * i);
  }
}

//might become unused
  updateRound(round) {
    if(round === 'Next'){
      let num = this.state.roundData + 25
      if(this.state.roundData === 100){
        num = 0
      }
      axios.put(`${backendUrl}updateRoundData`, {
          id: 1,
          roundData: num
        })
        .then(response => {
          this.getRoundData();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      let num = this.state.roundData - 25
      if(this.state.roundData === 0){
        num = 100
      }
      axios.put(`${backendUrl}updateRoundData`, {
          id: 1,
          roundData: num
        })
        .then(response => {
          this.getRoundData();
        })
        .catch(error => {
          console.log(error);
        });
    }
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

  updateIdolCount(id, idolCount){
    axios.put(`${backendUrl}updateIdolCount`, {
        id: id,
        idolCount: idolCount
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateImmunity(id, immunity){
    axios.put(`${backendUrl}updateImmunity`, {
        id: id,
        immunity: immunity
      })
      .then(response => {
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  idolRoll(tribe){
    let randomNum = Math.floor(1 + Math.random() * 3);
    let tribeMember = tribe[Math.floor(Math.random() * tribe.length)];
    // this.sendIdolMessage('showIdolRes');
    this.setState({ showResults: true });
    this.getPlayer(tribeMember.name)
    console.log(randomNum, tribeMember.idol_count, tribeMember.id)
    if(randomNum === 3){
      let array = ['is searching...', 'found an idol', 'hideIdol']
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          if(array[i] === 'hideIdol'){
            this.sendIdolMessage('hideIdol')
          } else {
            this.sendIdolMessage(`${tribeMember.name} ${array[i]}`);
          }
            console.log(array[i])
        }, 5000 * i);
      }
      this.updateIdolCount(tribeMember.id, tribeMember.idol_count + 1)
    } else {
      let array = ['is searching...', 'did not find an idol', 'hideIdol']
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          if(array[i] === 'hideIdol'){
            this.sendIdolMessage('hideIdol')
          } else {
            this.sendIdolMessage(`${tribeMember.name} ${array[i]}`);
          }
            console.log(array[i])
        }, 5000 * i);
      }
      this.sendIdolMessage(`${tribeMember.name} did not find an idol`)
    }
    // setTimeout(() => {
    //   this.sendIdolMessage('hideIdol')
    // }, 5000)
  }

  handleIdolChange(data, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if(data.tribe === 'tribe1'){
      if(value === true && data.idol_count > 0){
        let id = data.id
        let immunity = true
        this.updateImmunity(id, immunity)
      } else {
        let id = data.id
        let immunity = false
        this.updateImmunity(id, immunity)
      }
    } else if (data.tribe === 'tribe2'){
      if(value === true && data.idol_count > 0){
        let id = data.id
        let immunity = true
        this.updateImmunity(id, immunity)
      } else {
        let id = data.id
        let immunity = false
        this.updateImmunity(id, immunity)
      }
    } else {
      if(value === true && data.idol_count > 0){
        let id = data.id
        let immunity = true
        this.updateImmunity(id, immunity)
      } else {
        let id = data.id
        let immunity = false
        this.updateImmunity(id, immunity)
      }
    }
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

  onSelectedRow = (data, clickEvent) => {
    if(this.state.revote.includes(data)){
      let index = this.state.revote.indexOf(data)
      this.setState(prevState => ({
        revote: prevState.revote.filter((data, itemIndex) => itemIndex != index)
      }))
    } else {
      this.setState( prevState => ({
        revote: [...prevState.revote, data]
      }))
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
          <td onClick={this.onSelectedRow.bind(this, data)}>{data.name}</td>
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
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          {data.join_game.toString()}
          </td>
          <td>
          <input
            name="useIdol"
            type="checkbox"
            defaultChecked={data.immunity}
            onChange={ (event) => {this.handleIdolChange(data, event)}}
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
          <td onClick={this.onSelectedRow.bind(this, data)}>{data.name}</td>
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
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          {data.join_game.toString()}
          </td>
          <td>
          <input
            name="useIdol"
            type="checkbox"
            defaultChecked={data.immunity}
            onChange={ (event) => {this.handleIdolChange(data, event)}}
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
          <td onClick={this.onSelectedRow.bind(this, data)}>{data.name}</td>
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
          <input
            name="isGoing"
            type="checkbox"
            defaultChecked={data.join_game}
            onChange={ (event) => {this.handleInputChange(data, event)}}
             />
          {data.join_game.toString()}
          </td>
          <td>
          <input
            name="useIdol"
            type="checkbox"
            defaultChecked={data.immunity}
            onChange={ (event) => {this.handleIdolChange(data, event)}}
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
            <button onClick={() => this.addLikeness(data.id, data.likeness)}>+</button>
            <button onClick={() => this.subtractLikeness(data.id, data.likeness)}>-</button>
          </div>
        </tr>
      )
    })
    const eventOutcome = this.state.eventRespone.map((data, i) => {
      console.log(data);
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
      <StickyContainer>
      <Sticky>
        {({ style }) => <h4 style={{ ...style, backgroundColor: '#C9C9C9' }}>
        <TheProgressBar
          getRoundMessage={this.getRoundMessage}
          sendRoundMessage={this.sendRoundMessage}
          roundDataMes={this.state.roundDataMes}
          roundData={this.state.roundData}
          updateRound={this.updateRound}/>
          { this.state.showChallengeData ? <div>
          <ChallengeSlider
            sendRatioVal={this.sendRatioVal}
            message={this.state.message}
            showData={this.state.showData}
            challengeRatioNum={this.state.challengeRatioNum}
            challengeRatio={this.challengeRatio}
            gameData={this.state.gameData}
            />
          </div> : null }
          <h2>
          { this.state.showTribal ? <div>
            <TribalCouncil
              revote={this.state.revote}
              revealAllVotes={this.revealAllVotes}
              revealVotes={this.state.revealVotes}
              showAllTribalVote={this.state.showAllTribalVote}
              showtribalVote={this.state.showtribalVote}
              tribalVote={this.state.tribalVote}
              readVotes={this.readVotes}
              tribe1={{tribe1}}
              tribe2={{tribe2}}
              tribe3={{tribe3}}
              sendTribalVotes={this.sendTribalVotes}
              tribalMessage={this.state.tribalMessage}
              response={this.state.response}
              onSelectedRow={this.onSelectedRow}
            />
          </div> : null }
          { this.state.idolMessage !== 'hideIdol' && <div>
          {this.state.idolMessage}
          </div> }
          <hr style={{border: "1px solid black"}}/>
          {this.state.message === 'true' &&
            <div>
            Event Happens to:
          { this.state.showResults ? <div>
            {playerEvent}
          </div> : null }
          { this.state.tied ? <div>
            {playerEvent}
            <button onClick={() => this.playerRoll(this.state.playerResponse)}>Draw Rocks</button>
          </div> : null }
          </div>
          }
          { this.state.showEventResults ? <div>
            <h2>{eventOutcome}</h2>
          </div> : null }
          </h2>
        </h4>}
      </Sticky>
      <NavigationBar
      updateShowData={this.updateShowData}
      getData={this.getData}
      getPlayer={this.getPlayer}
      response={this.state.response}
      updateTribeNumber={this.updateTribeNumber}

      response={this.state.response}
      eventRespone={this.state.eventRespone}
      playerResponse={this.state.playerResponse}
      tribeRespone={this.state.tribeRespone}
      challengeResponse={this.state.challengeResponse}

      addLikeness={this.addLikeness}
      subtractLikeness={this.subtractLikeness}
      addStrength={this.addStrength}
      subtractStrength={this.subtractStrength}
      addWit={this.addWit}
      subtractWit={this.subtractWit}
      handleInputChange={this.handleInputChange}
      handleIdolChange={this.handleIdolChange}
      onSelectedRow={this.onSelectedRow}
      updateChallenge={this.updateChallenge}
      playerRoll={this.playerRoll}
      diceRoll={this.diceRoll}
      eventOutcomeRoll={this.eventOutcomeRoll}
      idolRoll={this.idolRoll}
      idolRollState={this.state.idolRoll}
      showCampLife={this.state.showCampLife}
      showTribal={this.state.showTribal}
      updateTribe={this.state.updateTribe}
      handleChange={this.handleChange}
      value={this.state.value}
      getData={this.getData}
      />
      </StickyContainer>
      </div>
    );
  }

}

export default App;
